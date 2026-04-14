"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./Navbar.module.css";
import Link from "next/link";

interface NavLink {
  id: number;
  label: string;
  href: string;
}

export default function GlobalNav() {
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
          <li key={link.id}>
            <Link href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
