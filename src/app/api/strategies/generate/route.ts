import { NextResponse } from "next/server";
import { generateStrategies, validateStrategy, generateExecutionPlan } from "@/lib/strategy-engine";

export async function POST(request: Request) {
  try {
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
    
    // Generate strategies
    const strategies = generateStrategies(input);
    
    // Add validation and execution plans
    const enrichedStrategies = strategies.map(strategy => {
      const validation = validateStrategy(strategy, input);
      const executionPlan = generateExecutionPlan(strategy, input);
      
      return {
        ...strategy,
        validation,
        executionPlan,
        matchScore: strategy.score || 0
      };
    });
    
    return NextResponse.json({
      success: true,
      strategies: enrichedStrategies,
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
