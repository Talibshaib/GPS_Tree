"use client";

import { useState } from "react";

// Mock data for demonstration
const mockAlerts = [
  { id: 1, device: "Device-003", location: "Chandni Chowk", message: "High pollution levels detected", severity: "High", timestamp: "2023-05-15 13:45", status: "Open" },
  { id: 2, device: "Device-004", location: "Lajpat Nagar", message: "Battery critically low", severity: "Medium", timestamp: "2023-05-15 12:30", status: "Open" },
  { id: 3, device: "Device-002", location: "India Gate", message: "Connection unstable", severity: "Low", timestamp: "2023-05-15 11:15", status: "Resolved" },
  { id: 4, device: "Device-001", location: "Connaught Place", message: "Maintenance required", severity: "Medium", timestamp: "2023-05-14 10:20", status: "In Progress" },
  { id: 5, device: "Device-005", location: "Nehru Place", message: "Sensor calibration needed", severity: "Low", timestamp: "2023-05-14 09:15", status: "Resolved" },
  { id: 6, device: "Device-003", location: "Chandni Chowk", message: "Pollution spike detected", severity: "High", timestamp: "2023-05-13 18:30", status: "Resolved" },
  { id: 7, device: "Device-006", location: "Karol Bagh", message: "Device restarted unexpectedly", severity: "Medium", timestamp: "2023-05-13 14:45", status: "Resolved" },
];

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.device.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow transition-colors duration-150">
              Critical Alerts
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Alerts</h2>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🔔</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-indigo-600">{mockAlerts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">High Severity</h2>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600">{mockAlerts.filter(a => a.severity === "High").length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Open Alerts</h2>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">📬</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600">{mockAlerts.filter(a => a.status === "Open").length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Resolved</h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600">{mockAlerts.filter(a => a.status === "Resolved").length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-indigo-800 mb-4">Filter Alerts</h3>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Alerts</label>
              <input
                type="text"
                id="search"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search by device, location or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/5">
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                id="severity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <option value="All">All Severities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="w-full md:w-1/5">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="w-full md:w-1/6">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-colors duration-150">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-xl font-semibold text-indigo-800">Alert List</h2>
            <p className="text-gray-600">Showing {filteredAlerts.length} alerts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">{alert.device}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{alert.location}</td>
                    <td className="px-6 py-4">{alert.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${alert.severity === 'High' ? 'bg-red-100 text-red-800' : 
                          alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${alert.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                          alert.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{alert.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Details</button>
                      {alert.status !== "Resolved" && (
                        <button className="text-green-600 hover:text-green-900">Resolve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAlerts.length}</span> of <span className="font-medium">{mockAlerts.length}</span> alerts
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
      </main>
    </div>
  );
} 