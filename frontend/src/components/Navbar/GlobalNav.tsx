import { useQuery } from "@tanstack/react-query";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubCategory {
  label: string;
  href: string;
  image: string;
}

interface SubLink {
  label: string;
  href: string;
  subcategories?: SubCategory[];
}

interface NavLink {
  id: number;
  label: string;
  href: string;
  sublinks?: SubLink[];
}

export default function GlobalNav() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredSublink, setHoveredSublink] = useState<SubLink | null>(null);
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

  const activeLink = links?.find(l => l.id === activeId);

  // Set default hovered sublink when activeLink changes
  useEffect(() => {
    if (activeLink?.sublinks?.[0]) {
      setHoveredSublink(activeLink.sublinks[0]);
    } else {
      setHoveredSublink(null);
    }
  }, [activeId, activeLink]);

  if (isLoading) return <div className={styles.globalNav}><div className={styles.loading}>Loading...</div></div>;
  if (isError) return <div className={styles.globalNav}><div className={styles.error}>Error loading navigation</div></div>;

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
            onClick={() => link.sublinks && setIsLocked(true)}
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
                <div className={styles.dropdownColumn} style={{ flex: "0 0 250px" }}>
                  <span className={styles.columnTitle}>Shop</span>
                  {activeLink.sublinks!.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      href={sub.href} 
                      className={`${styles.subLink} ${hoveredSublink?.label === sub.label ? styles.activeSub : ""}`}
                      onMouseEnter={() => setHoveredSublink(sub)}
                      onClick={handleReset}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>

                <div className={styles.dropdownColumn} style={{ flex: 1 }}>
                  <span className={styles.columnTitle}>
                    {hoveredSublink ? `Shop ${hoveredSublink.label}` : "Select a Category"}
                  </span>
                  
                  {hoveredSublink?.subcategories && hoveredSublink.subcategories.length > 0 ? (
                    <div className={styles.subcategoryGrid}>
                      {hoveredSublink.subcategories.map((subcat, idx) => (
                        <Link 
                          key={idx} 
                          href={`${hoveredSublink.href}/${subcat.href}`}
                          className={styles.subcategoryCard}
                          onClick={handleReset}
                        >
                          <div className={styles.imageWrapper}>
                            <Image 
                              src={subcat.image} 
                              alt={subcat.label} 
                              width={240} 
                              height={135} 
                              className={styles.subcategoryImage}
                            />
                          </div>
                          <span className={styles.subcategoryLabel}>{subcat.label}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.noSubcategories}>
                      No subcategories available
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
