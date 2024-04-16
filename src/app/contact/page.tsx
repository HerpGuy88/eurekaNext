"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { Segment } from "semantic-ui-react";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Segment inverted>
          <h1>This page is under construction. Check back later!!!</h1>
        </Segment>
        <div className={styles.center}></div>

        <div className={styles.grid}></div>
      </main>
    </>
  );
}
