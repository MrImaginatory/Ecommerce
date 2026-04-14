"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

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
  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <Link href={product.link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
        />
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
          <span className={styles.currentPrice}>
            ${hasSale ? product.salePrice : product.price}
          </span>
          {hasSale && (
            <span className={styles.oldPrice}>
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
