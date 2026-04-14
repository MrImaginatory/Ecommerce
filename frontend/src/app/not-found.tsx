"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "../../public/animations/404 Error - Doodle animation.json";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.animationWrapper}>
        <Lottie 
          animationData={animationData} 
          loop={true} 
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h1 className={styles.title}>The page you’re looking for can’t be found.</h1>
      <p className={styles.description}>
        You may have mistyped the address or the page may have moved. 
        It looks like you've wandered into a quiet corner of the galaxy.
      </p>
      <Link href="/" className={styles.returnButton}>
        Return Home
      </Link>
    </main>
  );
}
