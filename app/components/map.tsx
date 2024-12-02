"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, /*Polygon,*/ Popup, TileLayer } from "react-leaflet";
import { LatLng, LatLngBounds } from "leaflet"

/*
const countyLongfordCoordinates: [number, number][] = [
  [53.7678, -7.8718],
  [53.7589, -7.861],
  [53.7453, -7.8495],
  [53.7321, -7.8347],
  [53.7264, -7.8103],
  [53.7159, -7.7822],
  [53.7052, -7.7634],
  [53.6946, -7.7405],
  [53.6839, -7.7258],
  [53.6712, -7.7121],
  [53.6612, -7.7004],
  [53.6494, -7.6921],
  [53.6375, -7.6887],
  [53.6221, -7.687],
  [53.6111, -7.684],
  [53.5997, -7.6718],
  [53.5892, -7.6612],
  [53.5784, -7.6541],
  [53.5691, -7.6457],
  [53.5586, -7.6319],
  [53.5471, -7.6159],
  [53.5356, -7.6011],
  [53.5247, -7.5911],
  [53.5112, -7.5874],
  [53.5002, -7.5798],
  [53.4892, -7.5723],
  [53.4791, -7.5617],
  [53.4701, -7.5509],
  [53.4603, -7.5412],
  [53.4503, -7.5337],
  [53.4391, -7.5228],
  [53.4291, -7.5121],
  [53.4191, -7.5021],
  [53.4091, -7.4911],
  [53.3991, -7.4811],
  [53.3891, -7.4711],
  [53.3791, -7.4611],
  [53.3691, -7.4511],
  [53.3591, -7.4411],
  [53.3491, -7.4311],
  [53.3391, -7.4211],
  [53.3291, -7.4111],
  [53.3191, -7.4011],
  [53.3091, -7.3911],
  [53.2991, -7.3811],
  [53.7678, -7.8718], // Closing the polygon
];  
*/

export default function Map() {
    const position = new LatLng(53.7257, -7.7939)
    const longfordBounds = new LatLngBounds(
        [53.6054, -8.0008],
        [53.8286, -7.5886] 
    );

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
                // style={{width: '100%', height: '100%', position: 'relative'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
                    </Popup>
                </Marker>
                {/*<Polygon
                  positions={countyLongfordCoordinates}
                  pathOptions={{
                    color: "red",
                    weight: 2,
                    fillOpacity: 0,
                  }}
                  />*/}
            </MapContainer>
        </div>
    );
}
