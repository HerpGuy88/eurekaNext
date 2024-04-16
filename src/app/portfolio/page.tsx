"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import {
  Container,
  Segment,
  ListList,
  ListItem,
  List,
} from "semantic-ui-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Container>
          <Segment inverted>
            <h1>Portfolio</h1>
          </Segment>
          <Segment inverted>
            <ul style={{}}>
              <li>
                <span style={{ fontSize: 24 }}>
                  <Link href="/portfolio/xr-demo">
                    Kruger Collection XR Demo
                  </Link>
                </span>
                <ul>
                  <li>A no-code platform for designing XR experiences.</li>
                </ul>
              </li>

              <li>
                <span style={{ fontSize: 24 }}>
                  <Link href="/portfolio/map-stories">
                    Map Stories: Barbuda
                  </Link>
                </span>
                <ul>
                  <li>
                    An interactive map of Barbuda that displays photogrammetric
                    models of marked sites.
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ fontSize: 24 }}>
                  <Link href="/portfolio/ar-barbuda">AR Demo: Barbuda</Link>
                </span>
                <ul>
                  <li>
                    A marker based AR demonstration of the Martello Tower
                    photogrammetric model. Requires a device with a camera.
                  </li>
                  <li>
                    <span>How to use:</span>

                    <ul>
                      <li>
                        Download one of these markers:
                        <ul>
                          <li>
                            <a
                              href="/portfolio/ar_marker.JPEG"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Marker only
                            </a>
                          </li>
                          <li>
                            <a
                              href="/portfolio/ar_marker_in_qr.png"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Marker in QR code linking to site
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>Navigate to the AR Demo: Barbuda webpage</li>
                      <li>
                        Hold the marker (either printed out or displayed on a
                        screen) up so that it is visible to the camera. A model
                        of the Mortello Tower should appear.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </Segment>
        </Container>
      </main>
    </>
  );
}
