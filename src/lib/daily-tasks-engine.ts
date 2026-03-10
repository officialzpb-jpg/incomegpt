// Daily Income Tasks Engine for IncomeGPT
// Generates personalized daily tasks based on user profile and goals

import { createClient } from "@supabase/supabase-js";

export interface TaskInput {
  userId: string;
  incomeGoal: number;
  skills: string[];
  timePerWeek: number;
  businessType?: string;
  completedTasksCount: number;
  currentStreak: number;
}

export interface DailyTask {
  id?: string;
  task: string;
  category: string;
  estimatedTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  completedAt?: string;
  createdAt?: string;
  expiresAt?: string;
}

// Task templates by category
const TASK_TEMPLATES: Record<string, string[]> = {
  "outreach": [
    "Send {count} personalized LinkedIn connection requests to {target}",
    "Send {count} cold emails to {target}",
    "Make {count} cold calls to {target}",
    "Send {count} DMs to potential clients on Instagram/Twitter",
    "Follow up with {count} prospects who haven\u0027t responded",
    "Join {count} relevant Facebook/LinkedIn groups and introduce yourself",
    "Comment thoughtfully on {count} posts from your target audience",
  ],
  "content": [
    "Create and post {count} pieces of content about {topic}",
    "Write a LinkedIn post sharing a client win or lesson learned",
    "Record {count} short video tips for your target audience",
    "Create a case study from a previous client success",
    "Write a blog post addressing a common pain point",
    "Share a valuable resource in {count} relevant communities",
    "Create a carousel post with actionable tips",
  ],
  "lead_generation": [
    "Set up a lead magnet landing page",
    "Create a free tool or template to capture emails",
    "Run a giveaway to grow your email list",
    "Set up a Calendly link and promote it",
    "Create a referral program for existing clients",
    "Build a simple quiz to qualify leads",
    "Set up retargeting ads for website visitors",
  ],
  "sales": [
    "Send {count} proposals to interested prospects",
    "Have {count} discovery calls with potential clients",
    "Follow up on {count} sent proposals",
    "Ask {count} existing clients for referrals",
    "Create a new service package or upsell offer",
    "Review and optimize your sales script",
    "Set up automated follow-up sequences",
  ],
  "product_delivery": [
    "Deliver milestone for existing client",
    "Request a testimonial from a satisfied client",
    "Document your process for future automation",
    "Create templates to speed up delivery",
    "Review client feedback and improve offering",
    "Set up project management system",
    "Create standard operating procedures",
  ],
  "skill_building": [
    "Spend 1 hour learning {skill}",
    "Complete a tutorial on {topic}",
    "Practice {skill} for 30 minutes",
    "Read {count} articles about industry trends",
    "Watch a course module on {topic}",
    "Implement something new you learned",
    "Join a community call or webinar",
  ],
};

const TARGETS = [
  "small business owners",
  "marketing managers",
  "startup founders",
  "e-commerce store owners",
  "local service businesses",
  "coaches and consultants",
  "real estate agents",
  "healthcare practices",
];

const TOPICS = [
  "growing your business",
  "saving time with automation",
  "increasing sales",
  "improving marketing ROI",
  "scaling operations",
  "hiring and outsourcing",
  "pricing strategies",
  "client retention",
];

const SKILLS_TO_LEARN = [
  "copywriting",
  "sales",
  "AI tools",
  "marketing automation",
  "social media marketing",
  "email marketing",
  "SEO",
  "paid advertising",
];

export function generateDailyTasks(input: TaskInput): DailyTask[] {
  const { completedTasksCount, currentStreak } = input;
  
  // Determine task difficulty based on user progress
  const difficulty = determineDifficulty(completedTasksCount, currentStreak);
  
  // Generate 3 diverse tasks
  const tasks: DailyTask[] = [
    generateOutreachTask(difficulty),
    generateRevenueTask(difficulty),
    generateGrowthTask(difficulty),
  ];
  
  return tasks;
}

function determineDifficulty(completedCount: number, streak: number): "Easy" | "Medium" | "Hard" {
  if (streak >= 14 || completedCount >= 50) return "Hard";
  if (streak >= 7 || completedCount >= 20) return "Medium";
  return "Easy";
}

function generateOutreachTask(difficulty: string): DailyTask {
  const templates = TASK_TEMPLATES.outreach;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
  
  const counts: Record<string, number> = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 20,
  };
  
  const times: Record<string, string> = {
    "Easy": "30 min",
    "Medium": "1 hour",
    "Hard": "2 hours",
  };
  
  return {
    task: template
      .replace("{count}", counts[difficulty].toString())
      .replace("{target}", target),
    category: "Outreach",
    estimatedTime: times[difficulty],
    difficulty,
    completed: false,
  };
}

function generateRevenueTask(difficulty: string): DailyTask {
  const templates = [...TASK_TEMPLATES.sales, ...TASK_TEMPLATES.product_delivery];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const counts: Record<string, number> = {
    "Easy": 1,
    "Medium": 2,
    "Hard": 3,
  };
  
  const times: Record<string, string> = {
    "Easy": "30 min",
    "Medium": "1-2 hours",
    "Hard": "2-3 hours",
  };
  
  return {
    task: template.replace("{count}", counts[difficulty].toString()),
    category: "Revenue",
    estimatedTime: times[difficulty],
    difficulty,
    completed: false,
  };
}

function generateGrowthTask(difficulty: string): DailyTask {
  const categories = ["content", "lead_generation", "skill_building"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const templates = TASK_TEMPLATES[category];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const skillToLearn = SKILLS_TO_LEARN[Math.floor(Math.random() * SKILLS_TO_LEARN.length)];
  
  const counts: Record<string, number> = {
    "Easy": 1,
    "Medium": 2,
    "Hard": 3,
  };
  
  const times: Record<string, string> = {
    "Easy": "30 min",
    "Medium": "1 hour",
    "Hard": "1-2 hours",
  };
  
  const categoryLabels: Record<string, string> = {
    "content": "Content",
    "lead_generation": "Lead Gen",
    "skill_building": "Learning",
  };
  
  return {
    task: template
      .replace("{count}", counts[difficulty].toString())
      .replace("{topic}", topic)
      .replace("{skill}", skillToLearn),
    category: categoryLabels[category],
    estimatedTime: times[difficulty],
    difficulty,
    completed: false,
  };
}

// Get tasks for a specific day, generating new ones if needed
export async function getOrGenerateDailyTasks(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  userProfile: { income_goal?: number; skills?: string[]; time_per_week?: number }
): Promise<DailyTask[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check for existing tasks today
  const { data: existingTasks, error } = await supabase
    .from("daily_tasks")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString())
    .order("created_at", { ascending: true });
  
  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  
  if (existingTasks && existingTasks.length >= 3) {
    return existingTasks.map((t: Record<string, unknown>) => ({
      id: t.id,
      task: t.task,
      category: t.category,
      estimatedTime: t.estimated_time,
      difficulty: t.difficulty,
      completed: t.completed,
      completedAt: t.completed_at,
      createdAt: t.created_at,
      expiresAt: t.expires_at,
    }));
  }
  
  // Get user\u0027s streak info
  const { data: streakData } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();
  
  // Generate new tasks
  const taskInput: TaskInput = {
    userId,
    incomeGoal: userProfile?.income_goal || 10000,
    skills: userProfile?.skills || [],
    timePerWeek: userProfile?.time_per_week || 20,
    completedTasksCount: streakData?.total_tasks_completed || 0,
    currentStreak: streakData?.current_streak || 0,
  };
  
  const newTasks = generateDailyTasks(taskInput);
  
  // Insert tasks into database
  const tasksToInsert = newTasks.map((task) => ({
    user_id: userId,
    task: task.task,
    category: task.category,
    estimated_time: task.estimatedTime,
    difficulty: task.difficulty,
    expires_at: tomorrow.toISOString(),
  }));
  
  const { data: insertedTasks, error: insertError } = await supabase
    .from("daily_tasks")
    .insert(tasksToInsert)
    .select();
  
  if (insertError) {
    console.error("Error inserting tasks:", insertError);
    throw insertError;
  }
  
  return insertedTasks.map((t: Record<string, unknown>) => ({
    id: t.id,
    task: t.task,
    category: t.category,
    estimatedTime: t.estimated_time,
    difficulty: t.difficulty,
    completed: t.completed,
    completedAt: t.completed_at,
    createdAt: t.created_at,
    expiresAt: t.expires_at,
  }));
}

// Mark task as complete and update streaks
export async function completeTask(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  taskId: string
): Promise<void> {
  const now = new Date();
  
  // Update task as completed
  const { error: taskError } = await supabase
    .from("daily_tasks")
    .update({
      completed: true,
      completed_at: now.toISOString(),
    })
    .eq("id", taskId)
    .eq("user_id", userId);
  
  if (taskError) throw taskError;
  
  // Get or create user streak
  const { data: streakData, error: streakError } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();
  
  if (streakError && streakError.code !== "PGRST116") {
    throw streakError;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let newStreak = 1;
  let longestStreak = 1;
  let totalCompleted = 1;
  
  if (streakData) {
    const lastCompleted = streakData.last_completed_date 
      ? new Date(streakData.last_completed_date)
      : null;
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastCompleted) {
      lastCompleted.setHours(0, 0, 0, 0);
      
      if (lastCompleted.getTime() === yesterday.getTime()) {
        // Continued streak
        newStreak = streakData.current_streak + 1;
      } else if (lastCompleted.getTime() === today.getTime()) {
        // Already completed today, keep streak
        newStreak = streakData.current_streak;
      }
      // Else streak broken, reset to 1
    }
    
    longestStreak = Math.max(newStreak, streakData.longest_streak);
    totalCompleted = streakData.total_tasks_completed + 1;
  }
  
  // Upsert streak data
  const { error: upsertError } = await supabase
    .from("user_streaks")
    .upsert({
      user_id: userId,
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_completed_date: today.toISOString().split("T")[0],
      total_tasks_completed: totalCompleted,
      updated_at: now.toISOString(),
    });
  
  if (upsertError) throw upsertError;
}