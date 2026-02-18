import React from 'react';
import { useApp } from '../context/AppContext';
import { Warehouse, Thermometer, Ruler, Package } from 'lucide-react';

const zoneIcons = { 'Main Fridge': '🧊', Freezer: '❄️', Pantry: '🏠', 'Spice Rack': '🌶️', 'Fruit Basket': '🍎' };
const zoneColors = {
    'Main Fridge': { from: '#3b82f6', to: '#06b6d4' },
    Freezer: { from: '#8b5cf6', to: '#3b82f6' },
    Pantry: { from: '#f59e0b', to: '#f97316' },
    'Spice Rack': { from: '#f43f5e', to: '#f59e0b' },
    'Fruit Basket': { from: '#10b981', to: '#06b6d4' },
};

export default function Storage() {
    const { locations, stock, getItem } = useApp();

    const getItemsInLocation = (locId) => {
        return stock.filter(s => s.Storage_ID === locId).map(s => ({ ...s, item: getItem(s.Item_ID) })).filter(s => s.item);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold gradient-text">Storage Management</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    Visual overview of storage zones, dimensions, and contents
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {locations.map(loc => {
                    const locItems = getItemsInLocation(loc.ID);
                    const colors = zoneColors[loc.Location_Name] || { from: '#3b82f6', to: '#8b5cf6' };
                    const icon = zoneIcons[loc.Location_Name] || '📦';

                    return (
                        <div key={loc.ID} className="glass-card overflow-hidden">
                            {/* Header with gradient */}
                            <div className="p-5 pb-4" style={{
                                background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}15)`,
                                borderBottom: `1px solid ${colors.from}20`,
                            }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{icon}</span>
                                    <div>
                                        <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {loc.Location_Name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Thermometer size={12} style={{ color: colors.from }} />
                                            <span className="text-xs font-medium" style={{ color: colors.from }}>
                                                {loc.Temperature}°C
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dimensions */}
                                <div className="flex gap-3">
                                    {[
                                        { label: 'H', val: loc.Height },
                                        { label: 'W', val: loc.Width },
                                        { label: 'D', val: loc.Depth },
                                    ].map(d => (
                                        <div key={d.label} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                                            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)' }}>
                                            <Ruler size={10} />
                                            <span className="font-medium">{d.label}</span>
                                            <span>{d.val}cm</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Items */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Package size={14} style={{ color: 'var(--color-text-muted)' }} />
                                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                        {locItems.length} item{locItems.length !== 1 ? 's' : ''} stored
                                    </span>
                                </div>
                                {locItems.length === 0 ? (
                                    <p className="text-xs text-center py-3" style={{ color: 'var(--color-text-muted)' }}>Empty</p>
                                ) : (
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {locItems.map(s => {
                                            const expColor = s.Days_Left <= 3 ? '#f43f5e' : s.Days_Left <= 7 ? '#f59e0b' : '#10b981';
                                            return (
                                                <div key={s.ID} className="flex items-center justify-between p-2 rounded-lg"
                                                    style={{ background: 'var(--color-dark-600)' }}>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                                                            {s.item.Name}
                                                        </p>
                                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Qty: {s.Stock_Qty}</p>
                                                    </div>
                                                    <span className="badge shrink-0" style={{
                                                        background: `${expColor}15`, color: expColor,
                                                    }}>
                                                        {s.Days_Left <= 0 ? 'Exp' : `${s.Days_Left}d`}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
