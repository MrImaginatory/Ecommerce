"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import HeroCarouselSkeleton from "./HeroCarouselSkeleton";

export interface SlideData {
  id: string;
  title: string;
  showTitle: boolean;
  imageSrc: string;
  ctaLink: string;
  theme: "light" | "dark";
}

interface CarouselProps {
  slides?: SlideData[];
  endpoint?: string;
}

export default function Carousel({ slides = [], endpoint }: CarouselProps) {
  const { data: apiSlides, isLoading } = useQuery<SlideData[]>({
    queryKey: ["hero-carousel", endpoint],
    queryFn: async () => {
      if (!endpoint) return [];
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const fullUrl = endpoint.startsWith("http") 
        ? endpoint 
        : `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      
      console.log(`[Carousel] Fetching from: ${fullUrl}`);
      
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Failed to fetch carousel data");
      
      const rawData = await res.json();
      
      // Sanitization Layer: Handle string-booleans and data anomalies
      return rawData.map((item: any) => ({
        ...item,
        showTitle: typeof item.showTitle === "string" 
          ? item.showTitle === "true" 
          : !!item.showTitle,
        // Decode HTML entities in imageSrc if present
        imageSrc: item.imageSrc?.replace(/&amp;/g, "&").replace(/&#x3D;/g, "=") || ""
      })) as SlideData[];
    },
    enabled: !!endpoint,
  });

  const finalSlides = (endpoint ? apiSlides : slides) || [];
  // Enforce maximum 10 items rule
  const displayedSlides = finalSlides.slice(0, 10);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) return <HeroCarouselSkeleton />;
  if (displayedSlides.length === 0) return null;

  return (
    <section className={styles.embla} dir="ltr">
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {displayedSlides.map((slide) => (
            <div className={styles.embla__slide} key={slide.id}>
              {slide.ctaLink ? (
                <Link
                  href={slide.ctaLink}
                  className={`${styles.slideContent} ${
                    slide.theme === "dark" ? "section-dark" : "section-light"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      priority={slide.id === displayedSlides[0].id}
                    />
                    <div className={styles.imageOverlay} />
                  </div>

                  <div className={styles.textContent}>
                    {slide.showTitle && (
                      <h1 className="display-hero">{slide.title}</h1>
                    )}
                  </div>
                </Link>
              ) : (
                <div
                  className={`${styles.slideContent} ${
                    slide.theme === "dark" ? "section-dark" : "section-light"
                  }`}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      priority={slide.id === displayedSlides[0].id}
                    />
                    <div className={styles.imageOverlay} />
                  </div>

                  <div className={styles.textContent}>
                    {slide.showTitle && (
                      <h1 className="display-hero">{slide.title}</h1>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.arrowButton} ${styles.arrowButtonPrev}`}
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className={`${styles.arrowButton} ${styles.arrowButtonNext}`}
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className={styles.dotsWrapper}>
        {displayedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`${styles.dot} ${
              index === selectedIndex ? styles.dotActive : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
