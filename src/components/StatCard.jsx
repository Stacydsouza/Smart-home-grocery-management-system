import React from 'react';

export default function StatCard({ icon: Icon, label, value, color, sub }) {
    return (
        <div className="glass-card glow-border p-5 flex items-start gap-4">
            <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{
                    width: 48, height: 48,
                    background: `${color}18`,
                }}
            >
                <Icon size={22} style={{ color }} />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
                    {label}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {value}
                </p>
                {sub && (
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{sub}</p>
                )}
            </div>
        </div>
    );
}
