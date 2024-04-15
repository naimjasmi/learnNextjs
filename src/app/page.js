import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Sidebar />
      </div>
    </main>
  );
}
