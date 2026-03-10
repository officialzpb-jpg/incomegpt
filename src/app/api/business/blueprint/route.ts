import { NextResponse } from "next/server";
import { generateBusinessBlueprint } from "@/lib/business-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ["skills", "timePerWeek", "startingBudget", "interests"];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const input = {
      skills: Array.isArray(body.skills) ? body.skills : [],
      timePerWeek: Number(body.timePerWeek),
      startingBudget: Number(body.startingBudget),
      interests: body.interests,
      experienceLevel: body.experienceLevel || "beginner",
    };
    
    // Generate the business blueprint
    const blueprint = generateBusinessBlueprint(input);
    
    return NextResponse.json({
      success: true,
      blueprint,
      userInput: input,
      generatedAt: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error("Business blueprint generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate business blueprint", details: String(error) },
      { status: 500 }
    );
  }
}