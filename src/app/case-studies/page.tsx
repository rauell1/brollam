export const metadata = {
  title: 'Case Studies',
  description: 'Explore our recent case studies and success stories.',
};

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl">
          Client Success Stories
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how we've helped our clients overcome challenges and achieve their goals through our innovative solutions.
        </p>
      </div>

      {/* Case Study Template */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-foreground mb-4">Client Background</h3>
            <p className="text-sm text-muted-foreground">
              [Company Name] is a leading provider in the [Industry] sector. They approached us to help streamline their digital presence and improve user engagement.
            </p>
          </div>
          
          <div className="bg-accent/10 border border-accent/20 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-accent mb-4">Key Results</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent font-bold">1</span>
                <span className="text-sm font-medium text-foreground">45% increase in conversion</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent font-bold">2</span>
                <span className="text-sm font-medium text-foreground">2x faster page load times</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <section>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">The Challenge</h2>
            <div className="prose prose-zinc dark:prose-invert text-muted-foreground">
              <p>
                The client was struggling with an outdated digital infrastructure that was slowing down their growth. Their legacy systems made it difficult to scale and provide a seamless experience for their rapidly growing user base.
              </p>
              <p>
                Key pain points included high bounce rates on mobile devices, difficult content management workflows, and poor technical SEO performance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Our Solution</h2>
            <div className="prose prose-zinc dark:prose-invert text-muted-foreground">
              <p>
                We implemented a comprehensive modernization strategy, migrating their application to a Next.js App Router architecture. 
              </p>
              <p>
                By building a bespoke design system using Tailwind CSS and integrating a headless CMS, we empowered their marketing team to deploy content rapidly without developer intervention.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">The Results</h2>
            <div className="prose prose-zinc dark:prose-invert text-muted-foreground">
              <p>
                Within three months of launch, the new platform delivered exceptional results across all key performance indicators. The modern architecture not only solved immediate technical debt but provided a scalable foundation for the next decade of their growth.
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
