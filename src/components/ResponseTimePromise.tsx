export function ResponseTimePromise() {
  return (
    <div className="rounded-lg bg-accent/5 p-4 border border-accent/20 flex items-start gap-4">
      <div className="flex-shrink-0 mt-0.5">
        <svg 
          className="w-5 h-5 text-accent" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">Our Promise</h4>
        <p className="text-sm text-muted-foreground mt-1">
          We know your time is valuable. Our team guarantees a personalized response to all inquiries within <strong>24 business hours</strong>.
        </p>
      </div>
    </div>
  );
}
