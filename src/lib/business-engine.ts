// Business Blueprint Engine for IncomeGPT
// Generates comprehensive $10K/month business plans

export interface BlueprintInput {
  skills: string[];
  timePerWeek: number;
  startingBudget: number;
  interests: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
}

export interface BusinessBlueprint {
  businessModel: {
    name: string;
    description: string;
    type: "Service" | "Product" | "Hybrid";
    revenueModel: string;
    scalabilityScore: number;
  };
  targetMarket: {
    primaryAudience: string;
    painPoints: string[];
    demographics: string;
    marketSize: string;
  };
  offering: {
    serviceOrProduct: string;
    coreOffer: string;
    upsells: string[];
    deliverables: string[];
  };
  pricingStrategy: {
    pricePoint: string;
    pricingModel: string;
    packages: {
      name: string;
      price: string;
      features: string[];
      target: string;
    }[];
    pathTo10K: string;
  };
  customerAcquisition: {
    primaryChannels: string[];
    secondaryChannels: string[];
    leadGeneration: string[];
    conversionStrategy: string;
  };
  first30Days: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
    milestones: string[];
  };
  outreachScripts: {
    coldEmail: string;
    linkedinDm: string;
    coldCall: string;
    referralAsk: string;
  };
  recommendedTools: {
    category: string;
    tool: string;
    purpose: string;
    cost: string;
  }[];
  financialProjection: {
    month1: string;
    month3: string;
    month6: string;
    month12: string;
    breakEven: string;
  };
}

const skillToBusinessMap: Record<string, string> = {
  "Writing": "AI Content Agency",
  "Coding": "SaaS Development Studio",
  "Design": "Brand Design Studio",
  "Marketing": "Growth Marketing Agency",
  "Sales": "Sales Consulting",
  "Teaching": "Online Course Business",
  "Photography": "Content Creation Studio",
  "Video Editing": "Video Production Agency",
  "Data Analysis": "Data Consulting",
  "Social Media": "Social Media Agency",
  "SEO": "SEO Consulting",
  "Copywriting": "Direct Response Agency",
  "AI Tools": "AI Automation Agency",
  "Consulting": "Strategy Consulting",
  "Project Management": "Operations Consulting",
};

export function generateBusinessBlueprint(input: BlueprintInput): BusinessBlueprint {
  const { skills, timePerWeek, startingBudget, interests, experienceLevel } = input;
  
  // Determine best business model based on skills
  const primarySkill = skills[0] || "Writing";
  const businessName = skillToBusinessMap[primarySkill] || "Digital Service Agency";
  
  // Generate blueprint based on inputs
  const blueprint: BusinessBlueprint = {
    businessModel: {
      name: businessName,
      description: generateBusinessDescription(primarySkill, interests),
      type: "Service",
      revenueModel: "Project-based + Monthly retainers",
      scalabilityScore: timePerWeek >= 20 ? 8 : 6,
    },
    targetMarket: generateTargetMarket(interests, primarySkill),
    offering: generateOffering(primarySkill, experienceLevel),
    pricingStrategy: generatePricingStrategy(startingBudget, experienceLevel),
    customerAcquisition: generateAcquisitionStrategy(primarySkill),
    first30Days: generateFirst30Days(timePerWeek),
    outreachScripts: generateOutreachScripts(businessName),
    recommendedTools: generateToolStack(startingBudget),
    financialProjection: generateProjections(experienceLevel),
  };
  
  return blueprint;
}

function generateBusinessDescription(skill: string, interests: string): string {
  const descriptions: Record<string, string> = {
    "Writing": `High-ticket content agency helping ${interests} businesses create compelling content that converts.`,
    "Coding": `Custom software development studio specializing in ${interests} solutions for small to mid-size businesses.`,
    "Design": `Premium brand design studio creating memorable identities for ${interests} companies.`,
    "Marketing": `Performance marketing agency driving measurable growth for ${interests} businesses.`,
    "Sales": `Sales consulting firm helping ${interests} companies optimize their sales processes and close more deals.`,
    "AI Tools": `AI automation agency implementing cutting-edge solutions for ${interests} businesses.`,
  };
  
  return descriptions[skill] || `Professional service business serving the ${interests} industry with expert ${skill.toLowerCase()} solutions.`;
}

function generateTargetMarket(interests: string, skill: string) {
  return {
    primaryAudience: `${interests} businesses and professionals`,
    painPoints: [
      "Lack of in-house expertise",
      "Too time-consuming to do internally",
      "Previous solutions were too expensive",
      "Need results quickly",
    ],
    demographics: "Small to mid-size businesses ($500K-$5M revenue), decision-makers (owners, directors, VPs)",
    marketSize: "$10B+ addressable market with 15% annual growth",
  };
}

function generateOffering(skill: string, experienceLevel: string) {
  const offerings: Record<string, { service: string; core: string; deliverables: string[] }> = {
    "Writing": {
      service: "Content Creation Services",
      core: "Done-for-you blog posts, email sequences, and sales copy",
      deliverables: ["Content strategy", "SEO-optimized articles", "Email campaigns", "Performance reports"],
    },
    "Coding": {
      service: "Custom Software Development",
      core: "Bespoke web applications and automation tools",
      deliverables: ["Requirements analysis", "MVP development", "Testing & deployment", "Documentation"],
    },
    "Design": {
      service: "Brand Design Services",
      core: "Complete brand identity and visual systems",
      deliverables: ["Logo design", "Brand guidelines", "Marketing materials", "Social media templates"],
    },
    "AI Tools": {
      service: "AI Implementation Services",
      core: "Custom AI workflow automation and training",
      deliverables: ["Workflow audit", "AI integration", "Staff training", "Ongoing support"],
    },
  };
  
  const offering = offerings[skill] || {
    service: "Professional Services",
    core: "Expert consulting and implementation",
    deliverables: ["Strategy session", "Implementation", "Training", "Support"],
  };
  
  return {
    serviceOrProduct: offering.service,
    coreOffer: offering.core,
    upsells: [
      "Ongoing maintenance ($500-1000/mo)",
      "Priority support ($200-300/mo)",
      "Advanced training ($500-1000)",
    ],
    deliverables: offering.deliverables,
  };
}

function generatePricingStrategy(budget: number, experienceLevel: string) {
  const multiplier = experienceLevel === "advanced" ? 1.5 : experienceLevel === "intermediate" ? 1.2 : 1;
  const basePrice = Math.round(1500 * multiplier);
  
  return {
    pricePoint: `$${basePrice} - $${Math.round(basePrice * 3)} per project`,
    pricingModel: "Project-based with monthly retainers",
    packages: [
      {
        name: "Starter",
        price: `$${basePrice}`,
        features: ["Essential deliverables", "Email support", "2 revisions"],
        target: "Small businesses testing the waters",
      },
      {
        name: "Professional",
        price: `$${Math.round(basePrice * 2)}`,
        features: ["Full deliverables", "Priority support", "Unlimited revisions", "Strategy call"],
        target: "Growing businesses ready to invest",
      },
      {
        name: "Enterprise",
        price: `$${Math.round(basePrice * 3)}+`,
        features: ["Everything in Pro", "Dedicated support", "Custom solutions", "Ongoing optimization"],
        target: "Established businesses with complex needs",
      },
    ],
    pathTo10K: `Close ${Math.ceil(10000 / (basePrice * 2))} Professional packages OR mix of Starter + Enterprise clients monthly`,
  };
}

function generateAcquisitionStrategy(skill: string) {
  return {
    primaryChannels: ["LinkedIn outreach", "Cold email", "Referrals"],
    secondaryChannels: ["Content marketing", "Industry events", "Strategic partnerships"],
    leadGeneration: [
      "Free audit/consultation",
      "Case studies and testimonials",
      "Valuable content and tools",
    ],
    conversionStrategy: "Free discovery call → Proposal → Pilot project → Retainer",
  };
}

function generateFirst30Days(timePerWeek: number) {
  const dailyActions = timePerWeek >= 20 ? 20 : timePerWeek >= 10 ? 10 : 5;
  
  return {
    week1: [
      "Set up business entity and banking",
      "Create portfolio samples (3 pieces)",
      "Build landing page with booking system",
      `List ${dailyActions * 5} target prospects`,
    ],
    week2: [
      `Send ${dailyActions} personalized outreach messages daily`,
      "Post valuable content on LinkedIn (5 posts)",
      "Join 3 relevant communities/groups",
      "Create lead magnet (free tool/audit)",
    ],
    week3: [
      "Book 5+ discovery calls",
      "Deliver 2 free mini-consultations",
      "Refine pitch based on feedback",
      "Follow up with all prospects",
    ],
    week4: [
      "Close first client (prioritize learning over profit)",
      "Document process for case study",
      "Ask for testimonial",
      "Plan month 2 scaling strategy",
    ],
    milestones: [
      "Business legally set up",
      "Portfolio complete",
      "50+ prospects contacted",
      "First paying client landed",
    ],
  };
}

function generateOutreachScripts(businessName: string) {
  return {
    coldEmail: `Subject: Quick question about [Company]\n\nHi [Name],\n\nI help businesses like [Company] [achieve specific result].\n\nRecently worked with a similar company and helped them [specific outcome with numbers].\n\nWorth a brief conversation to see if I can do the same for you?\n\nBest,\n[Your name]\n\nP.S. Happy to share a quick audit - no pitch, just value.`,
    linkedinDm: `Hi [Name],\n\nSaw your post about [topic] - great insights!\n\nI specialize in helping [target] achieve [result].\n\nWould you be open to a quick conversation about [specific pain point]?\n\nNo pressure either way!`,
    coldCall: `Hi [Name], this is [Your name] from [Company].\n\nI'm calling because I work with [target market] to [solve problem].\n\nMost clients see [specific result] within [timeframe].\n\nDo you have 2 minutes? If this doesn't make sense, I'll hang up. Fair?`,
    referralAsk: `Hi [Name],\n\nHope you're enjoying the results so far!\n\nQuick favor - do you know anyone else who might benefit from similar [outcomes]?\n\nLooking to help 2 more [target] this month. Happy to offer $500 for any intro that becomes a client.\n\nThanks!`,
  };
}

function generateToolStack(budget: number) {
  const tools = [
    { category: "CRM", tool: "HubSpot Free", purpose: "Track leads and deals", cost: "Free" },
    { category: "Scheduling", tool: "Calendly", purpose: "Book discovery calls", cost: "$10/mo" },
    { category: "Email", tool: "GMail + Hunter.io", purpose: "Cold outreach", cost: "Free-$50/mo" },
    { category: "Proposals", tool: "Google Docs", purpose: "Send proposals", cost: "Free" },
    { category: "Payments", tool: "Stripe", purpose: "Collect payments", cost: "2.9% + 30¢" },
  ];
  
  if (budget >= 100) {
    tools.push({ category: "Automation", tool: "Make.com", purpose: "Workflow automation", cost: "$9/mo" });
  }
  
  if (budget >= 500) {
    tools.push({ category: "Email", tool: "Instantly", purpose: "Cold email at scale", cost: "$37/mo" });
  }
  
  return tools;
}

function generateProjections(experienceLevel: string) {
  const speed = experienceLevel === "advanced" ? "fast" : experienceLevel === "intermediate" ? "medium" : "steady";
  
  const projections = {
    fast: {
      month1: "$2,000-5,000",
      month3: "$6,000-10,000",
      month6: "$12,000-20,000",
      month12: "$20,000-40,000",
      breakEven: "Month 1-2",
    },
    medium: {
      month1: "$1,000-3,000",
      month3: "$5,000-8,000",
      month6: "$10,000-15,000",
      month12: "$15,000-30,000",
      breakEven: "Month 2-3",
    },
    steady: {
      month1: "$0-2,000",
      month3: "$3,000-6,000",
      month6: "$8,000-12,000",
      month12: "$12,000-25,000",
      breakEven: "Month 3-4",
    },
  };
  
  return projections[speed];
}