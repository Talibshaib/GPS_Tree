"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for demonstration
const mockDevices = [
  { id: 1, name: "Device-001", location: "Connaught Place", status: "Active", lastReading: "245 AQI", battery: "85%", lastUpdated: "2023-05-15 14:30" },
  { id: 2, name: "Device-002", location: "India Gate", status: "Active", lastReading: "198 AQI", battery: "72%", lastUpdated: "2023-05-15 14:25" },
  { id: 3, name: "Device-003", location: "Chandni Chowk", status: "Warning", lastReading: "312 AQI", battery: "45%", lastUpdated: "2023-05-15 14:15" },
  { id: 4, name: "Device-004", location: "Lajpat Nagar", status: "Inactive", lastReading: "N/A", battery: "10%", lastUpdated: "2023-05-14 23:45" },
  { id: 5, name: "Device-005", location: "Nehru Place", status: "Active", lastReading: "175 AQI", battery: "90%", lastUpdated: "2023-05-15 14:28" },
];

const mockAlerts = [
  { id: 1, device: "Device-003", message: "High pollution levels detected", severity: "High", timestamp: "2023-05-15 13:45" },
  { id: 2, device: "Device-004", message: "Battery critically low", severity: "Medium", timestamp: "2023-05-15 12:30" },
  { id: 3, device: "Device-002", message: "Connection unstable", severity: "Low", timestamp: "2023-05-15 11:15" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-md shadow transition-colors duration-150">
              Notifications
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Active Devices</h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl">📱</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-indigo-600">3</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-green-500 mr-1">↑ 5%</span>
              <span>from last week</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Average AQI</h2>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 text-xl">🌫️</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-yellow-600">232</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-red-500 mr-1">↑ 12%</span>
              <span>from last week</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Alerts</h2>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">🔔</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600">3</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-red-500 mr-1">↑ 2</span>
              <span>new alerts today</span>
            </div>
          </div>
        </div>

        {/* Air Quality Map Preview */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-indigo-800">Delhi Air Quality Map</h2>
              <p className="text-gray-600">Current pollution levels across the city</p>
            </div>
            <Link href="/maps" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
              View Full Map
            </Link>
          </div>
          <div className="h-64 bg-gray-200 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/JWgMRWE.jpg')" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link href="/maps" className="bg-white/80 backdrop-blur-sm hover:bg-white px-6 py-3 rounded-full shadow-lg text-indigo-700 font-semibold transition-all duration-150 hover:scale-105">
                Open Interactive Map
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device List */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-indigo-800">IoT Devices</h2>
                <p className="text-gray-600">Monitoring devices deployed across Delhi</p>
              </div>
              <Link href="/devices" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDevices.slice(0, 4).map((device) => (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">{device.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{device.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${device.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            device.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {device.lastReading !== 'N/A' ? (
                          <span className={
                            parseInt(device.lastReading) > 300 ? 'text-red-600' : 
                            parseInt(device.lastReading) > 200 ? 'text-yellow-600' : 
                            'text-green-600'
                          }>
                            {device.lastReading}
                          </span>
                        ) : (
                          <span className="text-gray-400">{device.lastReading}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-indigo-800">Recent Alerts</h2>
                <p className="text-gray-600">Notifications from monitoring devices</p>
              </div>
              <Link href="/alerts" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View All →
              </Link>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {mockAlerts.map((alert) => (
                  <li key={alert.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`mt-1 w-3 h-3 rounded-full mr-3 flex-shrink-0 ${
                        alert.severity === 'High' ? 'bg-red-500' : 
                        alert.severity === 'Medium' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {alert.device}: {alert.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {alert.timestamp}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${alert.severity === 'High' ? 'bg-red-100 text-red-800' : 
                            alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {alert.severity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
