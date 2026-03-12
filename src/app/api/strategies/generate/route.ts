import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Generate strategies using OpenAI
async function generateStrategiesWithAI(input: {
  incomeGoal: number;
  timeframe: string;
  startingBudget: number;
  skills: string[];
  timePerWeek: number;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Generate 3 personalized money-making strategies for someone with the following profile:

- Income Goal: $${input.incomeGoal}/month
- Timeframe: ${input.timeframe}
- Starting Budget: $${input.startingBudget}
- Skills: ${input.skills.join(", ")}
- Time Available: ${input.timePerWeek} hours/week

For each strategy, provide:
1. Title (catchy, specific)
2. Description (2-3 sentences explaining what it is)
3. Expected monthly income range (realistic based on the goal)
4. Difficulty level (Beginner, Intermediate, or Advanced)
5. Startup cost range
6. Timeframe to first revenue
7. Match score (0-100 based on how well it fits their skills and budget)
8. 5 actionable steps to get started
9. 3-4 relevant tags/categories

Return as JSON array with this structure:
[{
  "title": "...",
  "description": "...",
  "expectedMonthlyIncome": "$X,XXX - $X,XXX",
  "difficulty": "...",
  "startupCost": "$X - $X",
  "timeframe": "...",
  "matchScore": 95,
  "steps": ["step 1", "step 2", ...],
  "tags": ["tag1", "tag2", ...]
}]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert business strategist who creates practical, actionable money-making strategies. Be realistic about income potential and timelines."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 2500,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API error");
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  
  // Parse JSON from response
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Failed to parse OpenAI response:", e);
  }
  
  throw new Error("Failed to generate strategies");
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ["incomeGoal", "timeframe", "startingBudget", "skills", "timePerWeek"];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const input = {
      incomeGoal: Number(body.incomeGoal),
      timeframe: body.timeframe,
      startingBudget: Number(body.startingBudget),
      skills: Array.isArray(body.skills) ? body.skills : [],
      timePerWeek: Number(body.timePerWeek)
    };
    
    // Generate strategies using OpenAI
    const strategies = await generateStrategiesWithAI(input);
    
    // Add IDs and user_id to strategies
    const strategiesWithIds = strategies.map((strategy: any, index: number) => ({
      ...strategy,
      id: `strategy_${Date.now()}_${index}`,
      user_id: user.id,
      created_at: new Date().toISOString(),
    }));
    
    // Store in database
    const { error: insertError } = await supabase
      .from("strategies")
      .insert(strategiesWithIds);
    
    if (insertError) {
      console.error("Error saving strategies:", insertError);
    }
    
    return NextResponse.json({
      success: true,
      strategies: strategiesWithIds,
      userInput: input,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Strategy generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategies", details: String(error) },
      { status: 500 }
    );
  }
}