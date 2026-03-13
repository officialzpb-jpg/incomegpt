import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
