import React from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import {
    Package, AlertTriangle, ShoppingCart, ChefHat,
    Clock, TrendingDown, Users, Thermometer
} from 'lucide-react';

export default function Dashboard() {
    const { items, stock, logs, recipes, shopItems, expiringItems, persons, getItem, getPerson, getLocation } = useApp();

    const pendingItemsCount = shopItems.filter(i => i.Status === 'pending').length;
    const recentLogs = logs.slice(0, 8);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    Welcome back — here's your grocery overview
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Package}
                    label="Total Items"
                    value={items.length}
                    color="#3b82f6"
                    sub={`${stock.length} stock entries`}
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Expiring Soon"
                    value={expiringItems.length}
                    color="#f43f5e"
                    sub="Within 3 days"
                />
                <StatCard
                    icon={ChefHat}
                    label="Recipes"
                    value={recipes.length}
                    color="#8b5cf6"
                    sub="In your cookbook"
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Shopping List"
                    value={pendingItemsCount}
                    color="#f59e0b"
                    sub="Items to buy"
                />
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Expiring Items */}
                <div className="glass-card p-5 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={18} style={{ color: '#f43f5e' }} />
                        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Expiring Soon
                        </h2>
                    </div>
                    {expiringItems.length === 0 ? (
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No items expiring soon 🎉</p>
                    ) : (
                        <div className="space-y-3">
                            {expiringItems.map(s => {
                                const item = getItem(s.Item_ID);
                                const loc = getLocation(s.Storage_ID);
                                return (
                                    <div
                                        key={s.ID}
                                        className="flex items-center justify-between p-3 rounded-xl"
                                        style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}
                                    >
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                                {item?.Name}
                                            </p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                {loc?.Location_Name}
                                            </p>
                                        </div>
                                        <span
                                            className="badge pulse-alert"
                                            style={{ background: 'rgba(244,63,94,0.2)', color: '#f43f5e' }}
                                        >
                                            {s.Days_Left <= 0 ? 'Expired' : `${s.Days_Left}d left`}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Recent Usage Logs */}
                <div className="glass-card p-5 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={18} style={{ color: '#06b6d4' }} />
                        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Recent Usage
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Used By</th>
                                    <th>Qty</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentLogs.map(log => {
                                    const item = getItem(log.Item_ID);
                                    const person = getPerson(log.Person_ID);
                                    return (
                                        <tr key={log.Log_ID}>
                                            <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                                {item?.Name}
                                            </td>
                                            <td>{person ? `${person.First_Name} ${person.Last_Name}` : '—'}</td>
                                            <td>
                                                <span className="badge" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>
                                                    {log.Used_Quantity}
                                                </span>
                                            </td>
                                            <td>{log.Used_Date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Bottom row: Storage overview + members */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Storage zones mini */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Thermometer size={18} style={{ color: '#10b981' }} />
                        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Storage Zones
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { name: 'Main Fridge', temp: '4°C', icon: '🧊' },
                            { name: 'Freezer', temp: '-18°C', icon: '❄️' },
                            { name: 'Pantry', temp: '22°C', icon: '🏠' },
                            { name: 'Spice Rack', temp: '22°C', icon: '🌶️' },
                            { name: 'Fruit Basket', temp: '22°C', icon: '🍎' },
                        ].map(z => (
                            <div
                                key={z.name}
                                className="p-3 rounded-xl text-center"
                                style={{ background: 'var(--color-dark-700)', border: '1px solid var(--color-glass-border)' }}
                            >
                                <span className="text-xl">{z.icon}</span>
                                <p className="text-xs font-medium mt-2" style={{ color: 'var(--color-text-primary)' }}>{z.name}</p>
                                <p className="text-xs" style={{ color: 'var(--color-accent-cyan)' }}>{z.temp}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Members mini */}
                <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Users size={18} style={{ color: '#8b5cf6' }} />
                        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Household Members
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {persons.map((p, i) => {
                            const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
                            return (
                                <div
                                    key={p.Person_ID}
                                    className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ background: 'var(--color-dark-700)', border: '1px solid var(--color-glass-border)' }}
                                >
                                    <div
                                        className="flex items-center justify-center rounded-full shrink-0 text-sm font-bold"
                                        style={{
                                            width: 36, height: 36,
                                            background: `${colors[i % colors.length]}20`,
                                            color: colors[i % colors.length],
                                        }}
                                    >
                                        {p.First_Name[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                                            {p.First_Name}
                                        </p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Age {p.Age}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
