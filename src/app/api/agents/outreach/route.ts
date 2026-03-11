import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Generate outreach campaign using OpenAI
async function generateOutreachCampaign(
  industry: string,
  targetDescription: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _channels: string[]
): Promise<{
  leads: {
    name: string;
    company: string;
    source: string;
    message: string;
    followUp: string;
  }[];
  summary: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Return mock data if no API key
    return {
      leads: [
        {
          name: "Sarah Johnson",
          company: "TechStart Inc.",
          source: "LinkedIn",
          message: `Hi Sarah,\n\nI noticed TechStart Inc. has been scaling rapidly - congrats on the growth!\n\nI help ${industry} companies like yours streamline operations and save 10+ hours per week through automation.\n\nWorth a brief conversation to see if I can help TechStart?\n\nBest regards`,
          followUp: "Send follow-up in 3 days if no response",
        },
        {
          name: "Michael Chen",
          company: "GrowthLabs",
          source: "Email",
          message: `Subject: Quick question about GrowthLabs\n\nHi Michael,\n\nI came across GrowthLabs and was impressed by your recent expansion into ${industry}.\n\nI specialize in helping companies like yours optimize their workflow. Recently helped a similar client increase efficiency by 40%.\n\nWould you be open to a quick chat about how this might apply to GrowthLabs?\n\nBest`,
          followUp: "Follow up with case study in 5 days",
        },
        {
          name: "Emily Rodriguez",
          company: "ScaleUp Solutions",
          source: "LinkedIn",
          message: `Hi Emily,\n\nSaw your post about the challenges of scaling ${targetDescription}. Great insights!\n\nI've worked with several companies facing similar challenges and helped them overcome the exact bottlenecks you mentioned.\n\nWould love to share what worked - worth a conversation?\n\nCheers`,
          followUp: "Share relevant resource in 2 days",
        },
      ],
      summary: `Generated 3 high-quality leads in the ${industry} space. Each lead has a personalized message tailored to their specific situation and company profile. Follow-up sequences are scheduled to maximize response rates.`,
    };
  }

  const prompt = `Generate an outreach campaign for a business in the ${industry} industry targeting ${targetDescription}.

Create 3 fictional but realistic leads with:
1. Name and company
2. Source (LinkedIn, Email, etc.)
3. A personalized outreach message (2-3 paragraphs, professional but friendly)
4. A specific follow-up strategy

The messages should be tailored to the industry and target audience, mentioning specific pain points and offering value upfront.

Return as JSON with this structure:
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
  "summary": "Brief summary of the campaign strategy"
}`;

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
          content: "You are an expert sales outreach specialist. Generate realistic, personalized outreach campaigns that get responses."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API error");
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  
  // Parse JSON from response
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    console.error("Failed to parse OpenAI response");
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
    
    if (!industry || !targetDescription) {
      return NextResponse.json(
        { error: "Industry and target description required" },
        { status: 400 }
      );
    }
    
    const result = await generateOutreachCampaign(industry, targetDescription, channels);
    
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