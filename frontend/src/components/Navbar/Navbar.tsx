"use client";

import OfferBanner from "./OfferBanner";
import MainHeader from "./MainHeader";
import GlobalNav from "./GlobalNav";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <OfferBanner />
      <MainHeader />
      <GlobalNav />
    </div>
  );
}
