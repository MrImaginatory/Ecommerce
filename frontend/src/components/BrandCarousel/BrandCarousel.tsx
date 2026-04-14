"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import styles from "./BrandCarousel.module.css";
import Link from "next/link";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface BrandCarouselProps {
  brands: Brand[];
  showRow1?: boolean;
  showRow2?: boolean;
}

export default function BrandCarousel({
  brands,
  showRow1 = true,
  showRow2 = true,
}: BrandCarouselProps) {
  // Row 1: Forward
  const [emblaRef1] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ direction: "forward", stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  // Row 2: Backward
  const [emblaRef2] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ direction: "backward", stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  // Duplicate brands to ensure enough items for infinite loop if list is small
  const brandList = [...brands, ...brands];

  if (!showRow1 && !showRow2) return null;

  return (
    <section className={styles.brandSection}>
      <h2 className={styles.title}>Our Brands</h2>

      {showRow1 && (
        <div className={styles.embla} ref={emblaRef1}>
          <div className={styles.embla__container}>
            {brandList.map((brand, index) => (
              <div className={styles.embla__slide} key={`${brand.id}-row1-${index}`}>
                <Link href={`/brand/${brand.name.toLowerCase()}`} className={styles.brandLink}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={styles.brandLogo}
                    loading="lazy"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {showRow2 && (
        <div className={styles.embla} ref={emblaRef2}>
          <div className={styles.embla__container}>
            {brandList.map((brand, index) => (
              <div className={styles.embla__slide} key={`${brand.id}-row2-${index}`}>
                <Link href={`/brand/${brand.name.toLowerCase()}`} className={styles.brandLink}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={styles.brandLogo}
                    loading="lazy"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
