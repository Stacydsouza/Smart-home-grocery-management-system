import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Package, BookOpen, ShoppingCart,
    ClipboardList, Warehouse, Users, ChefHat, Menu, X
} from 'lucide-react';

const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/recipes', label: 'Recipes', icon: ChefHat },
    { path: '/shopping', label: 'Shopping List', icon: ShoppingCart },
    { path: '/usage', label: 'Usage Log', icon: ClipboardList },
    { path: '/storage', label: 'Storage', icon: Warehouse },
    { path: '/users', label: 'Members', icon: Users },
];

export default function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--color-dark-900)' }}>
            {/* Sidebar */}
            <aside
                className="sidebar flex flex-col border-r"
                style={{
                    width: collapsed ? 72 : 240,
                    minHeight: '100vh',
                    background: 'var(--color-dark-800)',
                    borderColor: 'var(--color-glass-border)',
                    transition: 'width 0.3s',
                    position: 'sticky',
                    top: 0,
                    zIndex: 30,
                }}
            >
                {/* Header */}
                <div className="sidebar-header flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-glass-border)' }}>
                    {!collapsed && (
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center rounded-xl"
                                style={{
                                    width: 36, height: 36,
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                }}
                            >
                                <BookOpen size={18} color="white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>GroceryIQ</h1>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Smart Home</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-white/5"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {collapsed ? <Menu size={18} /> : <X size={18} />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="sidebar-nav flex flex-col gap-1 p-3 flex-1">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            title={label}
                        >
                            <Icon size={20} />
                            {!collapsed && <span className="sidebar-label">{label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                {!collapsed && (
                    <div className="p-4" style={{ borderTop: '1px solid var(--color-glass-border)' }}>
                        <div className="glass-card p-3 text-center">
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>DBMS CIA 3 Project</p>
                            <p className="text-xs font-medium gradient-text mt-1">Smart Grocery System</p>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main
                className="main-content flex-1 overflow-auto p-6"
                style={{ minHeight: '100vh' }}
            >
                {children}
            </main>
        </div>
    );
}
