import React, { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <img src="https://i.pravatar.cc/100?img=33" alt="Profile" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-800">Kwame Asante</h3>
            <p className="text-xs text-gray-400">kwame.asante@example.com</p>
          </div>
          <button className="text-xs text-brand-600 font-semibold">Edit</button>
        </div>

        {/* Preferences Toggle */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <div className="p-4 flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">Push Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-4 h-4 accent-brand-500 cursor-pointer"
            />
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-4 h-4 accent-brand-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Security & Account Options */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <button className="w-full p-4 text-left text-xs font-semibold text-gray-700 flex justify-between items-center">
            <span>Change Password</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full p-4 text-left text-xs font-semibold text-gray-700 flex justify-between items-center">
            <span>Privacy Policy</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full p-4 text-left text-xs font-semibold text-red-500 flex justify-between items-center">
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}