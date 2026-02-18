import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { ChefHat, Clock, BarChart3, CheckCircle2, XCircle, ShoppingCart, Eye } from 'lucide-react';

export default function Recipes() {
    const { recipes, checkRecipeStock, addMissingIngredientsToList } = useApp();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const diffColors = {
        Easy: { bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
        Medium: { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
        Hard: { bg: 'rgba(244,63,94,0.15)', text: '#f43f5e' },
    };

    const openDetail = (recipe) => {
        setSelectedRecipe(recipe);
        setShowDetail(true);
    };

    const handleAddMissing = (recipeId) => {
        addMissingIngredientsToList(recipeId);
    };

    const getStockSummary = (recipeId) => {
        const check = checkRecipeStock(recipeId);
        const inStock = check.filter(c => c.inStock).length;
        return { inStock, total: check.length, allGood: inStock === check.length };
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold gradient-text">Recipe Book</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    Browse recipes and check ingredient availability
                </p>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map(recipe => {
                    const summary = getStockSummary(recipe.ID);
                    const dc = diffColors[recipe.Difficulty] || diffColors.Medium;
                    return (
                        <div key={recipe.ID} className="glass-card p-5 flex flex-col gap-4 group cursor-pointer" onClick={() => openDetail(recipe)}>
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center rounded-xl"
                                        style={{ width: 44, height: 44, background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))' }}
                                    >
                                        <ChefHat size={20} style={{ color: '#a78bfa' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {recipe.Name}
                                        </h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className="badge" style={{ background: dc.bg, color: dc.text }}>{recipe.Difficulty}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    <Clock size={13} />
                                    {recipe.Prep_Time} min
                                </div>
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    <BarChart3 size={13} />
                                    {summary.total} ingredients
                                </div>
                            </div>

                            {/* Stock Check */}
                            <div
                                className="flex items-center justify-between p-3 rounded-xl"
                                style={{
                                    background: summary.allGood ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                                    border: `1px solid ${summary.allGood ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}`,
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {summary.allGood ? (
                                        <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                                    ) : (
                                        <XCircle size={16} style={{ color: '#f59e0b' }} />
                                    )}
                                    <span className="text-xs font-medium" style={{ color: summary.allGood ? '#10b981' : '#f59e0b' }}>
                                        {summary.allGood ? 'All in stock' : `${summary.inStock}/${summary.total} in stock`}
                                    </span>
                                </div>
                                {!summary.allGood && (
                                    <button
                                        className="text-xs font-medium px-2 py-1 rounded-lg"
                                        style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}
                                        onClick={(e) => { e.stopPropagation(); handleAddMissing(recipe.ID); }}
                                    >
                                        <ShoppingCart size={12} className="inline mr-1" />
                                        Add Missing
                                    </button>
                                )}
                            </div>

                            {/* View button */}
                            <div className="flex justify-end">
                                <span className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent-blue)' }}>
                                    <Eye size={13} /> View details
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Detail Modal */}
            <Modal open={showDetail} onClose={() => setShowDetail(false)} title={selectedRecipe?.Name || 'Recipe'}>
                {selectedRecipe && (() => {
                    const check = checkRecipeStock(selectedRecipe.ID);
                    return (
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="badge" style={{ ...diffColors[selectedRecipe.Difficulty] }}>{selectedRecipe.Difficulty}</span>
                                <span className="badge" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>
                                    <Clock size={12} className="mr-1" /> {selectedRecipe.Prep_Time} min
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Ingredients & Stock Check</h3>
                            <div className="space-y-2">
                                {check.map((c, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 rounded-xl"
                                        style={{ background: 'var(--color-dark-600)', border: '1px solid var(--color-glass-border)' }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {c.inStock ? (
                                                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                                            ) : (
                                                <XCircle size={16} style={{ color: '#f43f5e' }} />
                                            )}
                                            <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                                {c.item?.Name || 'Unknown'}
                                            </span>
                                        </div>
                                        <div className="text-right text-xs">
                                            <span style={{ color: 'var(--color-text-muted)' }}>Need: {c.required}</span>
                                            <span className="mx-2" style={{ color: 'var(--color-glass-border)' }}>|</span>
                                            <span style={{ color: c.inStock ? '#10b981' : '#f43f5e' }}>
                                                Have: {c.currentQty}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn-primary w-full justify-center"
                                onClick={() => { handleAddMissing(selectedRecipe.ID); setShowDetail(false); }}
                            >
                                <ShoppingCart size={16} /> Add Missing to Shopping List
                            </button>
                        </div>
                    );
                })()}
            </Modal>
        </div>
    );
}
