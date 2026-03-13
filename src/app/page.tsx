import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ExampleStrategies } from "@/components/example-strategies";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { ForgeBackground } from "@/components/forge-background";
import { SocialProof } from "@/components/social-proof";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ForgeBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SocialProof />
        <HowItWorks />
        <ExampleStrategies />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
