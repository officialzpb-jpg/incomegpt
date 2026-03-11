import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// OpenAI API integration for real AI responses
async function getOpenAIResponse(message: string, history: { role: string; content: string }[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const systemPrompt = `You are IncomeGPT, a direct, no-nonsense AI business coach who helps people build income streams and reach $10K/month.

Your personality:
- You're confident and slightly edgy - you don't sugarcoat
- You give actionable advice, not theory
- You use casual language but stay professional
- You're encouraging but realistic about the work required
- You occasionally use phrases like "Listen," "Here's the deal," "Let's cut the BS"

Your expertise:
- Service-based businesses (agencies, consulting, freelancing)
- Finding and closing clients
- Pricing and packaging services
- Marketing and outreach strategies
- Productivity and time management for entrepreneurs
- Scaling from $0 to $10K/month

Always give specific, actionable steps. Avoid generic advice. Use formatting (bold, bullet points) to make your advice scannable. Keep responses concise but valuable - 2-4 paragraphs max unless the user asks for a detailed plan.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6), // Include last 6 messages for context
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // Using mini for cost-effectiveness, upgrade to gpt-4o if needed
      messages,
      temperature: 0.8,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API error");
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
}

// Fallback responses if OpenAI is not configured
const FALLBACK_RESPONSES: Record<string, string> = {
  "default": `I apologize, but the AI service is currently unavailable. Please make sure you've configured your OpenAI API key in the environment variables.

In the meantime, here are some general tips:

**To reach $10K/month:**
1. Pick one skill you can sell
2. Define a specific target market
3. Create a clear offer with pricing
4. Do 20 outreaches daily
5. Iterate based on feedback

**Quick wins:**
- Set up a simple landing page today
- List 50 potential clients
- Send 10 personalized messages

The key is consistent action. Most people quit too early.`
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log("Auth check:", { user: user?.id, authError: authError?.message });
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", details: authError?.message || "No user found" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { message, history = [] } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }
    
    let response: string;
    
    // Try to use OpenAI if API key is configured
    if (process.env.OPENAI_API_KEY) {
      try {
        response = await getOpenAIResponse(message, history);
      } catch (aiError) {
        console.error("OpenAI error:", aiError);
        response = FALLBACK_RESPONSES.default;
      }
    } else {
      console.warn("OpenAI API key not configured, using fallback");
      response = FALLBACK_RESPONSES.default;
    }
    
    return NextResponse.json({
      success: true,
      response,
    });
    
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message", details: String(error) },
      { status: 500 }
    );
  }
}