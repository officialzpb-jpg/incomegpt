"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Rocket,
  Target,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Mail,
  Wrench,
  Calendar,
  CheckCircle2,
  Copy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";

interface Blueprint {
  businessModel: {
    name: string;
    description: string;
    type: string;
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

const sectionIcons: Record<string, React.ReactNode> = {
  businessModel: <Rocket className="h-5 w-5" />,
  targetMarket: <Users className="h-5 w-5" />,
  offering: <Package className="h-5 w-5" />,
  pricingStrategy: <DollarSign className="h-5 w-5" />,
  customerAcquisition: <TrendingUp className="h-5 w-5" />,
  first30Days: <Calendar className="h-5 w-5" />,
  outreachScripts: <Mail className="h-5 w-5" />,
  recommendedTools: <Wrench className="h-5 w-5" />,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
    >
      {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function SectionCard({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const iconKey = title.toLowerCase().replace(/\s+/g, '');
  const icon = sectionIcons[iconKey] || <Sparkles className="h-5 w-5" />;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-white/60" /> : <ChevronDown className="h-5 w-5 text-white/60" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BlueprintPage() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeScript, setActiveScript] = useState<"coldEmail" | "linkedinDm" | "coldCall" | "referralAsk">("coldEmail");

  useEffect(() => {
    const stored = sessionStorage.getItem("businessBlueprint");
    if (stored) {
      setBlueprint(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!blueprint) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Rocket className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">No Blueprint Found</h1>
          <p className="text-white/60 mb-6">Generate your business blueprint first.</p>
          <Link href="/business/build" className="text-emerald-400 hover:text-emerald-300">
            Build Your Business →
          </Link>
        </div>
      </div>
    );
  }

  const scriptTabs = [
    { key: "coldEmail", label: "Cold Email" },
    { key: "linkedinDm", label: "LinkedIn DM" },
    { key: "coldCall", label: "Cold Call" },
    { key: "referralAsk", label: "Referral Ask" },
  ] as const;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/business/build" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-semibold">Your $10K Business Blueprint</h1>
                <p className="text-sm text-white/60">{blueprint.businessModel.name}</p>
              </div>
            </div>
            
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
            >
              <Copy className="h-4 w-4" />
              Save / Print
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">
        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-4"
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">$10K</div>
            <div className="text-sm text-white/60">Monthly Goal</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{blueprint.businessModel.scalabilityScore}/10</div>
            <div className="text-sm text-white/60">Scalability</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{blueprint.financialProjection.breakEven}</div>
            <div className="text-sm text-white/60">Break Even</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1">{blueprint.pricingStrategy.packages.length}</div>
            <div className="text-sm text-white/60">Pricing Tiers</div>
          </div>
        </motion.div>

        {/* Business Model */}
        <SectionCard title="Business Model" defaultOpen={true}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                {blueprint.businessModel.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                {blueprint.businessModel.revenueModel}
              </span>
            </div>
            <p className="text-white/80">{blueprint.businessModel.description}</p>
          </div>
        </SectionCard>

        {/* Target Market */}
        <SectionCard title="Target Market">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Primary Audience</h4>
              <p className="text-white/80">{blueprint.targetMarket.primaryAudience}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Demographics</h4>
              <p className="text-white/80">{blueprint.targetMarket.demographics}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Key Pain Points</h4>
              <ul className="space-y-2">
                {blueprint.targetMarket.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <span className="text-emerald-400 mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Offering */}
        <SectionCard title="Your Offer">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Core Offer</h4>
              <p className="text-white/80">{blueprint.offering.coreOffer}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Deliverables</h4>
              <ul className="space-y-2">
                {blueprint.offering.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Upsell Opportunities</h4>
              <ul className="space-y-2">
                {blueprint.offering.upsells.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <span className="text-emerald-400">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Pricing Strategy */}
        <SectionCard title="Pricing Strategy" defaultOpen={true}>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {blueprint.pricingStrategy.packages.map((pkg, i) => (
                <div key={i} className={`rounded-xl p-6 border ${i === 1 ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
                  <h4 className="font-semibold mb-2">{pkg.name}</h4>
                  <div className="text-2xl font-bold text-emerald-400 mb-4">{pkg.price}</div>
                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/70">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                    {pkg.target}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-medium text-emerald-400 mb-2">Path to $10K/month</h4>
              <p className="text-white/80">{blueprint.pricingStrategy.pathTo10K}</p>
            </div>
          </div>
        </SectionCard>

        {/* Customer Acquisition */}
        <SectionCard title="Customer Acquisition">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Primary Channels</h4>
                <div className="flex flex-wrap gap-2">
                  {blueprint.customerAcquisition.primaryChannels.map((channel, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Secondary Channels</h4>
                <div className="flex flex-wrap gap-2">
                  {blueprint.customerAcquisition.secondaryChannels.map((channel, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Lead Generation</h4>
              <ul className="space-y-2">
                {blueprint.customerAcquisition.leadGeneration.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <Target className="h-4 w-4 text-emerald-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="font-medium mb-2">Conversion Strategy</h4>
              <p className="text-white/80">{blueprint.customerAcquisition.conversionStrategy}</p>
            </div>
          </div>
        </SectionCard>

        {/* First 30 Days */}
        <SectionCard title="First 30 Days" defaultOpen={true}>
          <div className="space-y-6">
            {[
              { week: "Week 1", items: blueprint.first30Days.week1 },
              { week: "Week 2", items: blueprint.first30Days.week2 },
              { week: "Week 3", items: blueprint.first30Days.week3 },
              { week: "Week 4", items: blueprint.first30Days.week4 },
            ].map(({ week, items }, i) => (
              <div key={i}>
                <h4 className="font-medium text-emerald-400 mb-3">{week}</h4>
                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/80">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs">
                        {j + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-medium text-emerald-400 mb-2">30-Day Milestones</h4>
              <div className="flex flex-wrap gap-2">
                {blueprint.first30Days.milestones.map((milestone, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                    ✓ {milestone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Outreach Scripts */}
        <SectionCard title="Outreach Scripts">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {scriptTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveScript(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeScript === tab.key
                      ? "bg-emerald-500 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <pre className="p-4 rounded-xl bg-black/50 border border-white/10 text-sm text-white/80 whitespace-pre-wrap font-mono">
                {blueprint.outreachScripts[activeScript]}
              </pre>
              <div className="absolute top-4 right-4">
                <CopyButton text={blueprint.outreachScripts[activeScript]} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Recommended Tools */}
        <SectionCard title="Recommended Tools">
          <div className="grid md:grid-cols-2 gap-4">
            {blueprint.recommendedTools.map((tool, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Wrench className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{tool.tool}</h4>
                    <span className="text-sm text-emerald-400">{tool.cost}</span>
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-wide mt-1">{tool.category}</p>
                  <p className="text-sm text-white/70 mt-1">{tool.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Financial Projections */}
        <SectionCard title="Financial Projections" defaultOpen={true}>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { label: "Month 1", value: blueprint.financialProjection.month1, color: "text-white/60" },
              { label: "Month 3", value: blueprint.financialProjection.month3, color: "text-blue-400" },
              { label: "Month 6", value: blueprint.financialProjection.month6, color: "text-purple-400" },
              { label: "Month 12", value: blueprint.financialProjection.month12, color: "text-emerald-400" },
              { label: "Break Even", value: blueprint.financialProjection.breakEven, color: "text-pink-400" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-sm text-white/50 mb-2">{item.label}</div>
                <div className={`text-sm font-medium ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <Link
            href="/business/build"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Rocket className="h-4 w-4" />
            Generate Another Blueprint
          </Link>
        </motion.div>
      </main>
    </div>
  );
}