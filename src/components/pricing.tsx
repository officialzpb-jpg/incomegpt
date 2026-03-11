"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CheckoutButton } from "./checkout-button";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring your options",
    features: [
      "3 strategy generations/month",
      "Basic strategy details",
      "Email support",
      "Community access",
    ],
    cta: "Get Started",
    priceId: null, // Free plan
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For serious income builders",
    features: [
      "Unlimited strategy generations",
      "Detailed execution plans",
      "Priority support",
      "Progress tracking",
      "Market insights",
      "API access",
    ],
    cta: "Start Free Trial",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_placeholder",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Custom AI training",
      "Dedicated account manager",
      "White-label options",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    priceId: null,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Start free, upgrade when you\u0026apos;re ready to scale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 glow"
                  : "glass"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/60">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-white/60">/{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.priceId ? (
                <CheckoutButton
                  priceId={plan.priceId}
                  className={`block w-full text-center py-3 rounded-full font-medium transition-colors ${
                    plan.popular
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                </CheckoutButton>
              ) : (
                <a
                  href={plan.name === "Enterprise" ? "mailto:sales@incomegpt.com" : "/signup"}
                  className={`block w-full text-center py-3 rounded-full font-medium transition-colors ${
                    plan.popular
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}