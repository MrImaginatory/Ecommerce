"use client";

import { useState, useEffect } from "react";
import OfferBanner from "./OfferBanner";
import MainHeader from "./MainHeader";
import GlobalNav from "./GlobalNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileOverlay from "./MobileOverlay";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const handleCloseOverlay = () => {
    setIsMobileMenuOpen(false);
    setActiveTab("");
  };

  // Auto-close mobile menu when resizing back to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        handleCloseOverlay();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.desktopOnly}>
        <OfferBanner />
      </div>
      <MainHeader />
      <div className={styles.desktopOnly}>
        <GlobalNav />
      </div>

      {/* Mobile Components */}
      <MobileBottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <MobileOverlay 
        isOpen={isMobileMenuOpen} 
        onClose={handleCloseOverlay}
        activeTab={activeTab}
      />
    </div>
  );
}
