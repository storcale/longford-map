"use client";

import dynamic from "next/dynamic";
import Sidebar from "./components/sidebar";
import AutoScale from 'react-auto-scale';
const Map = dynamic(() => import("./components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
 });
export default function Home() {
  return (
    <main>
     <div style={{ flexDirection: 'column',justifyContent: 'space-between' }}>
      <div id="longford-map" style={{flex:'1'}}>
        <Map />
      </div>
      <div id='sidebar' style={{flex:'2'}}>
      <Sidebar />
      </div>
    </div>
    </main>
  );
}