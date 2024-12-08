"use client";

import dynamic from "next/dynamic";
import Sidebar from "../components/sidebar";
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
 });
 
console.log("Map component:", Map); 
export default function Home() {
  return (
    <main>
     <div style={{ display: 'flex', height: '100vh'}}>
      <div id="longford-map" style={{ flexGrow: 1, flexBasis: '1000px' }}>
        <Map />
      </div>
      <div id='sidebar' style={{ flexGrow: 2, flexBasis: '100px' }}>
      <Sidebar />
      </div>
    </div>
    </main>
  );
}