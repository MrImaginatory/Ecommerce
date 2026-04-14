"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";
import Image from "next/image";

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  theme: "light" | "dark"; // Controls text accessibility
  ctaLabel?: string;
  ctaLink?: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
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

  return (
    <section className={styles.embla} dir="ltr">
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide) => (
            <div className={styles.embla__slide} key={slide.id}>
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
                    priority={slide.id === slides[0].id}
                  />
                  {/* Subtle overlay for text legibility */}
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.textContent}>
                  {/* Using typography classes defined in globals.css */}
                  <h1 className="display-hero">{slide.title}</h1>
                  <p className="body-text">{slide.subtitle}</p>
                  {slide.ctaLabel && slide.ctaLink && (
                    <a
                      href={slide.ctaLink}
                      style={{
                        backgroundColor: "var(--apple-blue)",
                        color: "var(--apple-white)",
                        padding: "var(--spacing-10) var(--spacing-20)",
                        borderRadius: "var(--radius-pill)",
                        fontWeight: 600,
                        marginTop: "var(--spacing-8)",
                        marginBottom: "var(--spacing-8)",
                      }}
                    >
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dotsWrapper}>
        {slides.map((_, index) => (
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
