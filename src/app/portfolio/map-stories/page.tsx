"use client";

import styles from "@/app/page.module.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
// import ARDemo from "@assets/components/ARDemo";
import { MapStoryProps } from "@assets/components/types";
const MapStory = dynamic(() => import("@assets/components/MapStory"), {
  ssr: false,
  loading: () => (
    <main className={styles.main}>
      <h1>Loading...</h1>
    </main>
  ),
});

const props: MapStoryProps = {
  title: "The Visual Heritage Environment of Barbuda",
  latitude: 17.637151,
  longitude: -61.809254,
  zoom: 7.5,
  mapItems: [
    {
      latitude: 17.59505069724861,
      longitude: -61.82927245506439,
      title: "Mortello Tower",
      text: "The Mortellow Tower",
      media: {
        mediaType: "model",
        mediaURL: "models/mortello.glb",
        rotation: [-1.6, 0, 0],
      },
    },
    //governmanet house: 17.64108956589416, -61.82587035407267
    {
      latitude: 17.64108956589416,
      longitude: -61.82587035407267,
      title: "Government House",
      text: "The Mortellow Tower",
      media: {
        mediaType: "model",
        mediaURL: "models/government_house.glb",
        rotation: [-1.6, 0, -0.8],
      },
    },
    //pier: 17.64173747983183, -61.82850208676978
    {
      latitude: 17.64173747983183,
      longitude: -61.82850208676978,
      title: "Old Castle Wharf",
      text: "The Mortellow Tower",
      media: {
        mediaType: "model",
        mediaURL: "models/pier.glb",
        rotation: [1.3, 0.53, -1.22],
        // rotation: [0, 0, 0],
      },
    },
    //ginnery: 17.64164961727205, -61.827314366073544
    {
      latitude: 17.64164961727205,
      longitude: -61.827314366073544,
      title: "Ginnery",
      text: "The Mortellow Tower",
      media: {
        mediaType: "model",
        mediaURL: "models/ginnery.glb",
        rotation: [-1.5, 0, 0],
      },
    },
    //ginnery annex: 17.64199217, -61.82725733
    // {
    //   latitude: 17.64199217,
    //   longitude: -61.82725733,
    //   title: "Ginnery Annex",
    //   text: "The Mortellow Tower",
    //   media: { mediaType: "model", mediaURL: "models/ginnery_annex_poor.glb" },
    // },
    //indigo well: 	17.64046503,-61.81766167
    // {
    //   latitude: 17.64046503,
    //   longitude: -61.81766167,
    //   title: "Indigo Well",
    //   text: "The Mortellow Tower",
    //   media: { mediaType: "model", mediaURL: "models/indigo_well.glb" },
    // },
    //lime kilm: 17.55788139, -61.76321972
    {
      latitude: 17.55788139,
      longitude: -61.76321972,
      title: "Lime Kilm",
      text: "The Mortellow Tower",
      media: {
        mediaType: "model",
        mediaURL: "models/lime_kilm.glb",
        rotation: [-1.6, 0, -1.6],
      },
    },
    //gunshop cliff: 17.6690843673667, -61.7688797834
    {
      latitude: 17.6690843673667,
      longitude: -61.7688797834,
      title: "Gunshop Cliff",
      text: "The Mortellow Tower",
      media: { mediaType: "model", mediaURL: "models/gunshop.glb" },
    },
    //petroglyph: 17.6686973934194, -61.769007879129
    // {
    //   latitude: 17.6686973934194,
    //   longitude: -61.769007879129,
    //   title: "Petroglyph",
    //   text: "The Mortellow Tower",
    //   media: { mediaType: "model", mediaURL: "models/petroglyph.glb" },
    // },
    //stratigraphy: 17.5751441796061, -61.7968387686061
    // {
    //   latitude: 17.5751441796061,
    //   longitude: -61.7968387686061,
    //   title: "Stratigraphy",
    //   text: "The Mortellow Tower",
    //   media: { mediaType: "model", mediaURL: "models/stratigraphy.glb" },
    // },
  ],
};

export default function page() {
  return (
    <>
      <main className={styles.main}>
        <MapStory {...props} />
      </main>
    </>
  );
}
