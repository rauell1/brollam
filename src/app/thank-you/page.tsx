import Link from 'next/link';

export const metadata = {
  title: 'Thank You',
  description: 'Thank you for your submission.',
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="space-y-6 max-w-lg mx-auto bg-card p-10 rounded-2xl shadow-sm border border-border">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
          Thank You!
        </h1>
        
        <p className="text-base text-muted-foreground">
          We appreciate you taking the time to share your feedback. Your input helps us improve and serve you better.
        </p>
        
        <div className="pt-6 border-t border-border mt-6">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-8 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong w-full sm:w-auto"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
