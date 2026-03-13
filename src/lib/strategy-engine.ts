// WealthForge AI Strategy Engine
// Generates realistic, actionable income strategies based on user inputs

export interface StrategyInput {
  incomeGoal: number;
  timeframe: string;
  startingBudget: number;
  skills: string[];
  timePerWeek: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  whyItWorks: string;
  startupCost: number;
  expectedMonthlyIncome: { min: number; max: number };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToFirstRevenue: string;
  category: string;
  actionSteps: string[];
  requirements: string[];
  pros: string[];
  cons: string[];
  score?: number;
}

// Strategy templates database
const STRATEGY_TEMPLATES: Omit<Strategy, "id">[] = [
  {
    name: "AI Automation Agency",
    description: "Help small businesses automate repetitive tasks using AI tools like ChatGPT, Zapier, and Make. You set up workflows that save them hours of manual work.",
    whyItWorks: "Businesses are desperate to cut costs and increase efficiency. AI automation delivers immediate ROI, making it an easy sell. The market is exploding with demand.",
    startupCost: 0,
    expectedMonthlyIncome: { min: 3000, max: 8000 },
    difficulty: "Beginner",
    timeToFirstRevenue: "1-2 weeks",
    category: "AI Services",
    actionSteps: [
      "Learn Zapier and Make.com automation platforms (free tutorials)",
      "Identify 3 local businesses with repetitive manual tasks",
      "Offer to automate one workflow for free as a case study",
      "Create a simple landing page with your automation services",
      "Reach out to 20 businesses per week with specific automation ideas"
    ],
    requirements: ["Basic understanding of business processes", "Willingness to learn no-code tools"],
    pros: ["Zero startup cost", "High demand", "Recurring revenue potential", "Scalable"],
    cons: ["Requires ongoing client management", "Need to stay updated with AI tools"]
  },
  {
    name: "Micro-SaaS Product",
    description: "Build a small software tool that solves a specific problem for a niche audience. Focus on simplicity and solving one pain point extremely well.",
    whyItWorks: "Small software tools can generate passive income with minimal maintenance. Niche audiences have specific problems they're willing to pay for. Low competition in micro-markets.",
    startupCost: 100,
    expectedMonthlyIncome: { min: 2000, max: 10000 },
    difficulty: "Intermediate",
    timeToFirstRevenue: "1-3 months",
    category: "Digital Products",
    actionSteps: [
      "Find a painful problem in a niche community (Reddit, Discord, forums)",
      "Validate demand by getting 10 people to say they'll pay",
      "Build MVP using no-code tools or simple code (Bubble, Webflow, Next.js)",
      "Launch on Product Hunt and niche communities",
      "Iterate based on user feedback and add premium features"
    ],
    requirements: ["Basic coding or no-code skills", "Ability to identify market needs"],
    pros: ["Passive income potential", "High margins", "Scalable", "Sellable asset"],
    cons: ["Takes time to build", "Requires technical skills", "Market risk"]
  },
  {
    name: "AI Content Agency",
    description: "Create blog posts, social media content, and marketing copy for businesses using AI tools. Deliver high-volume, quality content at competitive prices.",
    whyItWorks: "Content marketing is essential but time-consuming. AI lets you produce 10x more content than traditional agencies. Businesses always need fresh content.",
    startupCost: 50,
    expectedMonthlyIncome: { min: 2500, max: 6000 },
    difficulty: "Beginner",
    timeToFirstRevenue: "1-2 weeks",
    category: "Content Services",
    actionSteps: [
      "Master AI writing tools (Claude, GPT-4) and SEO basics",
      "Create a portfolio with 5 sample pieces in different niches",
      "Set up a simple website with service packages and pricing",
      "Find clients on Upwork, Fiverr, or cold outreach to local businesses",
      "Deliver first project for free or at discount to get testimonials"
    ],
    requirements: ["Good writing skills", "Understanding of marketing", "AI tool proficiency"],
    pros: ["Low barrier to entry", "High demand", "Can work remotely", "Scalable with systems"],
    cons: ["Competitive market", "Client management required", "Revisions can be time-consuming"]
  },
  {
    name: "Niche Newsletter",
    description: "Create a paid newsletter focused on a specialized topic where you have expertise or can research deeply. Build a loyal subscriber base.",
    whyItWorks: "Readers pay for specialized knowledge that saves them time or makes them money. Newsletters have low overhead and can be very profitable with small audiences.",
    startupCost: 30,
    expectedMonthlyIncome: { min: 1500, max: 8000 },
    difficulty: "Intermediate",
    timeToFirstRevenue: "2-4 months",
    category: "Content Products",
    actionSteps: [
      "Choose a niche with high-income readers (finance, tech, business)",
      "Set up Beehiiv or Substack with paid subscription option",
      "Write 5 high-quality free posts to attract initial audience",
      "Promote on Twitter, Reddit, and relevant communities",
      "Launch paid tier with exclusive content and community access"
    ],
    requirements: ["Deep knowledge or research ability in niche", "Consistent writing schedule", "Marketing skills"],
    pros: ["Passive income potential", "Builds personal brand", "Location independent", "Compound growth"],
    cons: ["Takes time to build audience", "Requires consistent output", "Competition in popular niches"]
  },
  {
    name: "Local Lead Generation",
    description: "Generate leads for local service businesses (plumbers, roofers, lawyers) using simple websites and Google Ads. Get paid per lead or monthly retainer.",
    whyItWorks: "Local businesses desperately need customers and will pay $50-200 per qualified lead. One new customer can be worth thousands to them.",
    startupCost: 200,
    expectedMonthlyIncome: { min: 3000, max: 10000 },
    difficulty: "Intermediate",
    timeToFirstRevenue: "2-4 weeks",
    category: "Marketing Services",
    actionSteps: [
      "Choose a high-value local service niche (plumbing, roofing, law)",
      "Build a simple landing page targeting local keywords",
      "Set up Google Ads campaign with $200-500 budget",
      "Partner with 2-3 local businesses to sell leads",
      "Optimize campaigns for cost per lead and scale winners"
    ],
    requirements: ["Basic Google Ads knowledge", "Sales skills to partner with businesses", "Some capital for ads"],
    pros: ["High profit margins", "Recurring revenue", "Scalable to multiple cities", "Businesses always need leads"],
    cons: ["Ad spend required", "Competitive in some markets", "Need to manage client relationships"]
  },
  {
    name: "AI Avatar/Video Agency",
    description: "Create AI-generated spokesperson videos, avatars, and voiceovers for businesses using tools like HeyGen, Synthesia, and ElevenLabs.",
    whyItWorks: "Video content is king but expensive to produce. AI video tools let you create professional content at 1/10th the cost. Huge demand from businesses wanting video ads and content.",
    startupCost: 100,
    expectedMonthlyIncome: { min: 2000, max: 7000 },
    difficulty: "Beginner",
    timeToFirstRevenue: "1-2 weeks",
    category: "AI Services",
    actionSteps: [
      "Master AI video tools (HeyGen, Synthesia, ElevenLabs)",
      "Create sample videos showcasing different use cases",
      "Identify businesses needing video content (ads, training, social media)",
      "Offer package deals: 5 videos for $500 or monthly retainer",
      "Scale by creating templates and hiring VA for editing"
    ],
    requirements: ["Creative eye for video", "Basic editing skills", "Understanding of marketing"],
    pros: ["High demand for video content", "Can charge premium prices", "Scalable with templates", "Fun creative work"],
    cons: ["AI tools have monthly costs", "Quality can vary", "Some clients have high expectations"]
  },
  {
    name: "Digital Product Reseller",
    description: "Buy and resell digital products, templates, and courses with resale rights. Focus on high-quality products in trending niches.",
    whyItWorks: "Digital products have 90%+ profit margins and infinite inventory. You can sell the same product thousands of times with no additional cost.",
    startupCost: 50,
    expectedMonthlyIncome: { min: 1000, max: 5000 },
    difficulty: "Beginner",
    timeToFirstRevenue: "1-2 weeks",
    category: "E-commerce",
    actionSteps: [
      "Find digital products with resale rights on Gumroad, Product Hunt",
      "Choose trending niches (AI, productivity, fitness, finance)",
      "Set up Shopify or Stan Store for sales",
      "Create compelling product descriptions and marketing angles",
      "Drive traffic through TikTok, Pinterest, and Instagram"
    ],
    requirements: ["Eye for trending products", "Basic marketing skills", "Social media presence"],
    pros: ["Very high margins", "No inventory", "Passive income potential", "Easy to start"],
    cons: ["Competitive", "Need to find good products", "Marketing required"]
  },
  {
    name: "Freelance Developer (AI-Assisted)",
    description: "Build websites, apps, and tools for clients using AI coding assistants to 10x your productivity. Handle projects that would normally require a team.",
    whyItWorks: "AI coding tools let solo developers compete with agencies. Clients get agency-quality work at freelancer prices. Demand for development is infinite.",
    startupCost: 0,
    expectedMonthlyIncome: { min: 4000, max: 12000 },
    difficulty: "Advanced",
    timeToFirstRevenue: "1-3 weeks",
    category: "Technical Services",
    actionSteps: [
      "Master AI coding tools (Cursor, GitHub Copilot, Claude)",
      "Build portfolio with 3 impressive projects",
      "Create profiles on Upwork, Toptal, and niche job boards",
      "Start with small fixed-price projects to build reviews",
      "Scale to monthly retainers with ongoing clients"
    ],
    requirements: ["Solid coding fundamentals", "Problem-solving ability", "Client communication skills"],
    pros: ["High hourly rates", "Location independent", "Always in demand", "Can specialize in lucrative niches"],
    cons: ["Requires technical skills", "Client management", "Project deadlines can be stressful"]
  }
];

// Skill matching weights
const SKILL_MATCHES: Record<string, string[]> = {
  "Writing": ["AI Content Agency", "Niche Newsletter"],
  "Coding": ["Micro-SaaS Product", "Freelance Developer (AI-Assisted)"],
  "Marketing": ["AI Content Agency", "Local Lead Generation", "Digital Product Reseller"],
  "Design": ["AI Avatar/Video Agency", "Digital Product Reseller"],
  "Sales": ["Local Lead Generation", "AI Automation Agency"],
  "Teaching": ["Niche Newsletter", "AI Content Agency"],
  "AI Tools": ["AI Automation Agency", "AI Content Agency", "AI Avatar/Video Agency"],
  "Social Media": ["AI Content Agency", "Digital Product Reseller"],
  "Data Analysis": ["AI Automation Agency", "Freelance Developer (AI-Assisted)"],
  "Video Editing": ["AI Avatar/Video Agency"]
};

// Remove unused constants - commented out for future use
// const BUDGET_CONSTRAINTS: Record<number, string[]> = {
//   0: ["AI Automation Agency", "AI Content Agency", "Freelance Developer (AI-Assisted)"],
//   50: ["Niche Newsletter", "Digital Product Reseller", "AI Avatar/Video Agency"],
//   100: ["Micro-SaaS Product", "Local Lead Generation"]
// };

// const TIME_CONSTRAINTS: Record<number, string[]> = {
//   5: ["Digital Product Reseller", "Niche Newsletter"],
//   10: ["AI Content Agency", "AI Avatar/Video Agency"],
//   20: ["AI Automation Agency", "Local Lead Generation"],
//   30: ["Micro-SaaS Product", "Freelance Developer (AI-Assisted)"]
// };

export function generateStrategies(input: StrategyInput): Strategy[] {
  const { incomeGoal, startingBudget, skills, timePerWeek } = input;
  
  // Score each strategy based on user inputs
  const scoredStrategies = STRATEGY_TEMPLATES.map((strategy, index) => {
    let score = 0;
    
    // Skill match scoring
    skills.forEach(skill => {
      const matches = SKILL_MATCHES[skill] || [];
      if (matches.includes(strategy.name)) {
        score += 3;
      }
    });
    
    // Budget compatibility
    if (strategy.startupCost <= startingBudget) {
      score += 2;
    } else if (strategy.startupCost <= startingBudget * 1.5) {
      score += 1;
    }
    
    // Income goal compatibility
    const avgIncome = (strategy.expectedMonthlyIncome.min + strategy.expectedMonthlyIncome.max) / 2;
    if (avgIncome >= incomeGoal * 0.8) {
      score += 2;
    } else if (avgIncome >= incomeGoal * 0.5) {
      score += 1;
    }
    
    // Time availability
    if (timePerWeek >= 20 || strategy.difficulty === "Beginner") {
      score += 1;
    }
    
    // Prioritize faster revenue for beginners
    if (strategy.timeToFirstRevenue.includes("week")) {
      score += 1;
    }
    
    return {
      ...strategy,
      id: `strategy-${index}`,
      score
    };
  });
  
  // Sort by score and return top 3
  const topStrategies = scoredStrategies
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  // If we don't have 3 strategies, fill with beginner-friendly options
  if (topStrategies.length < 3) {
    const beginnerStrategies = STRATEGY_TEMPLATES
      .filter(s => s.difficulty === "Beginner" && !topStrategies.find(ts => ts.name === s.name))
      .slice(0, 3 - topStrategies.length)
      .map((s, i) => ({ ...s, id: `strategy-fallback-${i}`, score: 0 }));
    
    topStrategies.push(...beginnerStrategies);
  }
  
  return topStrategies;
}

// Generate execution plan for a strategy
export function generateExecutionPlan(strategy: Strategy, userInput: StrategyInput): string[] {
  const personalizedSteps = strategy.actionSteps.map((step, index) => {
    // Personalize based on user's time availability
    if (step.toLowerCase().includes("week") && userInput.timePerWeek < 10) {
      return `${index + 1}. ${step} (Spread this over 2 weeks given your time constraints)`;
    }
    
    // Personalize based on budget
    if (step.toLowerCase().includes("free") && userInput.startingBudget === 0) {
      return `${index + 1}. ${step} ✓ (No cost option)`;
    }
    
    return `${index + 1}. ${step}`;
  });
  
  return personalizedSteps;
}

// Validate if a strategy is realistic for the user
export function validateStrategy(strategy: Strategy, input: StrategyInput): {
  isValid: boolean;
  warnings: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Check budget
  if (strategy.startupCost > input.startingBudget) {
    warnings.push(`This strategy requires $${strategy.startupCost} but you only have $${input.startingBudget}`);
    recommendations.push("Consider starting with a lower-cost strategy or saving more capital");
  }
  
  // Check time
  if (input.timePerWeek < 10 && strategy.difficulty !== "Beginner") {
    warnings.push(`This strategy may require more than ${input.timePerWeek} hours per week`);
    recommendations.push("Consider blocking specific time slots or starting with a simpler strategy");
  }
  
  // Check income goal feasibility
  const avgIncome = (strategy.expectedMonthlyIncome.min + strategy.expectedMonthlyIncome.max) / 2;
  if (avgIncome < input.incomeGoal * 0.5) {
    warnings.push(`This strategy may not reach your $${input.incomeGoal}/month goal`);
    recommendations.push("Consider combining multiple strategies or adjusting your timeline");
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    recommendations
  };
}

const StrategyEngine = {
  generateStrategies,
  generateExecutionPlan,
  validateStrategy
};

export default StrategyEngine;
