import { NextResponse } from "next/server";
import { StrategyInput, Strategy } from "@/lib/types";

// AI Prompt Engine for IncomeGPT - System prompt for OpenAI integration
// const SYSTEM_PROMPT = `...`;

interface StrategyTemplate {
  title: string;
  baseIncome: number;
  description: string;
  whyItWorks: string;
  startupCost: number;
  difficulty: string;
  steps: string[];
}

const STRATEGY_TEMPLATES: Record<string, StrategyTemplate[]> = {
  writing: [
    {
      title: "AI-Assisted Copywriting Agency",
      baseIncome: 4000,
      description: "Write sales copy, emails, and ads for businesses using AI tools to 10x your output.",
      whyItWorks: "Businesses always need copy and AI lets one person do the work of five.",
      startupCost: 100,
      difficulty: "Beginner",
      steps: [
        "Set up a Carrd.co portfolio site with 3 sample pieces",
        "Join 5 Facebook groups where business owners hang out",
        "Offer to write one email sequence for free to get a testimonial",
        "Create a simple pricing sheet: $500 for 5 emails, $1,000 for sales page",
        "Send 20 cold DMs per day to business owners offering a free audit"
      ]
    },
    {
      title: "Niche Newsletter Publisher",
      baseIncome: 3000,
      description: "Create a paid newsletter in a specific industry you know well.",
      whyItWorks: "Readers pay for specialized knowledge that saves them time or makes them money.",
      startupCost: 50,
      difficulty: "Intermediate",
      steps: [
        "Pick a niche where people make money (finance, SaaS, real estate)",
        "Set up Beehiiv with a $15/month paid tier",
        "Write 5 free posts to build an email list to 100 subscribers",
        "Launch paid tier with exclusive weekly deep-dives",
        "Promote in relevant Reddit communities and Twitter"
      ]
    }
  ],
  coding: [
    {
      title: "Micro-SaaS for Niche Professionals",
      baseIncome: 5000,
      description: "Build a simple tool that solves one specific problem for a professional niche.",
      whyItWorks: "Professionals pay for tools that save 1 hour/week of their time.",
      startupCost: 500,
      difficulty: "Advanced",
      steps: [
        "Find 10 people in a niche complaining about the same problem on Reddit/LinkedIn",
        "Validate by getting 3 people to say they'll pay $30/month for a solution",
        "Build MVP in 2 weeks using no-code or simple code (Bubble, Webflow, or Next.js)",
        "Launch on Product Hunt and niche subreddits",
        "Get first 10 customers through direct outreach"
      ]
    },
    {
      title: "Technical SEO Consultant",
      baseIncome: 6000,
      description: "Fix website speed, structured data, and technical issues for e-commerce sites.",
      whyItWorks: "E-commerce sites lose millions to slow speeds - they'll pay to fix it.",
      startupCost: 200,
      difficulty: "Intermediate",
      steps: [
        "Learn technical SEO through free courses (Google's docs, Ahrefs blog)",
        "Audit 5 sites for free to build case studies",
        "Create a simple audit checklist and offer it as a lead magnet",
        "Price audits at $500 and implementation at $2,000+",
        "Reach out to Shopify stores with slow load times"
      ]
    }
  ],
  marketing: [
    {
      title: "TikTok Organic Agency",
      baseIncome: 4500,
      description: "Create viral TikTok content for local businesses and charge monthly retainers.",
      whyItWorks: "Local businesses know they need TikTok but don't understand it.",
      startupCost: 200,
      difficulty: "Beginner",
      steps: [
        "Create your own TikTok and get 1,000 followers to prove you understand the platform",
        "Make 5 free videos for a local business to build a portfolio",
        "Create a simple pitch: 'I get you customers from TikTok'",
        "Charge $1,000/month for 12 videos + posting",
        "DM 20 local businesses per day (restaurants, gyms, salons)"
      ]
    },
    {
      title: "Google Ads Specialist for Local Services",
      baseIncome: 5500,
      description: "Run Google Ads for high-ticket local services (plumbers, roofers, lawyers).",
      whyItWorks: "One new customer can be worth $5,000+ to these businesses.",
      startupCost: 300,
      difficulty: "Intermediate",
      steps: [
        "Get Google Ads certified (free)",
        "Find 10 local service businesses already running bad ads",
        "Create a loom video auditing their ad account",
        "Offer to manage ads for $1,500/month + ad spend",
        "Target businesses spending $2,000+/month on ads already"
      ]
    }
  ],
  design: [
    {
      title: "Productized Design Subscription",
      baseIncome: 4000,
      description: "Offer unlimited design requests for a flat monthly fee.",
      whyItWorks: "Startups need constant design work but can't afford a full-time designer.",
      startupCost: 150,
      difficulty: "Intermediate",
      steps: [
        "Create a portfolio with 5 strong pieces in web/app design",
        "Set up a Framer or Webflow template store as proof of skill",
        "Create 3 pricing tiers: $1,500/mo (1 request), $3,000/mo (3 requests)",
        "Post in Indie Hackers, Starter Story, and founder communities",
        "Offer first month at 50% off to get testimonials"
      ]
    }
  ],
  sales: [
    {
      title: "Appointment Setting Agency",
      baseIncome: 6000,
      description: "Book sales calls for B2B companies using cold email and LinkedIn.",
      whyItWorks: "Sales reps hate prospecting - they'll pay $200+ per booked meeting.",
      startupCost: 400,
      difficulty: "Beginner",
      steps: [
        "Learn cold email copywriting through free resources",
        "Set up Instantly.ai for cold email ($37/month)",
        "Find 3 B2B companies with $10K+ lifetime value per customer",
        "Offer to work for free for 1 week to prove you can book meetings",
        "Charge $2,000/month + $100 per booked meeting"
      ]
    }
  ]
};

// Fallback strategies for any skill set
const FALLBACK_STRATEGIES: StrategyTemplate[] = [
  {
    title: "Digital Product Reseller",
    baseIncome: 3000,
    description: "Buy and resell digital products, templates, and notion dashboards.",
    whyItWorks: "Digital products have 90%+ margins and can be sold infinitely.",
    startupCost: 200,
    difficulty: "Beginner",
    steps: [
      "Find 5 digital products with resale rights on Gumroad/Gumlet",
      "Create a simple Shopify or Stan Store",
      "Make TikToks showing the product in use",
      "Build email list with lead magnet (free template)",
      "Launch paid product to list at $27-97 price point"
    ]
  },
  {
    title: "Remote Executive Assistant",
    baseIncome: 3500,
    description: "Manage calendars, inboxes, and tasks for busy executives.",
    whyItWorks: "Executives value time at $500+/hour - they'll pay $25/hour to get it back.",
    startupCost: 50,
    difficulty: "Beginner",
    steps: [
      "Create a profile on Belay, Time Etc, and Fancy Hands",
      "Get certified in common tools (Notion, Asana, Calendly)",
      "Offer first 10 hours at $15/hour to get reviews",
      "Raise rates to $25-35/hour after 3 positive reviews",
      "Get 2-3 recurring clients for stable income"
    ]
  },
  {
    title: "Online Course Creator",
    baseIncome: 5000,
    description: "Teach a skill you know on platforms like Teachable or Skool.",
    whyItWorks: "Courses sell while you sleep - one good course can make $10K+/month.",
    startupCost: 100,
    difficulty: "Intermediate",
    steps: [
      "Pick a skill people ask you about (even if it's 'basic' to you)",
      "Outline 10 lessons that get someone from 0 to competent",
      "Record first 3 lessons with Loom (free)",
      "Pre-sell course for $50 to validate demand",
      "Finish course and launch to waitlist at $197-497"
    ]
  }
];

export async function POST(request: Request) {
  try {
    const body: StrategyInput = await request.json();
    
    // Validate input
    if (!body.incomeGoal || !body.timeframe || !body.startingBudget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate strategies based on skills and constraints
    const strategies = generateStrategies(body);

    return NextResponse.json({ strategies });
  } catch (error) {
    console.error("Strategy generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategies" },
      { status: 500 }
    );
  }
}

function generateStrategies(input: StrategyInput): Strategy[] {
  const { incomeGoal, timeframe, startingBudget, skills } = input;
  const strategies: Strategy[] = [];
  
  // Match user skills to strategy templates
  const matchedStrategies: StrategyTemplate[] = [];
  
  skills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase();
    if (STRATEGY_TEMPLATES[normalizedSkill]) {
      matchedStrategies.push(...STRATEGY_TEMPLATES[normalizedSkill]);
    }
  });
  
  // Add fallback strategies if not enough matches
  if (matchedStrategies.length < 3) {
    matchedStrategies.push(...FALLBACK_STRATEGIES);
  }
  
  // Select and customize top 3 strategies
  const selectedStrategies = matchedStrategies.slice(0, 3);
  
  selectedStrategies.forEach((template, index) => {
    // Adjust income based on user's goal
    const incomeMultiplier = Math.min(incomeGoal / template.baseIncome, 2);
    const adjustedIncome = Math.round(template.baseIncome * incomeMultiplier);
    
    // Adjust startup cost based on user's budget
    const maxStartupCost = Math.min(startingBudget * 0.5, template.startupCost);
    
    strategies.push({
      id: (index + 1).toString(),
      title: template.title,
      description: template.description,
      whyItWorks: template.whyItWorks,
      startupCost: `$${maxStartupCost}`,
      expectedMonthlyIncome: `$${Math.round(adjustedIncome * 0.7)}-$${adjustedIncome * 1.3}`,
      difficulty: template.difficulty as "Beginner" | "Intermediate" | "Advanced",
      timeframe: timeframe,
      timeToFirstDollar: "2-4 weeks",
      steps: template.steps
    });
  });

  return strategies;
}
