import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";

const MOCK_SLIDES = [
  {
    id: "macbook",
    title: "MacBook Pro",
    subtitle: "Mind-blowing. Head-turning.",
    imageSrc: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=2000",
    theme: "light" as const,
    ctaLabel: "Buy",
    ctaLink: "/store/mac",
  },
  {
    id: "iphone",
    title: "iPhone 15 Pro",
    subtitle: "Titanium. So strong. So light. So Pro.",
    imageSrc: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=2000",
    theme: "dark" as const,
    ctaLabel: "Learn more",
    ctaLink: "/store/iphone",
  },
  {
    id: "watch",
    title: "Apple Watch Series 9",
    subtitle: "Smarter. Brighter. Mightier.",
    imageSrc: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=2000",
    theme: "light" as const,
    ctaLabel: "Buy",
    ctaLink: "/store/watch",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Carousel slides={MOCK_SLIDES} />
    </main>
  );
}
