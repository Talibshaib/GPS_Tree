"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

interface Device {
  id: number;
  name: string;
  location: string;
  status: string;
  lastReading: string;
  battery: string;
  lastUpdated: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  devices: Device[];
  selectedDevice: number | null;
  setSelectedDevice: (id: number) => void;
}

const MapComponent = ({ devices, selectedDevice, setSelectedDevice }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

  useEffect(() => {
    // Fix Leaflet icon issue
    fixLeafletIcon();

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      // Delhi coordinates
      const delhiCoordinates: L.LatLngExpression = [28.6139, 77.2090];
      
      // Create map centered on Delhi
      mapRef.current = L.map('map').setView(delhiCoordinates, 12);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add a custom tile layer with Delhi pollution heatmap overlay (this is a placeholder - in a real app you'd use actual data)
      L.tileLayer('https://tile.openweathermap.org/map/aqi_comb/{z}/{x}/{y}.png?appid=YOUR_API_KEY', {
        attribution: 'Air Quality data © OpenWeatherMap',
        maxZoom: 19,
        opacity: 0.6
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      marker.remove();
    });
    markersRef.current = {};

    // Add markers for each device
    devices.forEach(device => {
      const markerIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin ${
          device.status === 'Active' ? 'bg-green-500' : 
          device.status === 'Warning' ? 'bg-yellow-500' : 
          'bg-red-500'
        } w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">${device.id}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([device.lat, device.lng], { icon: markerIcon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="text-center">
            <h3 class="font-bold">${device.name}</h3>
            <p>${device.location}</p>
            <p class="text-sm">AQI: ${device.lastReading}</p>
          </div>
        `);

      marker.on('click', () => {
        setSelectedDevice(device.id);
      });

      markersRef.current[device.id] = marker;
    });

    // If a device is selected, open its popup and pan to it
    if (selectedDevice && markersRef.current[selectedDevice]) {
      const marker = markersRef.current[selectedDevice];
      mapRef.current?.panTo(marker.getLatLng());
      marker.openPopup();
    }

    // Cleanup function
    return () => {
      // We don't destroy the map here because we want to reuse it
    };
  }, [devices, selectedDevice, setSelectedDevice]);

  return <div id="map" className="h-[600px] rounded-lg z-0"></div>;
};

export default MapComponent; 