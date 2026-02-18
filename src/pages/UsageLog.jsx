import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardList, Plus, User, Package, Calendar, Hash } from 'lucide-react';

export default function UsageLog() {
    const { logs, items, persons, getItem, getPerson, addLog } = useApp();
    const [form, setForm] = useState({
        Item_ID: '', Person_ID: '', Used_Quantity: '1',
        Used_Date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addLog({
            Item_ID: parseInt(form.Item_ID),
            Person_ID: parseInt(form.Person_ID),
            Used_Quantity: parseInt(form.Used_Quantity),
            Used_Date: form.Used_Date,
        });
        setForm({ ...form, Item_ID: '', Used_Quantity: '1' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold gradient-text">Usage Log</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    Track item usage by household members
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Log Form */}
                <div className="glass-card p-5 lg:col-span-1">
                    <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                        <Plus size={16} style={{ color: 'var(--color-accent-blue)' }} /> Log Usage
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                <User size={12} /> Person
                            </label>
                            <select className="form-select" required value={form.Person_ID}
                                onChange={e => setForm({ ...form, Person_ID: e.target.value })}>
                                <option value="">Select member...</option>
                                {persons.map(p => (
                                    <option key={p.Person_ID} value={p.Person_ID}>{p.First_Name} {p.Last_Name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                <Package size={12} /> Item
                            </label>
                            <select className="form-select" required value={form.Item_ID}
                                onChange={e => setForm({ ...form, Item_ID: e.target.value })}>
                                <option value="">Select item...</option>
                                {items.map(i => (
                                    <option key={i.ID} value={i.ID}>{i.Name} ({i.Brand})</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                    <Hash size={12} /> Quantity
                                </label>
                                <input className="form-input" type="number" min="1" required
                                    value={form.Used_Quantity}
                                    onChange={e => setForm({ ...form, Used_Quantity: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                    <Calendar size={12} /> Date
                                </label>
                                <input className="form-input" type="date" required value={form.Used_Date}
                                    onChange={e => setForm({ ...form, Used_Date: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full justify-center">
                            <ClipboardList size={16} /> Log Usage
                        </button>
                    </form>
                </div>

                {/* Logs Table */}
                <div className="glass-card p-5 lg:col-span-2">
                    <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                        <ClipboardList size={16} style={{ color: 'var(--color-accent-cyan)' }} /> All Usage Logs
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr><th>#</th><th>Item</th><th>Used By</th><th>Qty</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                {logs.map(log => {
                                    const item = getItem(log.Item_ID);
                                    const person = getPerson(log.Person_ID);
                                    return (
                                        <tr key={log.Log_ID}>
                                            <td style={{ color: 'var(--color-text-muted)' }}>{log.Log_ID}</td>
                                            <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{item?.Name}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center rounded-full text-xs font-bold"
                                                        style={{ width: 24, height: 24, background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>
                                                        {person?.First_Name?.[0]}
                                                    </div>
                                                    {person ? `${person.First_Name} ${person.Last_Name}` : '—'}
                                                </div>
                                            </td>
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
        </div>
    );
}
