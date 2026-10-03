import React from 'react';
import { products } from '../data';

const MOCK_ORDERS = [
  { id: 'ORD-9912', product: products[0], status: 'In Transit', date: '28 Sep 2026' },
  { id: 'ORD-8821', product: products[3], status: 'Delivered', date: '21 Sep 2026' },
];

export default function OrdersScreens() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
      </div>

      <div className="p-4 space-y-3">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-gray-500">{order.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="flex gap-3">
              <img src={order.product.images[0]} alt={order.product.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-xs text-gray-800">{order.product.name}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{order.product.location} • {order.date}</p>
                <p className="font-bold text-brand-600 text-xs mt-1">GHS {order.product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}