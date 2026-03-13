export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-white/60 mb-6">Last updated: March 12, 2026</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Account information (email, name)</li>
            <li>Profile information (income goals, skills)</li>
            <li>Usage data (strategies generated, features used)</li>
            <li>Payment information (processed securely by Stripe)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Provide and improve our AI-powered services</li>
            <li>Generate personalized business strategies</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important updates and notifications</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="text-white/70">
            We implement industry-standard security measures to protect your data. 
            All data is encrypted in transit and at rest. We use Supabase for secure 
            database hosting and Stripe for secure payment processing.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
          <p className="text-white/70">We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li><strong>OpenAI</strong> - For AI strategy generation</li>
            <li><strong>Stripe</strong> - For payment processing</li>
            <li><strong>Supabase</strong> - For database and authentication</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p className="text-white/70">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
          <p className="text-white/70">
            If you have any questions about this Privacy Policy, please contact us at:
            <a href="mailto:support@wealthforge.ai" className="text-orange-600">support@wealthforge.ai</a>
          </p>
        </div>
      </div>
    </div>
  );
}
