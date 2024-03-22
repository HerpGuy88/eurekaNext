"use client";

import styles from "@/app/page.module.css";
import dynamic from "next/dynamic";
// import ARDemo from "@assets/components/ARDemo";
const ARDemo = dynamic(() => import("@assets/components/ARDemo"), {
  ssr: false,
});

export default function page() {
  return (
    <>
      <main className={styles.main}>
        <ARDemo />
      </main>
    </>
  );
}
