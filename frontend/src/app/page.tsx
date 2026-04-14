import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";

import carouselData from "@/data/carousel.json";
import brandsData from "@/data/brands.json";
import trendingData from "@/data/trending.json";
import { SlideData } from "@/components/Carousel/Carousel";
import BrandCarousel from "@/components/BrandCarousel/BrandCarousel";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import apiConfig from "@/data/api-config.json";

export default function Home() {
  return (
    <main className={styles.main}>
      <Carousel endpoint={apiConfig.heroCarouselEndpoint} />
      <BrandCarousel brands={brandsData} />
      <ProductCarousel
        title="Trending Products"
        subtitle="Greatness in the making."
        viewAllLink="/trending"
        endpoint={apiConfig.trendingEndpoint}
      />
      <ProductCarousel
        title="Hit Collections"
        subtitle="Your daily essentials, redefined."
        viewAllLink="/HitCollections"
        endpoint={apiConfig.hitCollectionsEndpoint}
      />
    </main>
  );
}
