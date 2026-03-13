export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-white/60 mb-6">Last updated: March 12, 2026</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-white/70">
            By accessing or using WealthForge, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="text-white/70">
            WealthForge is an AI-powered platform that generates business strategies,
            content, and outreach campaigns to help users forge their path to wealth. 
            We do not guarantee any specific income results from using our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p className="text-white/70">You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and complete information</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Subscription and Payments</h2>
          <p className="text-white/70"></p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Some features require a paid subscription</li>
            <li>Payments are processed securely through Stripe</li>
            <li>Subscriptions auto-renew unless canceled</li>
            <li>Refunds are provided at our discretion</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Prohibited Activities</h2>
          <p className="text-white/70">You may not:</p>
          <ul className="list-disc pl-6 space-y-2 text-white/70">
            <li>Use the service for illegal purposes</li>
            <li>Attempt to gain unauthorized access</li>
            <li>Interfere with other users\u0026apos; accounts</li>
            <li>Resell or redistribute our AI-generated content</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-white/70">
            THE SERVICE IS PROVIDED \u0026quot;AS IS\u0026quot; WITHOUT WARRANTIES OF ANY KIND. 
            We do not guarantee that the service will be uninterrupted, secure, or error-free. 
            AI-generated strategies are suggestions only and do not guarantee income.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
          <p className="text-white/70">
            WealthForge shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-white/70">
            We may modify these terms at any time. Continued use of the service 
            constitutes acceptance of the modified terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact</h2>
          <p className="text-white/70">
            Questions about these Terms? Contact us at:
            <a href="mailto:support@wealthforge.ai" className="text-orange-600">support@wealthforge.ai</a>
          </p>
        </div>
      </div>
    </div>
  );
}
