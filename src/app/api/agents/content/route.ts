import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Generate content using OpenAI
async function generateContentWithAI(
  businessType: string,
  targetAudience: string,
  contentTypes: string[],
  platforms: string[]
): Promise<{
  content: { type: string; title: string; content: string; hashtags?: string[]; tips?: string[] }[];
  contentCalendar: { day: string; platform: string; content: string }[];
  summary: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Fallback mock data
    return {
      content: [
        {
          type: "TikTok Script",
          title: "3 Mistakes Killing Your Business",
          content: `[HOOK] Stop making these 3 mistakes if you want to scale your ${businessType}...\n\n[POINT 1] You're trying to serve everyone instead of niching down\n[POINT 2] You're undercharging for your expertise\n[POINT 3] You're not systematizing your delivery\n\n[CTA] Follow for more ${businessType} tips!`,
          hashtags: ["businessgrowth", "entrepreneur", "scaling"],
          tips: ["Film in 9:16 format", "Use trending audio", "Post at 9 AM EST"],
        },
        {
          type: "Instagram Post",
          title: "Value Bomb Carousel",
          content: `Slide 1: The #1 thing ${targetAudience} need to know about growing their business\n\nSlide 2-5: Break down your top 4 tips\n\nSlide 6: CTA to DM you for help`,
          hashtags: ["businessowner", "growth", "marketing"],
        },
        {
          type: "Ad Copy",
          title: "Facebook/Instagram Ad",
          content: `Struggling to find clients for your ${businessType}?\n\nI help ${targetAudience} land 3-5 high-ticket clients per month using our proven outreach system.\n\n✅ No cold calling required\n✅ Works in any economy\n✅ Results in 30 days or less\n\nBook a free strategy call → [LINK]`,
        },
      ],
      contentCalendar: [
        { day: "Monday", platform: "Instagram", content: "Motivational post + tip" },
        { day: "Tuesday", platform: "TikTok", content: "Educational video" },
        { day: "Wednesday", platform: "LinkedIn", content: "Industry insights" },
        { day: "Thursday", platform: "Instagram", content: "Behind the scenes" },
        { day: "Friday", platform: "TikTok", content: "Trending audio video" },
        { day: "Saturday", platform: "Twitter", content: "Thread on key topic" },
        { day: "Sunday", platform: "Instagram", content: "Week recap + CTA" },
      ],
      summary: `Generated 3 pieces of high-converting content for ${businessType} targeting ${targetAudience}. Mix of educational and promotional content optimized for ${platforms.join(", ")}.`,
    };
  }

  const prompt = `You are an expert content marketer. Generate viral-worthy content for:

Business: ${businessType}
Target Audience: ${targetAudience}
Content Types: ${contentTypes.join(", ")}
Platforms: ${platforms.join(", ")}

Generate:
1. 3 pieces of content with specific titles and full copy
2. A 7-day content calendar
3. Include hashtags and tips where relevant

Return JSON in this format:
{
  "content": [
    {
      "type": "...",
      "title": "...",
      "content": "...",
      "hashtags": ["..."],
      "tips": ["..."]
    }
  ],
  "contentCalendar": [
    { "day": "Monday", "platform": "...", "content": "..." }
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
      max_tokens: 2000,
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
    content: [],
    contentCalendar: [],
    summary: "Failed to generate content. Please try again.",
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
    const { businessType, targetAudience, contentTypes, platforms } = body;
    
    if (!businessType || !targetAudience || !contentTypes?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Generate content
    const result = await generateContentWithAI(businessType, targetAudience, contentTypes, platforms);
    
    return NextResponse.json({
      success: true,
      result,
    });
    
  } catch (error) {
    console.error("Content agent error:", error);
    return NextResponse.json(
      { error: "Failed to generate content", details: String(error) },
      { status: 500 }
    );
  }
}