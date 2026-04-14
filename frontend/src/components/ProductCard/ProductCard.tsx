"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import likeAnimation from "../../../public/animations/like.json";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  link: string;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasSale = product.salePrice && product.salePrice < product.price;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (lottieRef.current) {
      if (isLiked) {
        lottieRef.current.setDirection(-1);
      } else {
        lottieRef.current.setDirection(1);
      }
      lottieRef.current.play();
    }
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation placeholder for cart logic
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Link href={product.link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
        />
        
        {/* Lottie Heart Animation */}
        <button className={styles.likeButton} onClick={handleLike} aria-label="Like product">
          <Lottie
            lottieRef={lottieRef}
            animationData={likeAnimation}
            loop={false}
            autoplay={false}
            style={{ width: 44, height: 44 }}
          />
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
          <div className={styles.priceWrapper}>
            <span className={styles.currentPrice}>
              ${hasSale ? product.salePrice : product.price}
            </span>
            {hasSale && (
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            )}
          </div>

          <button 
            className={styles.cartButton} 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
