"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { Heart, ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  link: string;
  tags?: string[];
  stockQty?: number;
  maxOrderQty?: number;
}

interface ProductCardProps {
  product: Product;
}

const cartMessages = [
  "Added to your collection!",
  "Excellent choice! That's hand-picked for you.",
  "Hand-picked and ready to ship!",
  "A premium choice for a premium user.",
  "Your cart just got a major upgrade!"
];

const wishlistMessages = [
  "Saved! Your taste is absolutely impeccable.",
  "Added to your wishlist. A goal worth chasing!",
  "Great eye! We'll keep this ready for you.",
  "Dream big! This is now on your list.",
  "Impeccable choice! Wishlist updated."
];

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSelectingQty, setIsSelectingQty] = useState(false);
  const [localQty, setLocalQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const hasSale = product.salePrice && product.salePrice < product.price;

  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      toast.success(getRandomMessage(wishlistMessages), {
        icon: <Heart size={18} color="#ff3b30" fill="#ff3b30" />,
      });
    }
  };

  const handleStartSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelectingQty(true);
  };

  const handleAdjustQty = (e: React.MouseEvent, amount: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const maxAllowed = Math.min(product.stockQty ?? 999, product.maxOrderQty ?? 999);
    const newQty = Math.max(1, Math.min(maxAllowed, localQty + amount));
    setLocalQty(newQty);
  };

  const handleConfirmAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, localQty);
    
    // Show success state
    setIsAdded(true);
    setIsSelectingQty(false);
    
    // Show delightful toast
    toast.success(getRandomMessage(cartMessages), {
      icon: <ShoppingCart size={18} color="#0071e3" />,
    });

    // Reset after some time
    setTimeout(() => {
      setIsAdded(false);
      setLocalQty(1);
    }, 2000);
  };

  return (
    <Link href={product.link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={styles.image}
        />
        
        <button 
          className={`${styles.iconButton} ${styles.heartButton} ${isLiked ? styles.heartActive : ""}`}
          onClick={handleLike}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.div
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%",
              height: "100%" 
            }}
            animate={{ 
              scale: isLiked ? [1, 1.2, 1] : 1,
              color: isLiked ? "#ff3b30" : "rgba(0,0,0,0.8)"
            }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Heart 
              size={20} 
              fill={isLiked ? "currentColor" : "transparent"} 
              strokeWidth={2}
            />
          </motion.div>
        </button>

        {product.tags && product.tags.length > 0 && (
          <div className={styles.tagContainer}>
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={`${styles.tag} ${
                  tag.toLowerCase() === "trending" ? styles.tagTrending : styles.tagDefault
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.priceContainer}>
          <AnimatePresence mode="wait">
            {!isSelectingQty ? (
              <motion.div 
                key="price"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={styles.priceInfo}
              >
                <span className={styles.currentPrice}>
                  ${hasSale ? product.salePrice : product.price}
                </span>
                {hasSale && (
                  <span className={styles.oldPrice}>
                    ${product.price}
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="stepper"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={styles.stepperContainer}
              >
                <button 
                  className={styles.stepBtn} 
                  onClick={(e) => handleAdjustQty(e, -1)}
                  disabled={localQty <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyDisplay}>{localQty}</span>
                <button 
                  className={styles.stepBtn} 
                  onClick={(e) => handleAdjustQty(e, 1)}
                  disabled={localQty >= Math.min(product.stockQty ?? 999, product.maxOrderQty ?? 999)}
                >
                  <Plus size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isSelectingQty ? (
              <motion.button 
                key="cart-init"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`${styles.iconButton} ${styles.cartButton} ${isAdded ? styles.added : ""}`}
                onClick={handleStartSelection}
                aria-label="Select quantity"
              >
                <motion.div
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                  whileTap={{ scale: 0.8 }}
                >
                  {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
                </motion.div>
              </motion.button>
            ) : (
              <motion.button 
                key="cart-confirm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={styles.confirmAddBtn}
                onClick={handleConfirmAdd}
              >
                Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}
