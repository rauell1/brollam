"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { ServiceVisual } from "./service-visual";

const services = [
  {
    num: "01",
    title: "Brand & Narrative Strategy",
    description: "positioning, messaging and identity",
    slug: "brand-and-narrative-strategy",
  },
  {
    num: "02",
    title: "Communications & Media (PR)",
    description: "press strategy and media relations",
    slug: "communications-and-media-pr",
  },
  {
    num: "03",
    title: "Marketing & Growth Campaigns",
    description: "launches and digital campaigns",
    slug: "marketing-and-growth-campaigns",
  },
  {
    num: "04",
    title: "Digital Presence & Technology",
    description: "websites and digital products",
    slug: "digital-presence-and-technology",
  },
  {
    num: "05",
    title: "Investor & Fundraise Communications",
    description: "pitch narratives and data storytelling",
    slug: "investor-and-fundraise-communications",
  },
  {
    num: "06",
    title: "Sales & Partnership Development",
    description: "B2B pipelines and corporate partnerships",
    slug: "sales-and-partnership-development",
  },
];

export function ServicesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const draggedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    draggedRef.current = false;
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    // Past a few pixels this is a drag, not a click. Remember that so the
    // pointer-up doesn't navigate the card the cursor happens to be over.
    if (Math.abs(walk) > 6) draggedRef.current = true;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const suppressClickAfterDrag = (e: React.MouseEvent) => {
    if (draggedRef.current) e.preventDefault();
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 sm:py-32 bg-background overflow-hidden">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="services-heading"
            eyebrow="Our Services"
            title="Everything it takes to be seen, and backed."
          />
          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="hidden md:inline">Drag to explore</span>
              <span className="md:hidden">Swipe to explore</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-16 w-full pl-5 sm:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <div
          ref={carouselRef}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pr-5 sm:gap-6 sm:pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {services.map((service, i) => (
            <Reveal
              key={service.num}
              delay={0.1 * i}
              className="w-[280px] shrink-0 snap-start sm:w-[360px] md:w-[420px]"
            >
              <Link
                href={`/services/${service.slug}`}
                onClick={suppressClickAfterDrag}
                className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl border border-white/5 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-accent/40 sm:p-8"
              >
                <ServiceVisual index={i} />

                <div className="relative flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-xs text-accent-foreground">
                    {service.num}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>

                <div className="relative">
                  <h3 className="font-display text-xl text-white sm:text-2xl">{service.title}</h3>
                  <p className="mt-3 font-mono text-[0.68rem] tracking-[0.12em] text-white/55 uppercase">
                    {service.description}
                  </p>
                  {/* Underline wipes in on hover to signal the card is a link */}
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
          {/* Spacer for end of scroll */}
          <div className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
