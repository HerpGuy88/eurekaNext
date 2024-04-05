"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { Segment } from "semantic-ui-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Segment inverted>
          <ul>
            <li>
              <Link href="/portfolio/xr-demo">XR Demo</Link>
            </li>
            <li>
              <Link href="/portfolio/map-stories">Map Stories: Barbuda</Link>
            </li>
            <li>
              <Link href="/portfolio/ar-barbuda">AR Demo: Barbuda</Link>
            </li>
          </ul>
        </Segment>
      </main>
    </>
  );
}
