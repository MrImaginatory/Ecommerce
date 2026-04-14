import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";

import carouselData from "@/data/carousel.json";
import brandsData from "@/data/brands.json";
import trendingData from "@/data/trending.json";
import { SlideData } from "@/components/Carousel/Carousel";
import BrandCarousel from "@/components/BrandCarousel/BrandCarousel";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import hitCollectionsData from "@/data/hit-collections.json";

// Verify data shape matches SlideData interface
const typedSlides: SlideData[] = carouselData as SlideData[];

export default function Home() {
  return (
    <main className={styles.main}>
      <Carousel slides={typedSlides} />
      <BrandCarousel brands={brandsData} />
      <ProductCarousel
        title="Trending Products"
        subtitle="Greatness in the making."
        viewAllLink="/trending"
        endpoint="/TendingProducts"
      />
      <ProductCarousel
        products={hitCollectionsData}
        title="Hit Collections"
        subtitle="Your daily essentials, redefined."
        viewAllLink="/collections"
      />
    </main>
  );
}
