import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Generate content using OpenAI
async function generateContent(
  businessType: string,
  targetAudience: string,
  contentTypes: string[],
  tone: string
): Promise<{
  content: {
    type: string;
    title: string;
    script: string;
    hashtags?: string[];
    tips: string;
  }[];
  summary: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Return mock data if no API key
    const mockContent = [];
    
    if (contentTypes.includes("tiktok")) {
      mockContent.push({
        type: "TikTok Script",
        title: "3 Mistakes Killing Your Business",
        script: `[HOOK] Stop making these 3 mistakes if you want to scale your ${businessType}...\n\n[POINT 1] Mistake #1: Trying to do everything yourself. You\u0026apos;re the bottleneck.\n\n[POINT 2] Mistake #2: Undercharging for your services. Price = perceived value.\n\n[POINT 3] Mistake #3: Not following up with leads. 80% of sales happen after 5+ touches.\n\n[CTA] Follow for more tips on growing your business!`,
        hashtags: ["businessgrowth", "entrepreneur", "scaling", "businesstips"],
        tips: "Film with energetic music, use text overlays for each point, keep under 60 seconds",
      });
    }
    
    if (contentTypes.includes("youtube")) {
      mockContent.push({
        type: "YouTube Video Idea",
        title: "How I Scaled to $10K/Month in 90 Days",
        script: `Title: How I Scaled to $10K/Month in 90 Days (Step-by-Step)\n\nIntro:\n- Hook: "In this video, I\u0026apos;m breaking down exactly how I went from $0 to $10K/month in just 90 days..."\n\nMain Points:\n1. The offer that actually sells (not what you think)\n2. Where to find high-paying clients\n3. The pricing strategy that doubled my revenue\n4. Systems to scale without burning out\n\nOutro:\n- CTA to subscribe and download free guide`,
        tips: "Create a compelling thumbnail with your face and \u0026quot;$10K/month\u0026quot; text. Post on Tuesday or Thursday for best engagement.",
      });
    }
    
    if (contentTypes.includes("ads")) {
      mockContent.push({
        type: "Ad Copy",
        title: "Facebook/Instagram Ad",
        script: `Headline: Still Struggling to Find Clients?\n\nBody: I was too. Until I discovered the exact system that helped me land 15 high-ticket clients in 30 days.\n\nNo cold calling.\nNo spamming DMs.\nNo expensive ads.\n\nJust a simple 3-step process that works for any ${businessType}.\n\n[Download Free Guide] to see the exact system.\n\nLink in bio.`,
        tips: "Use an image of yourself or a results screenshot. Test 3 different headlines to find the winner.",
      });
    }
    
    return {
      content: mockContent,
      summary: `Generated ${mockContent.length} pieces of ${tone} content tailored for ${targetAudience}. Each piece is optimized for engagement and includes specific tips for maximum reach.`,
    };
  }

  const prompt = `Generate marketing content for a ${businessType} targeting ${targetAudience}.

Content types needed: ${contentTypes.join(", ")}
Tone: ${tone}

For each content type, create:
1. A catchy title
2. The full script/copy
3. Relevant hashtags (if applicable)
4. Specific tips for making it perform well

Return as JSON with this structure:
{
  "content": [
    {
      "type": "Content Type Name",
      "title": "...",
      "script": "...",
      "hashtags": ["tag1", "tag2"],
      "tips": "..."
    }
  ],
  "summary": "Brief summary of the content strategy"
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
          content: "You are an expert content marketer. Create engaging, platform-optimized content that drives engagement and conversions."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 2000,
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
  } catch (e) {
    console.error("Failed to parse OpenAI response", e);
  }
  
  // Fallback
  return {
    content: [],
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
    const { businessType, targetAudience, contentTypes, tone } = body;
    
    if (!businessType || !targetAudience || !contentTypes?.length) {
      return NextResponse.json(
        { error: "Business type, target audience, and content types required" },
        { status: 400 }
      );
    }
    
    const result = await generateContent(businessType, targetAudience, contentTypes, tone);
    
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