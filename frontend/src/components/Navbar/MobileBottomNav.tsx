"use client";

import React from "react";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import styles from "./Navbar.module.css";

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MobileBottomNav({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}: MobileBottomNavProps) {
  
  const tabs = [
    { id: "menu", label: "Menu", icon: Menu },
    { id: "search", label: "Search", icon: Search },
    { id: "account", label: "Account", icon: User },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "cart", label: "Cart", icon: ShoppingBag },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === "menu") {
      setIsOpen(!isOpen);
      setActiveTab(isOpen ? "" : "menu");
    } else {
      setActiveTab(tabId);
      setIsOpen(false);
    }
  };

  return (
    <nav className={styles.mobileBottomNav}>
      <div className={styles.mobileNavContent}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.id === "menu" && isOpen);
          
          return (
            <button
              key={tab.id}
              className={`${styles.mobileTab} ${isActive ? styles.activeTab : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
