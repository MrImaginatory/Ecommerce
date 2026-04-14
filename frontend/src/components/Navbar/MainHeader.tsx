import { ShoppingBag, Heart, User } from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function MainHeader() {
  return (
    <div className={styles.mainHeader}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <svg
            viewBox="0 0 17 48"
            width="17"
            height="48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m15.035 25.044c-.015-3.321 2.716-4.918 2.844-4.991-1.543-2.257-3.943-2.565-4.8-2.597-2.046-.208-3.996 1.205-5.034 1.205s-2.651-1.189-4.364-1.157c-2.253.033-4.331 1.312-5.492 3.324-2.341 4.061-.599 10.063 1.678 13.344 1.116 1.605 2.451 3.402 4.186 3.339 1.669-.067 2.3-.1.082 4.316-.1.082 2.016 4.316.1.082 2.658 1.157 4.365 1.124 1.748-.033 4.148-1.312 5.305-3.321 1.288-1.884 1.821-3.712 1.854-3.804-.034-.015-3.621-1.39-3.654-5.465m-2.731-10.364c.921-1.116 1.542-2.668 1.373-4.218-1.332.054-2.946.887-3.901 2.003-.857.989-1.606 2.568-1.406 4.08 1.487.116 2.997-.733 3.934-1.865" />
          </svg>
        </Link>
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="User Account">
            <User size={18} />
          </button>
          <button className={styles.iconButton} aria-label="Favorites">
            <Heart size={18} />
          </button>
          <button className={styles.iconButton} aria-label="Shopping Bag">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
