"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for demonstration
const mockDevices = [
  { id: 1, name: "Device-001", location: "Connaught Place", status: "Active", lastReading: "245 AQI", battery: "85%", lastUpdated: "2023-05-15 14:30", type: "Air Quality Monitor", installDate: "2023-01-15", maintDate: "2023-04-15" },
  { id: 2, name: "Device-002", location: "India Gate", status: "Active", lastReading: "198 AQI", battery: "72%", lastUpdated: "2023-05-15 14:25", type: "Air Quality Monitor", installDate: "2023-01-20", maintDate: "2023-04-20" },
  { id: 3, name: "Device-003", location: "Chandni Chowk", status: "Warning", lastReading: "312 AQI", battery: "45%", lastUpdated: "2023-05-15 14:15", type: "Air Quality Monitor", installDate: "2023-01-25", maintDate: "2023-04-25" },
  { id: 4, name: "Device-004", location: "Lajpat Nagar", status: "Inactive", lastReading: "N/A", battery: "10%", lastUpdated: "2023-05-14 23:45", type: "Air Quality Monitor", installDate: "2023-02-01", maintDate: "2023-05-01" },
  { id: 5, name: "Device-005", location: "Nehru Place", status: "Active", lastReading: "175 AQI", battery: "90%", lastUpdated: "2023-05-15 14:28", type: "Air Quality Monitor", installDate: "2023-02-05", maintDate: "2023-05-05" },
  { id: 6, name: "Device-006", location: "Karol Bagh", status: "Active", lastReading: "220 AQI", battery: "65%", lastUpdated: "2023-05-15 14:20", type: "Air Quality Monitor", installDate: "2023-02-10", maintDate: "2023-05-10" },
  { id: 7, name: "Device-007", location: "Rajouri Garden", status: "Active", lastReading: "190 AQI", battery: "78%", lastUpdated: "2023-05-15 14:22", type: "Air Quality Monitor", installDate: "2023-02-15", maintDate: "2023-05-15" },
];

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  
  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDevice = (id: number) => {
    setSelectedDevice(id === selectedDevice ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">IoT Devices</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md shadow transition-colors duration-150">
              Add New Device
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Device Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Devices</h2>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">📱</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-indigo-600">{mockDevices.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Active</h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600">{mockDevices.filter(d => d.status === "Active").length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Warning</h2>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⚠️</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{mockDevices.filter(d => d.status === "Warning").length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Inactive</h2>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">❌</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600">{mockDevices.filter(d => d.status === "Inactive").length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-indigo-800 mb-4">Filter Devices</h3>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Devices</label>
              <input
                type="text"
                id="search"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                id="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Warning">Warning</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 md:self-end">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Device List */}
          <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${selectedDevice ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-xl font-semibold text-indigo-800">Device List</h2>
              <p className="text-gray-600">Total: {filteredDevices.length} devices</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDevices.map((device) => (
                    <tr key={device.id} className={`hover:bg-gray-50 ${selectedDevice === device.id ? 'bg-indigo-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">{device.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{device.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{device.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${device.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            device.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.lastReading !== 'N/A' ? (
                          <span className={
                            parseInt(device.lastReading) > 300 ? 'text-red-600 font-medium' : 
                            parseInt(device.lastReading) > 200 ? 'text-yellow-600 font-medium' : 
                            'text-green-600 font-medium'
                          }>
                            {device.lastReading}
                          </span>
                        ) : (
                          <span className="text-gray-400">{device.lastReading}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => handleViewDevice(device.id)}
                        >
                          {selectedDevice === device.id ? 'Hide' : 'View'}
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDevices.length}</span> of <span className="font-medium">{mockDevices.length}</span> devices
                </p>
              </div>
              <div className="flex-1 flex justify-end">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Device Details */}
          {selectedDevice && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 lg:col-span-1 h-fit">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-semibold text-indigo-800">Device Details</h2>
                <p className="text-gray-600">Detailed information</p>
              </div>
              <div className="p-6">
                {(() => {
                  const device = mockDevices.find(d => d.id === selectedDevice);
                  if (!device) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Device ID</h3>
                        <p className="text-lg font-medium text-indigo-700">{device.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                        <p className="text-gray-800">{device.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                        <p className="text-gray-800">{device.type}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${device.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            device.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {device.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Last Reading</h3>
                        <p className={`text-lg font-bold ${
                          parseInt(device.lastReading) > 300 ? 'text-red-600' : 
                          parseInt(device.lastReading) > 200 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>{device.lastReading}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Battery</h3>
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
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Installation Date</h3>
                        <p className="text-gray-800">{device.installDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Last Maintenance</h3>
                        <p className="text-gray-800">{device.maintDate}</p>
                      </div>
                      <div className="pt-4 flex flex-col space-y-2">
                        <Link href={`/maps?device=${device.id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow text-center transition-colors duration-150">
                          View on Map
                        </Link>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                          View History
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                          Configure
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 