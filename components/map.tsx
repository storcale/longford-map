"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, /*Polygon,*/ Popup, TileLayer } from "react-leaflet";
import { LatLngBounds } from "leaflet"
import { useEffect, useState } from "react";

export default function Map() {
    const longfordBounds = new LatLngBounds(
      [53.6054, -8.0008],
      [53.8286, -7.5886]
    );
  
    interface MarkerData {
      _id: string;
      position: {
        lat: number;
        lng: number;
      };
      name: string;
      description: string;
    }
  
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  
    useEffect(() => {
      const fetchMarkers = async () => {
        const res = await fetch("/api/markers");
        const data: MarkerData[] = await res.json();
        setMarkers(data);
      };
  
      fetchMarkers();
    }, []);
  
    return (
      <div>
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
          {markers.map((marker) => (
            <Marker
              key={marker._id}
              position={[marker.position.lat, marker.position.lng]}
              eventHandlers={{
                click: () => setSelectedMarker(marker),
              }}
            >
              <Popup>{marker.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
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
  