"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const services = [
  {
    num: "01",
    title: "Brand & Narrative Strategy",
    description: "positioning, messaging and identity",
    image: "/media/dev/service-1.jpg",
  },
  {
    num: "02",
    title: "Communications & Media (PR)",
    description: "press strategy and media relations",
    image: "/media/dev/service-2.jpg",
  },
  {
    num: "03",
    title: "Marketing & Growth Campaigns",
    description: "launches and digital campaigns",
    image: "/media/dev/service-3.jpg",
  },
  {
    num: "04",
    title: "Digital Presence & Technology",
    description: "websites and digital products",
    image: "/media/dev/service-4.jpg",
  },
  {
    num: "05",
    title: "Investor & Fundraise Communications",
    description: "pitch narratives and data storytelling",
    image: "/media/dev/service-5.jpg",
  },
  {
    num: "06",
    title: "Sales & Partnership Development",
    description: "B2B pipelines and corporate partnerships",
    image: "/media/dev/service-6.jpg",
  },
];

export function ServicesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
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
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 sm:py-32 bg-background overflow-hidden">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="services-heading"
            eyebrow="Our Services"
            title="Everything it takes to be seen — and backed."
          />
          <Reveal delay={0.2}>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Drag to explore</span>
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
              className="relative aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-xl bg-surface sm:w-[360px] md:w-[420px]"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-surface" />
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-texture-dots opacity-30" />
                
                {/* 
                  Since we don't have real images yet, we'll gracefully fall back.
                  If you have actual photos, they will render here.
                */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-80"
                  onError={(e) => {
                    // Hide broken image placeholder quietly
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {service.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-foreground/80">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
          {/* Spacer for end of scroll */}
          <div className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
