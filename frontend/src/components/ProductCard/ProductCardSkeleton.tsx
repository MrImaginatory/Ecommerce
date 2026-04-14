import React from "react";
import styles from "./ProductCardSkeleton.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleLine}>
           <div className={styles.shimmer} />
        </div>
        <div className={styles.titleLineShort}>
           <div className={styles.shimmer} />
        </div>
        <div className={styles.price}>
           <div className={styles.shimmer} />
        </div>
      </div>
    </div>
  );
}
