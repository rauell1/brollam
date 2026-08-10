export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data collection practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you use our application. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and any other information you choose to provide via forms.</li>
            <li><strong>Usage Analytics:</strong> Information about how you use our website, pages viewed, and device information to help us improve user experience.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>
            The information we collect is used in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, maintain, and improve our services.</li>
            <li>To respond to your comments, questions, and requests.</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our application.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">4. Contact Us</h2>
          <p>
            If there are any questions regarding this privacy policy, you may contact us using the contact information on our website.
          </p>
        </section>
      </div>
    </main>
  );
}
