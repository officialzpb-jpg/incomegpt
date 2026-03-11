import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Generate outreach campaign using OpenAI
async function generateOutreachWithAI(
  industry: string,
  targetDescription: string,
  channels: string[]
): Promise<{
  leads: { name: string; company: string; source: string; message: string; followUp: string }[];
  summary: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Fallback mock data
    return {
      leads: [
        {
          name: "Sarah Johnson",
          company: "Growth Marketing Co",
          source: "LinkedIn",
          message: `Hi Sarah, I noticed Growth Marketing Co has been scaling fast - congrats! I help ${industry} businesses like yours streamline operations with AI automation. One client saved 15 hours/week on admin tasks. Worth a quick chat?`,
          followUp: "Send follow-up in 3 days if no response",
        },
        {
          name: "Michael Chen",
          company: "TechStart Inc",
          source: "Email",
          message: `Subject: Quick question about TechStart's workflow\n\nHi Michael,\n\nI came across TechStart and was impressed by your recent product launch. I specialize in helping ${industry} companies automate repetitive tasks using AI.\n\nWould you be open to a 10-minute call to see if there's a fit?\n\nBest regards`,
          followUp: "Follow up with case study after 5 days",
        },
        {
          name: "Emily Rodriguez",
          company: "Digital Solutions LLC",
          source: "LinkedIn",
          message: `Hi Emily, saw your post about scaling challenges - very relatable! I work with ${targetDescription} to implement AI solutions that cut operational costs by 30%. Happy to share how if you're interested.`,
          followUp: "Connect on LinkedIn and engage with posts",
        },
      ],
      summary: `Generated 3 high-quality leads in the ${industry} space. Each lead has a personalized message tailored to their company and role. Estimated response rate: 15-25% with proper follow-up.`,
    };
  }

  const prompt = `You are an expert outreach strategist. Generate a targeted outreach campaign for:

Industry: ${industry}
Target Audience: ${targetDescription}
Channels: ${channels.join(", ")}

Generate 3 specific leads with:
1. Realistic names and company names
2. The channel to reach them (LinkedIn, Email, etc.)
3. A personalized outreach message (2-3 sentences, conversational tone)
4. A specific follow-up strategy

Also provide a brief summary of the campaign strategy.

Return JSON in this format:
{
  "leads": [
    {
      "name": "...",
      "company": "...",
      "source": "...",
      "message": "...",
      "followUp": "..."
    }
  ],
  "summary": "..."
}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API error");
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || "";
  
  // Parse JSON from response
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    console.error("Failed to parse AI response as JSON");
  }
  
  // Fallback
  return {
    leads: [],
    summary: "Failed to generate leads. Please try again.",
  };
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
    const { industry, targetDescription, channels } = body;
    
    if (!industry || !targetDescription || !channels?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Generate outreach campaign
    const result = await generateOutreachWithAI(industry, targetDescription, channels);
    
    return NextResponse.json({
      success: true,
      result,
    });
    
  } catch (error) {
    console.error("Outreach agent error:", error);
    return NextResponse.json(
      { error: "Failed to generate outreach", details: String(error) },
      { status: 500 }
    );
  }
}