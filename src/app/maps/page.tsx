"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Mock data for demonstration
const mockDevices = [
  { id: 1, name: "Device-001", location: "Connaught Place", status: "Active", lastReading: "245 AQI", battery: "85%", lastUpdated: "2023-05-15 14:30", lat: 28.6289, lng: 77.2074 },
  { id: 2, name: "Device-002", location: "India Gate", status: "Active", lastReading: "198 AQI", battery: "72%", lastUpdated: "2023-05-15 14:25", lat: 28.6129, lng: 77.2295 },
  { id: 3, name: "Device-003", location: "Chandni Chowk", status: "Warning", lastReading: "312 AQI", battery: "45%", lastUpdated: "2023-05-15 14:15", lat: 28.6505, lng: 77.2303 },
  { id: 4, name: "Device-004", location: "Lajpat Nagar", status: "Inactive", lastReading: "N/A", battery: "10%", lastUpdated: "2023-05-14 23:45", lat: 28.5693, lng: 77.2432 },
  { id: 5, name: "Device-005", location: "Nehru Place", status: "Active", lastReading: "175 AQI", battery: "90%", lastUpdated: "2023-05-15 14:28", lat: 28.5491, lng: 77.2533 },
  { id: 6, name: "Device-006", location: "Karol Bagh", status: "Active", lastReading: "220 AQI", battery: "65%", lastUpdated: "2023-05-15 14:20", lat: 28.6619, lng: 77.1921 },
  { id: 7, name: "Device-007", location: "Rajouri Garden", status: "Active", lastReading: "190 AQI", battery: "78%", lastUpdated: "2023-05-15 14:22", lat: 28.6492, lng: 77.1220 },
];

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Loading map...</p>
      </div>
    </div>
  )
});

export default function MapsPage() {
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredDevices = mockDevices.filter(device => {
    if (statusFilter === "all") return true;
    if (statusFilter === "active" && device.status === "Active") return true;
    if (statusFilter === "warning" && device.status === "Warning") return true;
    if (statusFilter === "inactive" && device.status === "Inactive") return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delhi Pollution Monitoring Map</h1>
          <div className="flex items-center space-x-4">
            <select 
              className="bg-white text-gray-800 px-4 py-2 rounded-md border-0 shadow-sm focus:ring-2 focus:ring-purple-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Devices</option>
              <option value="active">Active Only</option>
              <option value="warning">Warning Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <div className="relative">
              <MapComponent devices={filteredDevices} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
              
              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md border border-gray-200 z-[1000]">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">Legend</h3>
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">Active Device</span>
                </div>
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">Warning</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">Inactive</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Device List */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-lg font-semibold text-indigo-800">Monitoring Devices</h2>
              <p className="text-sm text-gray-600">Click on a device to see details</p>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              <ul className="divide-y divide-gray-200">
                {filteredDevices.map((device) => (
                  <li 
                    key={device.id} 
                    className={`p-4 cursor-pointer hover:bg-indigo-50 transition-colors duration-150 ${selectedDevice === device.id ? 'bg-indigo-100 border-l-4 border-indigo-500' : ''}`}
                    onClick={() => setSelectedDevice(device.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        device.status === 'Active' ? 'bg-green-500' : 
                        device.status === 'Warning' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}></div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">{device.name}</h3>
                        <p className="text-xs text-gray-500">{device.location}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Last Reading: <span className="font-medium text-indigo-600">{device.lastReading}</span></p>
                      <p>Updated: {device.lastUpdated}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Selected Device Details */}
        {selectedDevice && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800 border-b pb-2">Device Details</h2>
            {(() => {
              const device = mockDevices.find(d => d.id === selectedDevice);
              if (!device) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Device ID</h3>
                      <p className="text-indigo-700 font-medium">{device.name}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="text-gray-800">{device.location}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Coordinates</h3>
                      <p className="text-gray-800 font-mono text-sm">Lat: {device.lat}, Lng: {device.lng}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${device.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          device.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {device.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Last Reading</h3>
                      <p className={`text-lg font-bold ${
                        parseInt(device.lastReading) > 300 ? 'text-red-600' : 
                        parseInt(device.lastReading) > 200 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>{device.lastReading}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500">Battery</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            parseInt(device.battery) > 70 ? 'bg-green-600' : 
                            parseInt(device.battery) > 30 ? 'bg-yellow-600' : 
                            'bg-red-600'
                          }`} 
                          style={{ width: device.battery }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{device.battery}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
            <div className="mt-6 flex justify-end space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                View History
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                Configure
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 