import { NextResponse } from "next/server";
import type { StrategyInput, Strategy } from "@/lib/types";

// Mock AI strategy generation - replace with actual AI integration
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

    // Generate strategies based on input
    const strategies: Strategy[] = generateStrategies(body);

    return NextResponse.json({ strategies });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate strategies" },
      { status: 500 }
    );
  }
}

function generateStrategies(input: StrategyInput): Strategy[] {
  const strategies: Strategy[] = [
    {
      id: "1",
      title: "AI-Powered Content Agency",
      description: "Start a content creation agency that leverages AI tools to deliver high-quality content at scale.",
      expectedMonthlyIncome: "$4,000 - $8,000",
      difficulty: "Beginner",
      startupCost: "$500 - $1,000",
      timeframe: input.timeframe,
      steps: [
        "Set up your agency website and portfolio",
        "Identify 3-5 niche industries to target",
        "Create service packages and pricing",
        "Build a client acquisition system",
        "Hire freelancers to scale operations"
      ]
    },
    {
      id: "2",
      title: "Niche SaaS Micro-Product",
      description: "Build a small software tool that solves a specific problem for a niche audience.",
      expectedMonthlyIncome: "$5,000 - $15,000",
      difficulty: "Advanced",
      startupCost: "$2,000 - $5,000",
      timeframe: input.timeframe,
      steps: [
        "Research pain points in your target niche",
        "Validate the idea with potential customers",
        "Build a minimal viable product",
        "Launch on Product Hunt and relevant communities",
        "Iterate based on user feedback"
      ]
    },
    {
      id: "3",
      title: "Premium Newsletter Community",
      description: "Create a paid newsletter focused on a specialized topic where you have expertise.",
      expectedMonthlyIncome: "$3,000 - $10,000",
      difficulty: "Intermediate",
      startupCost: "$100 - $500",
      timeframe: input.timeframe,
      steps: [
        "Choose a niche with high willingness to pay",
        "Set up newsletter infrastructure",
        "Create a content calendar",
        "Build an audience through free content",
        "Launch paid tier with exclusive benefits"
      ]
    }
  ];

  return strategies;
}
