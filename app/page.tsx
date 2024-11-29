"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("./components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
 });
export default function Home() {
  return (
    <main>
      <div id="longford-map">
        <Map />
      </div>
    </main>
  );
}