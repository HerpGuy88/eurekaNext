"use client";

import {
  Suspense,
  useMemo,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import {
  Button,
  Container,
  Icon,
  Input,
  Grid,
  Modal,
  Table,
  Segment,
} from "semantic-ui-react";

import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls, Stage } from "@react-three/drei";
import { MapStoryProps } from "./types";
import Model from "./Model";

export default function MapStory({
  latitude,
  longitude,
  zoom,
  title,
  text,
  mapItems,
  ...rest
}: MapStoryProps) {
  //Establish State variables
  const [unmountMap, setunmountMap] = useState(false);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(-1);
  const markerRefs = useRef([]);
  const cameraControlRef = useRef<typeof CameraControls | null>(null);
  const orbitControlRef = useRef<typeof OrbitControls | null>(null);
  const map = useRef<any>(null);
  const onMarkerClick = useCallback(
    //@ts-ignore
    (index) => {
      setSelected(index);
    },
    [selected]
  );

  //to prevent map re-initialization
  useLayoutEffect(() => {
    setunmountMap(false);
    return () => {
      setunmountMap(true);
    };
  }, []);

  useLayoutEffect(() => {
    markerRefs.current = markerRefs.current.slice(0, mapItems.length);
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        //   @ts-ignore
        containerStyle={{ height: "100%", width: "80%", zIndex: 1 }}
        center={[latitude, longitude]}
        //   zoomSnap={0.25}
        bounds={[
          [17.542775, -61.889772],
          [17.73156, -61.729079],
        ]}
        options={{ zoomSnap: 0.25 }}
        // @ts-ignore
        //   zoom={zoom | 7}
        key={new Date().getTime()}
        ref={(el) => (map.current = el)}
      >
        <TileLayer
          //@ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapItems.map((item, index) => {
          return (
            <Marker
              key={`k${index}`}
              position={[item.latitude, item.longitude]}
              //@ts-ignore
              ref={(el) => (markerRefs.current[index] = el)}
              eventHandlers={{
                //   click: () => {
                //     setSelected(index);
                //     console.log(item.title);
                //   },
                click: onMarkerClick.bind(null, index),
              }}
            ></Marker>
          );
        })}
      </MapContainer>
    ),
    [mapItems]
  );

  if (unmountMap) {
    return <h1>Loading map...</h1>;
  }
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: selected > -1 ? 1001 : 0,
          backgroundColor: `rgba(0,0,0,0.5)`,
          visibility: selected > -1 ? "visible" : "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            height: "90vh",
          }}
        >
          <div style={{ top: 40, display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setSelected(-1)}>Close</Button>
          </div>
          <VRButton />
          <Suspense>
            <Canvas>
              {/* @ts-ignore */}
              <OrbitControls
                //@ts-ignore
                ref={orbitControlRef}
                enabled
                maxPolarAngle={Math.PI * 0.6}
              />
              <XR>
                <Stage>
                  {selected > -1 && mapItems[selected]?.media?.mediaURL && (
                    <Model
                      rotation={mapItems[selected]?.media?.rotation}
                      modelURL={mapItems[selected]?.media?.mediaURL}
                    />
                  )}
                </Stage>
                <Hands />
              </XR>
            </Canvas>
          </Suspense>
        </div>
      </div>

      <Container style={{ height: "100%", width: "100%" }}>
        {/* <Grid>
          <Grid.Row> */}
        <Grid columns={1} stackable>
          <Grid.Column>
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 450,
              }}
            >
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Segment inverted color="green">
                    <h1>{title}</h1>
                  </Segment>
                </div>
                <br />
              </div>
            </div>
            {displayMap}

            {/* <MapContainer
              //   @ts-ignore
              containerStyle={{ height: "100%", width: "80%", zIndex: 1 }}
              center={[latitude, longitude]}
              //   zoomSnap={0.25}
              bounds={[
                [17.542775, -61.889772],
                [17.73156, -61.729079],
              ]}
              options={{ zoomSnap: 0.25 }}
              // @ts-ignore
              //   zoom={zoom | 7}
              key={new Date().getTime()}
              ref={(el) => (map.current = el)}
            >
              <TileLayer
                //@ts-ignore
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mapItems.map((item, index) => {
                return (
                  <Marker
                    key={`k${index}`}
                    position={[item.latitude, item.longitude]}
                    //@ts-ignore
                    ref={(el) => (markerRefs.current[index] = el)}
                    eventHandlers={{
                      //   click: () => {
                      //     setSelected(index);
                      //     console.log(item.title);
                      //   },
                      click: onMarkerClick.bind(null, index),
                    }}
                  ></Marker>
                );
              })}
            </MapContainer> */}
          </Grid.Column>
          {/* </Grid.Row> */}
        </Grid>
      </Container>
    </div>
  );
}
