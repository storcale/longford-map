"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, /*Polygon,*/ Popup, TileLayer } from "react-leaflet";
import { LatLngBounds } from "leaflet"
import { useEffect, useState } from "react";

interface MarkerData {
  _id: string;
  position: {
    lat: number;
    lng: number;
  };
  name: string;
  description: string;
}



export default function Map() {
    const longfordBounds = new LatLngBounds(
      [53.6054, -8.0008],
      [53.8286, -7.5886]
    );
  
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchMarkers = async () => {
        console.log("Fetching markers...");
        try {
          const res = await fetch("/api/markers");
          console.log("Response status:", res.status);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data: MarkerData[] = await res.json();
          console.log("Fetched markers in map:", data);
          setMarkers(data);
        } catch (error) {
          console.error("Failed to fetch markers:", error);
          setMarkers([]);
        } finally {
          setLoading(false);
        }
      };
    
      fetchMarkers();
    }, []);

    return (
      <div>
        {loading ? (
          <div>Loading markers...</div>
        ) : (
          <MapContainer
            bounds={longfordBounds}
            maxBounds={longfordBounds}
            maxBoundsViscosity={1.0}
            zoom={2}
            minZoom={10}
            scrollWheelZoom={true}
            style={{ height: "600px", width: "1000px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Array.isArray(markers) &&
          markers.map((marker) => {
            console.log("Rendering Marker:", marker);
            return (
              <Marker
                key={marker._id}
                position={[marker.position.lat, marker.position.lng]}
                eventHandlers={{
                  click: () => setSelectedMarker(marker),
                }}
              >
                <Popup>{marker.description}</Popup>
              </Marker>
            );
          })}

          </MapContainer>
        )}
  
        {selectedMarker && (
          <div>
            <h3>Selected Marker</h3>
            <p>Name: {selectedMarker.name}</p>
            <p>Description: {selectedMarker.description}</p>
          </div>
        )}
      </div>
    );
  }