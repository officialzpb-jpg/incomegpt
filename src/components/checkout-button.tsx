"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Use stripePromise to preload Stripe
void stripePromise;

interface CheckoutButtonProps {
  priceId: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckoutButton({ priceId, children, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      
      const data = await response.json();
      
      if (response.status === 401) {
        // Not authenticated, redirect to login
        router.push("/login?redirect=/pricing");
        return;
      }
      
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
