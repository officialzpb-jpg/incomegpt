export interface Strategy {
  id: string;
  title: string;
  description: string;
  whyItWorks: string;
  expectedMonthlyIncome: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  startupCost: string;
  timeframe: string;
  timeToFirstDollar: string;
  steps: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  incomeGoal: number;
  savedStrategies: Strategy[];
}

export interface StrategyInput {
  incomeGoal: number;
  timeframe: string;
  startingBudget: number;
  skills: string[];
}
