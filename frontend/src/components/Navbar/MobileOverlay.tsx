"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

interface NavLink {
  id: number;
  label: string;
  href: string;
  sublinks?: {
    label: string;
    href: string;
    subcategories?: {
      label: string;
      href: string;
      image?: string;
    }[];
  }[];
}

interface MobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
}

export default function MobileOverlay({ isOpen, onClose, activeTab }: MobileOverlayProps) {
  const [links, setLinks] = useState<NavLink[]>([]);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openSublink, setOpenSublink] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/nav-links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);

  const toggleCategory = (id: number) => {
    setOpenCategory(openCategory === id ? null : id);
    setOpenSublink(null); // Close sublinks when category changes
  };

  const toggleSublink = (label: string) => {
    setOpenSublink(openSublink === label ? null : label);
  };

  if (!isOpen && activeTab !== "search") return null;

  return (
    <AnimatePresence>
      {(isOpen || activeTab === "search") && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={styles.mobileOverlay}
        >
          <div className={styles.mobileOverlayHeader}>
            {activeTab === "search" ? (
              <div className={styles.mobileSearchContainer}>
                <SearchIcon size={20} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search asgardia.com" 
                  className={styles.mobileSearchInput}
                  autoFocus 
                />
                <button onClick={onClose} className={styles.closeOverlay}>
                  <X size={24} />
                </button>
              </div>
            ) : (
              <div className={styles.mobileMenuHeader}>
                <span className={styles.menuTitle}>Menu</span>
                <button onClick={onClose} className={styles.closeOverlay}>
                  <X size={24} />
                </button>
              </div>
            )}
          </div>

          <div className={styles.mobileOverlayContent}>
            {activeTab === "menu" && (
              <div className={styles.mobileAccordion}>
                {links.map((link) => (
                  <div key={link.id} className={styles.accordionGroup}>
                    <button 
                      className={`${styles.accordionTrigger} ${openCategory === link.id ? styles.activeTrigger : ""}`}
                      onClick={() => toggleCategory(link.id)}
                    >
                      {link.label}
                      <motion.div
                        animate={{ rotate: openCategory === link.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openCategory === link.id && link.sublinks && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={styles.accordionContent}
                        >
                          {link.sublinks.map((sublink) => (
                            <div key={sublink.label} className={styles.subAccordionGroup}>
                              <button 
                                className={`${styles.subAccordionTrigger} ${openSublink === sublink.label ? styles.activeSubTrigger : ""}`}
                                onClick={() => toggleSublink(sublink.label)}
                              >
                                {sublink.label}
                                <motion.div
                                  animate={{ rotate: openSublink === sublink.label ? 90 : 0 }}
                                >
                                  <ChevronRight size={16} />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {openSublink === sublink.label && sublink.subcategories && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={styles.subAccordionContent}
                                  >
                                    <div className={styles.mobileSubcategoryGrid}>
                                      {sublink.subcategories.map((item) => (
                                        <Link 
                                          key={item.label}
                                          href={item.href}
                                          className={styles.mobileSubcategoryCard}
                                          onClick={onClose}
                                        >
                                          {item.image && (
                                            <div className={styles.mobileImageWrapper}>
                                              <Image 
                                                src={item.image} 
                                                alt={item.label} 
                                                width={100} 
                                                height={56} 
                                                className={styles.mobileSubImage}
                                              />
                                            </div>
                                          )}
                                          <span className={styles.mobileItemLabel}>{item.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
            
            {(activeTab === "account" || activeTab === "wishlist" || activeTab === "cart") && (
              <div className={styles.pagePlaceholder}>
                <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <p>This feature is coming soon to the mobile experience.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
