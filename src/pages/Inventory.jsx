import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Search, Plus, Trash2, Filter } from 'lucide-react';

export default function Inventory() {
    const { items, stock, locations, addItem, addStock, deleteItem, deleteStock, getItem, getLocation } = useApp();
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');
    const [showAdd, setShowAdd] = useState(false);

    // Form state
    const [form, setForm] = useState({ Name: '', Brand: '', Category: 'Dairy', Alt_Brand: '' });
    const [stockForm, setStockForm] = useState({ Item_ID: '', Storage_ID: '1', Stock_Qty: '1', Days_Left: '7', Expiry_Date: '' });
    const [showStockAdd, setShowStockAdd] = useState(false);

    const categories = useMemo(() => {
        const cats = [...new Set(items.map(i => i.Category))];
        return ['All', ...cats.sort()];
    }, [items]);

    const enrichedStock = useMemo(() => {
        return stock.map(s => {
            const item = getItem(s.Item_ID);
            const loc = getLocation(s.Storage_ID);
            return { ...s, item, location: loc };
        }).filter(s => s.item);
    }, [stock, getItem, getLocation]);

    const filtered = useMemo(() => {
        return enrichedStock.filter(s => {
            const matchSearch = s.item.Name.toLowerCase().includes(search.toLowerCase()) ||
                s.item.Brand.toLowerCase().includes(search.toLowerCase());
            const matchCat = catFilter === 'All' || s.item.Category === catFilter;
            return matchSearch && matchCat;
        });
    }, [enrichedStock, search, catFilter]);

    const handleAddItem = (e) => {
        e.preventDefault();
        addItem(form);
        setForm({ Name: '', Brand: '', Category: 'Dairy', Alt_Brand: '' });
        setShowAdd(false);
    };

    const handleAddStock = (e) => {
        e.preventDefault();
        addStock({
            Item_ID: parseInt(stockForm.Item_ID),
            Storage_ID: parseInt(stockForm.Storage_ID),
            Stock_Qty: parseInt(stockForm.Stock_Qty),
            Days_Left: parseInt(stockForm.Days_Left),
            Expiry_Date: stockForm.Expiry_Date,
        });
        setStockForm({ Item_ID: '', Storage_ID: '1', Stock_Qty: '1', Days_Left: '7', Expiry_Date: '' });
        setShowStockAdd(false);
    };

    const getExpiryColor = (days) => {
        if (days <= 0) return { bg: 'rgba(244,63,94,0.15)', text: '#f43f5e' };
        if (days <= 3) return { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' };
        if (days <= 7) return { bg: 'rgba(6,182,212,0.15)', text: '#06b6d4' };
        return { bg: 'rgba(16,185,129,0.15)', text: '#10b981' };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold gradient-text">Inventory</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        Track all items, their storage, and expiry
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-primary" onClick={() => setShowAdd(true)}>
                        <Plus size={16} /> Add Item
                    </button>
                    <button className="btn-secondary" onClick={() => setShowStockAdd(true)}>
                        <Plus size={16} /> Add Stock
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        className="form-input"
                        style={{ paddingLeft: 36 }}
                        placeholder="Search items..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={16} style={{ color: 'var(--color-text-muted)' }} />
                    <select className="form-select" style={{ width: 'auto', minWidth: 140 }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Temp</th>
                            <th>Qty</th>
                            <th>Days Left</th>
                            <th>Expiry</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>No items found</td></tr>
                        ) : (
                            filtered.map(s => {
                                const c = getExpiryColor(s.Days_Left);
                                return (
                                    <tr key={s.ID}>
                                        <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.item.Name}</td>
                                        <td>{s.item.Brand}</td>
                                        <td>
                                            <span className="badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                                                {s.item.Category}
                                            </span>
                                        </td>
                                        <td>{s.location?.Location_Name}</td>
                                        <td style={{ color: 'var(--color-accent-cyan)' }}>{s.location?.Temperature}°C</td>
                                        <td>{s.Stock_Qty}</td>
                                        <td>
                                            <span className="badge" style={{ background: c.bg, color: c.text }}>
                                                {s.Days_Left <= 0 ? 'Expired' : `${s.Days_Left}d`}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.8rem' }}>{s.Expiry_Date}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteStock(s.ID)}
                                                className="p-1.5 rounded-lg hover:bg-white/10"
                                                style={{ color: 'var(--color-accent-rose)' }}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Item Modal */}
            <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Item">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Name</label>
                        <input className="form-input" required value={form.Name} onChange={e => setForm({ ...form, Name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Brand</label>
                            <input className="form-input" required value={form.Brand} onChange={e => setForm({ ...form, Brand: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Category</label>
                            <select className="form-select" value={form.Category} onChange={e => setForm({ ...form, Category: e.target.value })}>
                                {['Dairy', 'Meat', 'Grains', 'Oils', 'Vegetables', 'Spices', 'Bakery', 'Fruits', 'Frozen'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Alt Brand (opt.)</label>
                        <input className="form-input" value={form.Alt_Brand} onChange={e => setForm({ ...form, Alt_Brand: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">Add Item</button>
                </form>
            </Modal>

            {/* Add Stock Modal */}
            <Modal open={showStockAdd} onClose={() => setShowStockAdd(false)} title="Add Stock Entry">
                <form onSubmit={handleAddStock} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Item</label>
                        <select className="form-select" required value={stockForm.Item_ID} onChange={e => setStockForm({ ...stockForm, Item_ID: e.target.value })}>
                            <option value="">Select item...</option>
                            {items.map(i => <option key={i.ID} value={i.ID}>{i.Name} ({i.Brand})</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Storage Location</label>
                        <select className="form-select" value={stockForm.Storage_ID} onChange={e => setStockForm({ ...stockForm, Storage_ID: e.target.value })}>
                            {locations.map(l => <option key={l.ID} value={l.ID}>{l.Location_Name} ({l.Temperature}°C)</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Quantity</label>
                            <input className="form-input" type="number" min="1" required value={stockForm.Stock_Qty} onChange={e => setStockForm({ ...stockForm, Stock_Qty: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Days Until Expiry</label>
                            <input className="form-input" type="number" min="0" required value={stockForm.Days_Left} onChange={e => setStockForm({ ...stockForm, Days_Left: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Expiry Date</label>
                        <input className="form-input" type="date" required value={stockForm.Expiry_Date} onChange={e => setStockForm({ ...stockForm, Expiry_Date: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">Add Stock</button>
                </form>
            </Modal>
        </div>
    );
}
