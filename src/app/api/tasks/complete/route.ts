import { NextResponse } from "next/server";
import { completeTask } from "@/lib/daily-tasks-engine";
import { createClient } from "@/lib/supabase-server";

// POST /api/tasks/complete - Mark a task as complete
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
    const { taskId } = body;
    
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID required" },
        { status: 400 }
      );
    }
    
    // Complete the task
    await completeTask(supabase, user.id, taskId);
    
    // Get updated streak info
    const { data: streakData } = await supabase
      .from("user_streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    return NextResponse.json({
      success: true,
      message: "Task completed successfully",
      streak: streakData,
    });
    
  } catch (error) {
    console.error("Complete task error:", error);
    return NextResponse.json(
      { error: "Failed to complete task", details: String(error) },
      { status: 500 }
    );
  }
}