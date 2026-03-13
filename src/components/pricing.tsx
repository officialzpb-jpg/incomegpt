"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CheckoutButton } from "./checkout-button";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring",
    features: [
      "3 strategies/month",
      "Basic details",
      "Email support",
    ],
    cta: "Get Started",
    priceId: null,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "For serious builders",
    features: [
      "Unlimited strategies",
      "Detailed plans",
      "Priority support",
      "Progress tracking",
    ],
    cta: "Start Trial",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_placeholder",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams",
    features: [
      "Everything in Pro",
      "Custom AI training",
      "Account manager",
      "White-label",
    ],
    cta: "Contact",
    priceId: null,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-slate-950">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2 text-slate-100">Simple Pricing</h2>
          <p className="text-sm text-slate-500">Start free, upgrade when ready</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl p-5 ${
                plan.popular
                  ? "bg-gradient-to-b from-orange-950/50 to-slate-900/50 border border-orange-800/30"
                  : "bg-slate-900/50 border border-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-800 to-orange-950 text-orange-100 text-[10px] font-medium px-2 py-0.5 rounded-full border border-orange-700/50">
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1 text-slate-200">{plan.name}</h3>
                <p className="text-xs text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-semibold text-slate-100">{plan.price}</span>
                {plan.period && (
                  <span className="text-xs text-slate-500">/{plan.period}</span>
                )}
              </div>

              <ul className="space-y-2 mb-5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <Check className="h-3 w-3 text-orange-600 flex-shrink-0" />
                    <span className="text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.priceId ? (
                <CheckoutButton
                  priceId={plan.priceId}
                  className={`block w-full text-center py-2 rounded-md text-xs font-medium transition-colors ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-800 to-orange-950 text-orange-100 hover:from-orange-900 hover:to-black border border-orange-800/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  {plan.cta}
                </CheckoutButton>
              ) : (
                <a
                  href={plan.name === "Enterprise" ? "mailto:sales@wealthforge.com" : "/signup"}
                  className={`block w-full text-center py-2 rounded-md text-xs font-medium transition-colors ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-800 to-orange-950 text-orange-100 hover:from-orange-900 hover:to-black border border-orange-800/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
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
