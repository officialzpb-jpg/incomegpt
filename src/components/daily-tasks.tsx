"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Trophy, 
  Clock,
  Zap,
  Target,
  Loader2
} from "lucide-react";

interface DailyTask {
  id: string;
  task: string;
  category: string;
  estimatedTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  completedAt?: string;
}

interface StreakData {
  current_streak: number;
  longest_streak: number;
  total_tasks_completed: number;
}

export function DailyTasks() {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [streak, setStreak] = useState<StreakData>({
    current_streak: 0,
    longest_streak: 0,
    total_tasks_completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute
    updateTimeLeft();
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks/daily");
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks);
        setStreak(data.streak);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeLeft(`${hours}h ${minutes}m`);
  };

  const completeTask = async (taskId: string) => {
    setCompletingId(taskId);
    
    try {
      const response = await fetch("/api/tasks/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev =>
          prev.map(t =>
            t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
          )
        );
        setStreak(data.streak);
      }
    } catch (error) {
      console.error("Error completing task:", error);
    } finally {
      setCompletingId(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-400 bg-emerald-500/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10";
      case "Hard":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-white/60 bg-white/5";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Outreach":
        return <Target className="h-4 w-4" />;
      case "Revenue":
        return <Zap className="h-4 w-4" />;
      case "Content":
      case "Lead Gen":
      case "Learning":
        return <Flame className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Target className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold">Daily Income Tasks</h3>
            <p className="text-sm text-white/60">Complete all 3 to maintain your streak</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="h-4 w-4" />
              <span className="font-bold">{streak.current_streak}</span>
              <span className="text-sm">day streak</span>
            </div>
            <div className="text-xs text-white/40">Resets in {timeLeft}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-white/60">Today\u0027s Progress</span>
          <span className="font-medium">{completedCount}/{tasks.length} completed</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl border transition-all ${
                task.completed
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => !task.completed && completeTask(task.id)}
                  disabled={task.completed || completingId === task.id}
                  className={`flex-shrink-0 mt-0.5 transition-all ${
                    task.completed ? "cursor-default" : "hover:scale-110"
                  }`}
                >
                  {completingId === task.id ? (
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
                  ) : task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <Circle className="h-6 w-6 text-white/40 hover:text-emerald-400" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium mb-2 ${task.completed ? "line-through text-white/50" : ""}`}>
                    {task.task}
                  </p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-white/60">
                      {getCategoryIcon(task.category)}
                      {task.category}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1 text-xs text-white/60">
                      <Clock className="h-3 w-3" />
                      {task.estimatedTime}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      {completedCount === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30 text-center"
        >
          <Trophy className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
          <p className="font-semibold">All tasks completed! 🔥</p>
          <p className="text-sm text-white/60">You&apos;re on a {streak.current_streak}-day streak. Keep it up!</p>
        </motion.div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/40">
        <span>Total completed: {streak.total_tasks_completed}</span>
        <span>Longest streak: {streak.longest_streak} days</span>
      </div>
    </div>
  );
}