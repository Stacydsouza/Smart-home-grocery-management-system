import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Users as UsersIcon, Plus, Trash2, Phone, MapPin } from 'lucide-react';

export default function Users() {
    const { persons, addPerson, deletePerson } = useApp();
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({
        First_Name: '', Last_Name: '', Location: '', Age: '', Phone_No: '',
    });

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4'];

    const handleSubmit = (e) => {
        e.preventDefault();
        addPerson({ ...form, Age: parseInt(form.Age) });
        setForm({ First_Name: '', Last_Name: '', Location: '', Age: '', Phone_No: '' });
        setShowAdd(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold gradient-text">Household Members</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        Manage people in your household
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {persons.map((p, i) => (
                    <div key={p.Person_ID} className="glass-card p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center rounded-full text-lg font-bold"
                                    style={{
                                        width: 48, height: 48,
                                        background: `${colors[i % colors.length]}20`,
                                        color: colors[i % colors.length],
                                    }}>
                                    {p.First_Name[0]}{p.Last_Name[0]}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {p.First_Name} {p.Last_Name}
                                    </h3>
                                    <span className="badge mt-1" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                                        Age {p.Age}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => deletePerson(p.Person_ID)}
                                className="p-1.5 rounded-lg hover:bg-white/10"
                                style={{ color: 'var(--color-accent-rose)' }}>
                                <Trash2 size={15} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                <MapPin size={13} style={{ color: 'var(--color-text-muted)' }} />
                                {p.Location}
                            </div>
                            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                <Phone size={13} style={{ color: 'var(--color-text-muted)' }} />
                                {p.Phone_No}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Household Member">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>First Name</label>
                            <input className="form-input" required value={form.First_Name}
                                onChange={e => setForm({ ...form, First_Name: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Last Name</label>
                            <input className="form-input" required value={form.Last_Name}
                                onChange={e => setForm({ ...form, Last_Name: e.target.value })} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Location</label>
                            <input className="form-input" required value={form.Location}
                                onChange={e => setForm({ ...form, Location: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Age</label>
                            <input className="form-input" type="number" min="1" required value={form.Age}
                                onChange={e => setForm({ ...form, Age: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Phone</label>
                        <input className="form-input" required value={form.Phone_No}
                            onChange={e => setForm({ ...form, Phone_No: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">Add Member</button>
                </form>
            </Modal>
        </div>
    );
}
