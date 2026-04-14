import React from "react";
import styles from "./HeroCarouselSkeleton.module.css";

export default function HeroCarouselSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmer} />
      <div className={styles.content}>
        <div className={styles.titlePlaceholder}>
          <div className={styles.shimmer} />
        </div>
        <div className={styles.ctaPlaceholder}>
          <div className={styles.shimmer} />
        </div>
      </div>
    </div>
  );
}
