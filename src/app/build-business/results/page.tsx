"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Building2, 
  Target, 
  Package, 
  DollarSign,
  Users,
  Rocket,
  MessageSquare,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
  ChevronRight,
  Lightbulb,
  Clock,
  Wallet,
  Briefcase
} from "lucide-react";
import { BusinessBlueprint, BlueprintInput } from "@/lib/business-engine";

export default function BlueprintResultsPage() {
  const router = useRouter();
  const [blueprint, setBlueprint] = useState<BusinessBlueprint | null>(null);
  const [input, setInput] = useState<BlueprintInput | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  useEffect(() => {
    const storedBlueprint = sessionStorage.getItem("businessBlueprint");
    const storedInput = sessionStorage.getItem("blueprintInput");
    
    if (!storedBlueprint) {
      router.push("/build-business");
      return;
    }
    
    if (storedBlueprint) {
      setBlueprint(JSON.parse(storedBlueprint));
    }
    if (storedInput) {
      setInput(JSON.parse(storedInput));
    }
  }, [router]);

  const copyToClipboard = (text: string, scriptName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(scriptName);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const downloadBlueprint = () => {
    if (!blueprint) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blueprint, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "10k-business-blueprint.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!blueprint) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-orange-600 mx-auto mb-4 animate-pulse" />
          <p className="text-white/60">Loading your blueprint...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "market", label: "Target Market", icon: Target },
    { id: "offering", label: "Offering", icon: Package },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "acquisition", label: "Acquisition", icon: Users },
    { id: "actionplan", label: "30-Day Plan", icon: Rocket },
    { id: "scripts", label: "Scripts", icon: MessageSquare },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "projections", label: "Projections", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/build-business" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-semibold">Your $10K Business Blueprint</h1>
                <p className="text-sm text-white/60">{blueprint.businessModel.name}</p>
              </div>
            </div>
            <button
              onClick={downloadBlueprint}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                      activeTab === tab.id
                        ? "bg-orange-700/20 text-orange-600"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-700/10 border border-orange-700/20 text-orange-600 text-sm mb-6">
                      <Sparkles className="h-4 w-4" />
                      <span>AI-Generated Business Model</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{blueprint.businessModel.name}</h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                      {blueprint.businessModel.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-white/60 mb-1">Type</div>
                        <div className="font-semibold">{blueprint.businessModel.type}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-white/60 mb-1">Revenue Model</div>
                        <div className="font-semibold">{blueprint.businessModel.revenueModel}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-white/60 mb-1">Scalability</div>
                        <div className="font-semibold">{blueprint.businessModel.scalabilityScore}/10</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-white/60 mb-1">Path to $10K</div>
                        <div className="font-semibold text-orange-600">{blueprint.pricingStrategy.pathTo10K}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass rounded-2xl p-6">
                      <Clock className="h-8 w-8 text-orange-600 mb-4" />
                      <h3 className="font-semibold mb-2">Time Commitment</h3>
                      <p className="text-white/60 text-sm">{input?.timePerWeek} hours/week</p>
                    </div>
                    <div className="glass rounded-2xl p-6">
                      <Wallet className="h-8 w-8 text-orange-600 mb-4" />
                      <h3 className="font-semibold mb-2">Starting Budget</h3>
                      <p className="text-white/60 text-sm">${input?.startingBudget}</p>
                    </div>
                    <div className="glass rounded-2xl p-6">
                      <Briefcase className="h-8 w-8 text-orange-600 mb-4" />
                      <h3 className="font-semibold mb-2">Primary Skills</h3>
                      <p className="text-white/60 text-sm">{input?.skills?.join(", ")}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "market" && (
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Target className="h-6 w-6 text-orange-600" />
                    Target Market
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm text-white/60 mb-2">Primary Audience</h3>
                      <p className="text-lg">{blueprint.targetMarket.primaryAudience}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-white/60 mb-2">Pain Points</h3>
                      <ul className="space-y-2">
                        {blueprint.targetMarket.painPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm text-white/60 mb-2">Demographics</h3>
                        <p>{blueprint.targetMarket.demographics}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-white/60 mb-2">Market Size</h3>
                        <p>{blueprint.targetMarket.marketSize}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offering" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">{blueprint.offering.serviceOrProduct}</h2>
                    <p className="text-white/70 text-lg mb-6">{blueprint.offering.coreOffer}</p>
                    
                    <h3 className="font-semibold mb-3">Deliverables</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {blueprint.offering.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                          <CheckCircle2 className="h-5 w-5 text-orange-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-xl font-semibold mb-4">Upsell Opportunities</h3>
                    <div className="space-y-3">
                      {blueprint.offering.upsells.map((upsell, i) => (
                        <div key={i} className="flex items-center gap-3 bg-orange-700/10 border border-orange-700/20 rounded-lg p-4">
                          <DollarSign className="h-5 w-5 text-orange-600" />
                          {upsell}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8 text-center">
                    <p className="text-sm text-white/60 mb-2">Pricing Strategy</p>
                    <h2 className="text-3xl font-bold text-orange-600 mb-2">{blueprint.pricingStrategy.pricePoint}</h2>
                    <p className="text-white/60">{blueprint.pricingStrategy.pricingModel}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blueprint.pricingStrategy.packages.map((pkg, i) => (
                      <div key={i} className={`glass rounded-2xl p-6 ${i === 1 ? "border-2 border-orange-700/50" : ""}`}>
                        {i === 1 && (
                          <div className="inline-block px-3 py-1 bg-orange-700 text-white text-xs rounded-full mb-4">
                            Recommended
                          </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <div className="text-3xl font-bold text-orange-600 mb-4">{pkg.price}</div>
                        
                        <ul className="space-y-2 mb-4">
                          {pkg.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="text-xs text-white/60 pt-4 border-t border-white/10">
                          Target: {pkg.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "acquisition" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-600" />
                        Primary Channels
                      </h3>
                      <ul className="space-y-2">
                        {blueprint.customerAcquisition.primaryChannels.map((channel, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-orange-600" />
                            {channel}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-600" />
                        Secondary Channels
                      </h3>
                      <ul className="space-y-2">
                        {blueprint.customerAcquisition.secondaryChannels.map((channel, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-orange-600" />
                            {channel}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Lead Generation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {blueprint.customerAcquisition.leadGeneration.map((lead, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-4 text-center">
                          {lead}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Conversion Strategy</h3>
                    <p className="text-white/70">{blueprint.customerAcquisition.conversionStrategy}</p>
                  </div>
                </div>
              )}

              {activeTab === "actionplan" && (
                <div className="space-y-6">
                  {[
                    { week: "Week 1", items: blueprint.first30Days.week1 },
                    { week: "Week 2", items: blueprint.first30Days.week2 },
                    { week: "Week 3", items: blueprint.first30Days.week3 },
                    { week: "Week 4", items: blueprint.first30Days.week4 },
                  ].map((week, i) => (
                    <div key={i} className="glass rounded-2xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-orange-600">{week.week}</h3>
                      <ul className="space-y-3">
                        {week.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-700/20 text-orange-600 text-xs font-bold flex-shrink-0">
                              {j + 1}
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="glass rounded-2xl p-6 border-2 border-orange-700/30">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-orange-600" />
                      30-Day Milestones
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {blueprint.first30Days.milestones.map((milestone, i) => (
                        <div key={i} className="flex items-center gap-3 bg-orange-700/10 rounded-lg p-4">
                          <CheckCircle2 className="h-5 w-5 text-orange-600" />
                          {milestone}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "scripts" && (
                <div className="space-y-6">
                  {[
                    { name: "Cold Email", script: blueprint.outreachScripts.coldEmail },
                    { name: "LinkedIn DM", script: blueprint.outreachScripts.linkedinDm },
                    { name: "Cold Call", script: blueprint.outreachScripts.coldCall },
                    { name: "Referral Ask", script: blueprint.outreachScripts.referralAsk },
                  ].map((item) => (
                    <div key={item.name} className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <button
                          onClick={() => copyToClipboard(item.script, item.name)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                        >
                          {copiedScript === item.name ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-orange-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-black/50 rounded-lg p-4 text-sm text-white/80 whitespace-pre-wrap font-mono">
                        {item.script}
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "tools" && (
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Recommended Tool Stack</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blueprint.recommendedTools.map((tool, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-white/60 uppercase tracking-wide">{tool.category}</span>
                          <span className="text-sm text-orange-600">{tool.cost}</span>
                        </div>
                        <h3 className="font-semibold mb-1">{tool.tool}</h3>
                        <p className="text-sm text-white/60">{tool.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "projections" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Financial Projections</h2>
                    
                    <div className="space-y-4">
                      {[
                        { label: "Month 1", value: blueprint.financialProjection.month1 },
                        { label: "Month 3", value: blueprint.financialProjection.month3 },
                        { label: "Month 6", value: blueprint.financialProjection.month6 },
                        { label: "Month 12", value: blueprint.financialProjection.month12 },
                      ].map((proj, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <span className="font-medium">{proj.label}</span>
                          <span className="text-xl font-bold text-orange-600">{proj.value}</span>
                        </div>
                      ))}
                    </div>                  
                  </div>
                  
                  <div className="glass rounded-2xl p-6 border-2 border-orange-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60">Break-even Timeline</p>
                        <p className="text-2xl font-bold">{blueprint.financialProjection.breakEven}</p>
                      </div>
                      <TrendingUp className="h-12 w-12 text-orange-600" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
