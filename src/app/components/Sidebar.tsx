"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Devices", href: "/devices", icon: "📱" },
  { name: "Alerts", href: "/alerts", icon: "🔔" },
  { name: "Maps", href: "/maps", icon: "🗺️" },
  // { name: "Reports", href: "/reports", icon: "📝" },
  // { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="bg-indigo-600 text-white p-2 rounded-md shadow-lg"
        >
          {collapsed ? "☰" : "✕"}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out z-40 
          ${collapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "w-64"}`}
      >
        <div className={`p-4 border-b border-indigo-700 flex items-center ${collapsed ? "md:justify-center" : "justify-between"}`}>
          {!collapsed && (
            <>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 text-transparent bg-clip-text">Delhi Pollution</h2>
                <p className="text-indigo-300 text-sm">Admin Panel</p>
              </div>
              <button 
                onClick={() => setCollapsed(true)}
                className="text-indigo-300 hover:text-white md:block hidden"
              >
                ◀
              </button>
            </>
          )}
          {collapsed && (
            <button 
              onClick={() => setCollapsed(false)}
              className="text-indigo-300 hover:text-white hidden md:block"
            >
              ▶
            </button>
          )}
        </div>
        <nav className="mt-6">
          <ul>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="mb-2 px-2">
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-700 text-white shadow-md"
                        : "text-indigo-200 hover:bg-indigo-800"
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={`absolute bottom-0 w-full p-4 border-t border-indigo-700 ${collapsed ? "hidden md:block" : ""}`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <span className="font-semibold">A</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-indigo-300">admin@delhi.gov.in</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        ></div>
      )}
    </>
  );
} 