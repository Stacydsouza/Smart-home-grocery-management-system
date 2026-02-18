import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { ShoppingCart, Plus, Check, Circle, ListPlus, Package, Trash2 } from 'lucide-react';

export default function ShoppingList() {
    const { shopItems, items, recipes, getItem, addShoppingItem, toggleShoppingItem, removeShoppingItem, addMissingIngredientsToList } = useApp();
    const [showAddItem, setShowAddItem] = useState(false);
    const [showRecipePick, setShowRecipePick] = useState(false);
    const [addForm, setAddForm] = useState({ Item_ID: '' });

    const pendingItems = shopItems.filter(si => si.Status === 'pending');
    const purchasedItems = shopItems.filter(si => si.Status === 'purchased');
    const totalCount = shopItems.length;

    const handleAddItem = (e) => {
        e.preventDefault();
        if (addForm.Item_ID) {
            addShoppingItem(parseInt(addForm.Item_ID));
            setAddForm({ Item_ID: '' });
            setShowAddItem(false);
        }
    };

    const handleAddFromRecipe = (recipeId) => {
        addMissingIngredientsToList(recipeId);
        setShowRecipePick(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold gradient-text">Shopping List</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        Manage your grocery shopping list
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Actions */}
                <div className="flex gap-2">
                    <button className="btn-primary" onClick={() => setShowAddItem(true)}>
                        <Plus size={16} /> Add Item
                    </button>
                    <button className="btn-secondary" onClick={() => setShowRecipePick(true)}>
                        <ListPlus size={16} /> From Recipe
                    </button>
                </div>

                {/* Summary */}
                <div className="glass-card p-4 flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{totalCount}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Total</p>
                    </div>
                    <div className="h-8 w-px" style={{ background: 'var(--color-glass-border)' }} />
                    <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#f59e0b' }}>{pendingItems.length}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Pending</p>
                    </div>
                    <div className="h-8 w-px" style={{ background: 'var(--color-glass-border)' }} />
                    <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#10b981' }}>{purchasedItems.length}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Purchased</p>
                    </div>
                    {totalCount > 0 && (
                        <>
                            <div className="h-8 w-px" style={{ background: 'var(--color-glass-border)' }} />
                            <div className="flex-1">
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-dark-600)' }}>
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${(purchasedItems.length / totalCount) * 100}%`,
                                            background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Pending */}
                {pendingItems.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                            <Circle size={14} style={{ color: '#f59e0b' }} /> Pending ({pendingItems.length})
                        </h3>
                        <div className="space-y-2">
                            {pendingItems.map(si => {
                                const item = getItem(si.Item_ID);
                                return (
                                    <div
                                        key={si.ID}
                                        className="glass-card p-4 flex items-center justify-between cursor-pointer group"
                                        onClick={() => toggleShoppingItem(si.ID, si.Status)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors hover:bg-white/5"
                                                style={{ borderColor: 'var(--color-text-muted)' }}
                                            />
                                            <div>
                                                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item?.Name}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item?.Brand}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeShoppingItem(si.ID); }}
                                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                                            style={{ color: 'var(--color-accent-rose)' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Purchased */}
                {purchasedItems.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                            <Check size={14} style={{ color: '#10b981' }} /> Purchased ({purchasedItems.length})
                        </h3>
                        <div className="space-y-2">
                            {purchasedItems.map(si => {
                                const item = getItem(si.Item_ID);
                                return (
                                    <div
                                        key={si.ID}
                                        className="glass-card p-4 flex items-center justify-between opacity-60 cursor-pointer group"
                                        onClick={() => toggleShoppingItem(si.ID, si.Status)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{ background: 'rgba(16,185,129,0.3)' }}
                                            >
                                                <Check size={12} color="#10b981" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium line-through" style={{ color: 'var(--color-text-secondary)' }}>{item?.Name}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item?.Brand}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeShoppingItem(si.ID); }}
                                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                                            style={{ color: 'var(--color-accent-rose)' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {totalCount === 0 && (
                    <div className="glass-card p-12 text-center">
                        <Package size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Your shopping list is empty.</p>
                    </div>
                )}
            </div>

            {/* Add Item Modal */}
            <Modal open={showAddItem} onClose={() => setShowAddItem(false)} title="Add Item to List">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Item</label>
                        <select className="form-select" required value={addForm.Item_ID} onChange={e => setAddForm({ Item_ID: e.target.value })}>
                            <option value="">Select item...</option>
                            {items.map(i => <option key={i.ID} value={i.ID}>{i.Name} ({i.Brand})</option>)}
                        </select>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">Add to List</button>
                </form>
            </Modal>

            {/* Recipe Picker Modal */}
            <Modal open={showRecipePick} onClose={() => setShowRecipePick(false)} title="Add Missing Ingredients from Recipe">
                <div className="space-y-2">
                    {recipes.map(r => (
                        <button
                            key={r.ID}
                            className="w-full text-left p-3 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
                            style={{ background: 'var(--color-dark-600)', border: '1px solid var(--color-glass-border)' }}
                            onClick={() => handleAddFromRecipe(r.ID)}
                        >
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.Name}</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{r.Prep_Time} min</span>
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
}
