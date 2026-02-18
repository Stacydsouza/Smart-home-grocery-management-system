import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import UsageLog from './pages/UsageLog';
import Storage from './pages/Storage';
import Users from './pages/Users';

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/shopping" element={<ShoppingList />} />
                <Route path="/usage" element={<UsageLog />} />
                <Route path="/storage" element={<Storage />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}
