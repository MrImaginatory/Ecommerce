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
        lazy={false}
      />
      <ProductCarousel
        title="Hit Collections"
        subtitle="Your daily essentials, redefined."
        viewAllLink="/HitCollections"
        endpoint={apiConfig.hitCollectionsEndpoint}
        lazy={false}
      />
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just dropped. Fresh picks you won't want to miss."
        viewAllLink="/new-arrivals"
        endpoint={apiConfig.newArrivalsEndpoint}
      />
      <ProductCarousel
        title="Sarees"
        subtitle=""
        viewAllLink="/sarees"
        endpoint={apiConfig.sareesEndpoint}
      />
      <ProductCarousel
        title="Silk Sarees"
        subtitle=""
        viewAllLink="/silk-sarees"
        endpoint={apiConfig.silkSareesEndpoint}
      />
      <ProductCarousel
        title="Dress"
        subtitle=""
        viewAllLink="/dress"
        endpoint={apiConfig.dressEndpoint}
      />
      <ProductCarousel
        title="Kurtis"
        subtitle=""
        viewAllLink="/kurtis"
        endpoint={apiConfig.kurtisEndpoint}
      />
      <ProductCarousel
        title="Jwellery"
        subtitle=""
        viewAllLink="/jwellery"
        endpoint={apiConfig.jwelleryEndpoint}
      />
      <ProductCarousel
        title="Lehengas"
        subtitle=""
        viewAllLink="/lehengas"
        endpoint={apiConfig.lehengasEndpoint}
      />
      <ProductCarousel
        title="Islamic Wear"
        subtitle=""
        viewAllLink="/islamic-wear"
        endpoint={apiConfig.islamicWearEndpoint}
      />
      <ProductCarousel
        title="Suits and Dresses"
        subtitle=""
        viewAllLink="/suits-and-dresses"
        endpoint={apiConfig.suitsandDressesEndpoint}
      />
      <ProductCarousel
        title="Gowns"
        subtitle=""
        viewAllLink="/gowns"
        endpoint={apiConfig.gownsEndpoint}
      />
      <ProductCarousel
        title="Readymade Blouse"
        subtitle=""
        viewAllLink="/readymade-blouse"
        endpoint={apiConfig.readymadeBlouseEndpoint}
      />
      <ProductCarousel
        title="Kidswear"
        subtitle=""
        viewAllLink="/kidswear"
        endpoint={apiConfig.kidswearEndpoint}
      />
    </main>
  );
}
