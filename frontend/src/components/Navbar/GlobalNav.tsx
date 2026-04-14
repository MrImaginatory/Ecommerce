"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubLink {
  label: string;
  href: string;
}

interface NavLink {
  id: number;
  label: string;
  href: string;
  sublinks?: SubLink[];
}

export default function GlobalNav() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const { data: links, isLoading, isError } = useQuery<NavLink[]>({
    queryKey: ["nav-links"],
    queryFn: async () => {
      const response = await fetch("/data/nav-links.json");
      if (!response.ok) {
        throw new Error("Failed to fetch navigation links");
      }
      return response.json();
    },
  });

  if (isLoading) return <div className={styles.globalNav}><div className={styles.loading}>Loading...</div></div>;
  if (isError) return <div className={styles.globalNav}><div className={styles.error}>Error loading navigation</div></div>;

  const activeLink = links?.find(l => l.id === activeId);
  const hasSublinks = activeLink && activeLink.sublinks && activeLink.sublinks.length > 0;

  const handleMouseEnter = (link: NavLink) => {
    if (isLocked) return;
    if (link.sublinks) {
      setActiveId(link.id);
    } else {
      setActiveId(null);
    }
  };

  const handleMouseLeave = () => {
    if (isLocked) return;
    setActiveId(null);
  };

  const handleLinkClick = (id: number) => {
    setActiveId(id);
    setIsLocked(true);
  };

  const handleReset = () => {
    setActiveId(null);
    setIsLocked(false);
  };

  return (
    <nav 
      className={styles.globalNav} 
      onMouseLeave={handleMouseLeave}
    >
      <ul className={styles.navLinks}>
        {links?.map((link) => (
          <li 
            key={link.id} 
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter(link)}
            onClick={() => link.sublinks && handleLinkClick(link.id)}
          >
            <Link 
              href={link.href} 
              className={`${styles.navLink} ${activeId === link.id ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeId && hasSublinks && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.overlay}
              onClick={handleReset}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={styles.dropdown}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownColumn}>
                  <span className={styles.columnTitle}>Shop</span>
                  {activeLink.sublinks!.map((sub, idx) => (
                    <Link key={idx} href={sub.href} className={styles.subLink} onClick={handleReset}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
                {/* ... other columns */}
                <div className={styles.dropdownColumn}>
                  <span className={styles.columnTitle}>Quick Links</span>
                  <Link href="#" className={styles.secondaryLink}>Find a Store</Link>
                  <Link href="#" className={styles.secondaryLink}>Order Status</Link>
                  <Link href="#" className={styles.secondaryLink}>Apple Trade In</Link>
                  <Link href="#" className={styles.secondaryLink}>Financing</Link>
                </div>

                <div className={styles.dropdownColumn}>
                  <span className={styles.columnTitle}>Shop Special Stores</span>
                  <Link href="#" className={styles.secondaryLink}>Certified Refurbished</Link>
                  <Link href="#" className={styles.secondaryLink}>Education</Link>
                  <Link href="#" className={styles.secondaryLink}>Business</Link>
                  <Link href="#" className={styles.secondaryLink}>Veterans and Military</Link>
                  <Link href="#" className={styles.secondaryLink}>Government</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
