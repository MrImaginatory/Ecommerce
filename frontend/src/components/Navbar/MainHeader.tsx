"use client";

import { ShoppingBag, Heart, User, Sun, Moon } from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { useQuery } from "@tanstack/react-query";

interface SiteConfig {
  siteLogo: string;
  siteName: string;
  altText?: string;
  showName?: boolean;
  favicon?: string;
}

export default function MainHeader() {
  const { theme, toggleTheme } = useTheme();

  const { data: config } = useQuery<SiteConfig>({
    queryKey: ["site-config"],
    queryFn: async () => {
      const response = await fetch("/data/site-config.json");
      if (!response.ok) throw new Error("Failed to fetch config");
      return response.json();
    },
  });

  const renderLogo = () => {
    return (
      <div className={styles.logoContainer}>
        {config?.siteLogo ? (
          <Image
            src={config.siteLogo}
            alt={config.altText || config.siteName}
            width={150}
            height={32}
            className={styles.logoImage}
            priority
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" attributeName="cy" begin="0;spinner_OcgL.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="12" cy="12" r="3"><animate attributeName="cy" begin="spinner_qFRN.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" attributeName="cy" begin="spinner_qFRN.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle></svg>
        )}
        {config?.showName && config?.siteName && (
          <span className={styles.siteName}>{config.siteName}</span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.mainHeader}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo} aria-label={config?.siteName || "Home"}>
          {renderLogo()}
        </Link>
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>
          <button className={styles.iconButton} aria-label="User Account">
            <User size={18} strokeWidth={1.5} />
          </button>
          <button className={styles.iconButton} aria-label="Favorites">
            <Heart size={18} strokeWidth={1.5} />
          </button>
          <button className={styles.iconButton} aria-label="Shopping Bag">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
