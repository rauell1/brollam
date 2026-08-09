import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MotionProvider } from "@/components/site/motion";
import { listServices } from "@/lib/data/public";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const services = await listServices();

  return (
    <MotionProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Header />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer services={services} />
    </MotionProvider>
  );
}
