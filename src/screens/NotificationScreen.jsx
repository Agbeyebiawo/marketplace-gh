import React, { useState } from 'react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'Order Confirmed', message: 'Your order #ORD-8821 has been accepted by the seller.', time: '10m ago', unread: true },
  { id: 2, type: 'promo', title: 'Special Discount!', message: 'Get 15% off electronics in East Legon today only.', time: '2h ago', unread: true },
  { id: 3, type: 'message', title: 'New Message', message: 'Kofi sent you a message regarding "Velvet Armchair".', time: 'Yesterday', unread: false },
  { id: 4, type: 'system', title: 'System Maintenance', message: 'MarketPlace GH will undergo routine updates at midnight.', time: '2 days ago', unread: false },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        <button onClick={markAllAsRead} className="text-xs font-semibold text-brand-600 active:text-brand-800">
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="p-4 space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border transition-colors flex items-start gap-3 ${
              n.unread ? 'bg-brand-50/60 border-brand-100' : 'bg-white border-gray-100'
            }`}
          >
            <div className={`p-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className={`text-sm ${n.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{n.title}</h3>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
