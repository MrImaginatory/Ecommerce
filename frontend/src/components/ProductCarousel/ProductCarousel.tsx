"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ProductCarousel.module.css";
import ProductCard, { Product } from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "@/hooks/useInView";

interface ProductCarouselProps {
  products?: Product[];
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  endpoint?: string;
  lazy?: boolean;
}

export default function ProductCarousel({ 
  products = [], 
  title, 
  subtitle, 
  viewAllLink = "#",
  endpoint,
  lazy = true
}: ProductCarouselProps) {
  const [sectionRef, isInView] = useInView({
    rootMargin: "600px", // Increased margin for smoother entry
    triggerOnce: true
  });

  const { data: apiProducts, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", endpoint],
    queryFn: async () => {
      if (!endpoint) return [];
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const fullUrl = endpoint.startsWith("http") 
        ? endpoint 
        : `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      
      console.log(`[API] Triggered load for: ${title}`);
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    enabled: !!endpoint && (lazy ? isInView : true),
  });

  const finalProducts = (endpoint ? apiProducts : products) || [];
  const displayedProducts = finalProducts.slice(0, 15);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
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

  // If there's an error and no static fallback, we might want to hide the carousel
  if (error && products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {!isLoading && displayedProducts.length > 0 && (
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
        )}
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {isLoading ? (
            // Show 4 skeletons while loading
            Array.from({ length: 4 }).map((_, i) => (
              <div className={styles.embla__slide} key={`skeleton-${i}`}>
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            <>
              {displayedProducts.map((product) => (
                <div className={styles.embla__slide} key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
              
              {displayedProducts.length > 0 && (
                <div className={styles.viewAllSlide}>
                  <div className={styles.viewAllContent}>
                    <h3 className="tile-heading">Want to see more?</h3>
                    <Link href={viewAllLink} className={styles.viewAllButton}>
                      View all {title}
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
