import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const RESPONSE_TEMPLATES: Record<string, string[]> = {
  "getting_started": [
    "Listen, everyone wants the magic bullet. There isn't one. But here's what actually works...",
    "You want $10K/month? Cool. Most people quit before they get there. Don't be most people.",
    "Here's the deal: Pick ONE skill, ONE offer, ONE target market. Master it before adding complexity.",
  ],
  "pricing": [
    "You're probably undercharging. Most beginners price based on their insecurity, not value.",
    "Here's a simple formula: What result do you deliver? Charge 10-20% of that value.",
    "If you're not losing some deals on price, you're too cheap. Period.",
  ],
  "outreach": [
    "Cold outreach isn't dead. Your boring, generic messages are dead. Make it personal or don't bother.",
    "Send 20 personalized DMs daily. That's 600/month. If you can't close 1-2 clients from that, your offer sucks.",
    "Stop saying 'I help businesses with X.' Say 'I help [specific person] achieve [specific result] in [timeframe].'",
  ],
  "mindset": [
    "Imposter syndrome? Everyone has it. Successful people act anyway.",
    "You're not 'not ready.' You're scared. Different thing entirely.",
    "The difference between $1K/month and $10K/month isn't skill. It's consistency and volume of outreach.",
  ],
  "specific": [
    "Based on what you've told me, here's your move...",
    "Alright, let's get specific. Here's exactly what I'd do in your situation...",
    "Forget the generic advice. Here's your personalized action plan...",
  ],
};

function generateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Determine intent
  let category = "specific";

  if (lowerMessage.includes("start") || lowerMessage.includes("begin") || lowerMessage.includes("new")) {
    category = "getting_started";
  } else if (lowerMessage.includes("price") || lowerMessage.includes("charge") || lowerMessage.includes("cost")) {
    category = "pricing";
  } else if (lowerMessage.includes("client") || lowerMessage.includes("outreach") || lowerMessage.includes("email") || lowerMessage.includes("dm")) {
    category = "outreach";
  } else if (lowerMessage.includes("scared") || lowerMessage.includes("afraid") || lowerMessage.includes("ready") || lowerMessage.includes("confidence")) {
    category = "mindset";
  }

  // Get template
  const templates = RESPONSE_TEMPLATES[category];
  const opener = templates[Math.floor(Math.random() * templates.length)];

  // Generate specific advice based on the question
  let advice = "";

  if (category === "getting_started") {
    advice = `

**Your 3-Step Launch Plan:**

1. **Pick your weapon** - What skill do you have that people pay for? Writing? Design? Coding? Sales?

2. **Define your target** - Who specifically needs this? "Small businesses" is too broad. "E-commerce stores doing $500K+ revenue" is specific.

3. **Create your offer** - Package it as a result, not hours. "I'll write emails that generate sales" beats "I'm a copywriter."

**This week's homework:**
- Set up a simple landing page (Carrd, Webflow, or even Google Sites)
- List 50 potential clients
- Send 10 personalized outreach messages daily

Track everything. Adjust based on responses. Rinse and repeat.`;
  } else if (category === "pricing") {
    advice = `

**Pricing Framework:**

**Option 1: Value-Based Pricing**
- What result does your client get?
- What's that worth to them annually?
- Charge 10-20% of that value

**Option 2: Market-Based Pricing**
- What do competitors charge?
- Where's the gap you can fill?
- Start 20% below market, raise prices every 3 clients

**My recommendation:** Start with project-based pricing, not hourly. Hourly punishes efficiency.

**Example packages:**
- Starter: $1,500 (basic deliverables)
- Professional: $3,500 (full service + support)
- Enterprise: $7,500+ (white-glove service)

Pick one. Sell it 10 times. Then raise prices.`;
  } else if (category === "outreach") {
    advice = `

**The Outreach Formula That Works:**

**Subject/Hook:** Reference something specific about them
**Body:** 2-3 sentences max
**CTA:** One clear next step

**Template:**
\`\`\`
Subject: Quick question about [Company]

Hi [Name],

[Specific observation about their business].

I help [similar companies] [achieve specific result]. Recently helped [similar client] [specific outcome with numbers].

Worth a 10-minute conversation?

[Your name]
\`\`\`

**Rules:**
1. Research before you message
2. Personalize every single one
3. Follow up 3 times minimum
4. Track responses to improve

**Goal:** 20 personalized outreaches daily. That's it.`;
  } else if (category === "mindset") {
    advice = `

**Real Talk:**

Everyone feels like a fraud when they start. The people who succeed aren't more confident - they just take action despite the fear.

**Reframes:**
- "I'm not ready" → "I'll learn as I go"
- "What if I fail?" → "What if I succeed?"
- "I need more skills" → "I need more clients to learn from"

**The Truth:**
Your first 10 clients will teach you more than any course. Your first $1K will give you more confidence than any book.

**Action beats anxiety.** Every time.

So what's one tiny action you can take in the next 10 minutes?`;
  } else {
    // Specific/generic response
    advice = `

Let me break this down for you:

**The Situation:**
${message}

**My Take:**
You're overthinking it. Most people do. The path forward is simpler than you think, but it requires consistent execution.

**Next Steps:**
1. Clarify your offer in one sentence
2. Identify 50 people who need it
3. Reach out to 10 daily
4. Iterate based on feedback

**The Reality Check:**
Building to $10K/month takes 3-6 months of consistent effort. Not 3-6 days. Most people quit at month 2. Don't be most people.

What's your biggest blocker right now? Let's solve it.`;
  }

  return opener + advice;
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
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    // Generate AI response
    const response = generateAIResponse(message);

    // Simulate thinking delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

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