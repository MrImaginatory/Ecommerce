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
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  return (
    <nav className={styles.globalNav}>
      <ul className={styles.navLinks}>
        {links?.map((link) => (
          <li 
            key={link.id} 
            className={styles.navItem}
            onMouseEnter={() => setHoveredId(link.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={link.href} className={styles.navLink}>
              {link.label}
            </Link>

            <AnimatePresence>
              {link.sublinks && (hoveredId === link.id) && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={styles.dropdown}
                >
                  <div className={styles.dropdownContent}>
                    <div className={styles.column}>
                      {link.sublinks.map((sub, idx) => (
                        <Link key={idx} href={sub.href} className={styles.subLink}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
}
