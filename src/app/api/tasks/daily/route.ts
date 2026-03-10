import { NextResponse } from "next/server";
import { getOrGenerateDailyTasks, completeTask } from "@/lib/daily-tasks-engine";
import { createClient } from "@/lib/supabase-server";

// GET /api/tasks/daily - Get today's tasks
export async function GET() {
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
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("income_goal, skills, time_per_week")
      .eq("id", user.id)
      .single();
    
    if (profileError && profileError.code !== "PGRST116") {
      console.error("Profile error:", profileError);
    }
    
    // Get or generate daily tasks
    const tasks = await getOrGenerateDailyTasks(supabase, user.id, profile || {});
    
    // Get streak info
    const { data: streakData } = await supabase
      .from("user_streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    return NextResponse.json({
      success: true,
      tasks,
      streak: streakData || {
        current_streak: 0,
        longest_streak: 0,
        total_tasks_completed: 0,
      },
      expiresAt: tasks[0]?.expiresAt,
    });
    
  } catch (error) {
    console.error("Daily tasks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily tasks", details: String(error) },
      { status: 500 }
    );
  }
}