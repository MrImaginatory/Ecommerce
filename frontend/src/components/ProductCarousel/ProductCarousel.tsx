"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ProductCarousel.module.css";
import ProductCard, { Product } from "../ProductCard/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  // Requirement: Maximum 15 products
  const displayedProducts = products.slice(0, 15);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1, // Requirement: One product should slide
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            className={styles.arrowButton}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={styles.arrowButton}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {displayedProducts.map((product) => (
            <div className={styles.embla__slide} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
          
          {/* Requirement: View All button at the end */}
          <div className={styles.viewAllSlide}>
            <div className={styles.viewAllContent}>
              <h3 className="tile-heading">Want to see more?</h3>
              <Link href="/trending" className={styles.viewAllButton}>
                View all Trending products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
