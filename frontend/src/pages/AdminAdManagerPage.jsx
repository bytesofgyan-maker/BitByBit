import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, Plus, Megaphone, Palette, Link as LinkIcon, Save, Loader2 } from 'lucide-react';

const AdminAdManagerPage = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '',
        description: '',
        button_text: 'Explore',
        link: '/register',
        bg_gradient_from: 'blue-600',
        bg_gradient_to: 'purple-600'
    });

    const fetchBanners = async () => {
        try {
            const res = await api.get('banners/');
            setBanners(res.data);
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    useEffect(() => { fetchBanners(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this banner?")) return;
        try {
            await api.delete(`banners/${id}/`);
            fetchBanners();
        } catch (err) { alert("Failed to delete"); }
    };

    const handleCreate = async () => {
        if (!form.title) return alert("Title is required");
        try {
            await api.post('banners/', form);
            alert("Banner Created!");
            fetchBanners();
            setForm({ ...form, title: '', description: '' }); // Reset main fields
        } catch (err) { alert("Failed to create"); }
    };

    // Helper for color selection
    const colors = ["blue-600", "purple-600", "emerald-600", "orange-500", "red-600", "slate-800"];

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Megaphone className="text-yellow-400"/> Ad Banner Manager
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* CREATION FORM */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus className="text-green-400"/> Create New Ad
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Headline</label>
                                <input 
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 mt-1 text-white"
                                    placeholder="e.g. New Batch Starting!"
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Subtext</label>
                                <textarea 
                                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 mt-1 text-white"
                                    placeholder="e.g. Join 5000+ students..."
                                    value={form.description}
                                    onChange={e => setForm({...form, description: e.target.value})}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Button Text</label>
                                    <input 
                                        className="w-full bg-slate-900 border border-slate-600 rounded p-2 mt-1"
                                        value={form.button_text}
                                        onChange={e => setForm({...form, button_text: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Link URL</label>
                                    <div className="flex items-center bg-slate-900 border border-slate-600 rounded mt-1">
                                        <LinkIcon size={14} className="ml-2 text-slate-500"/>
                                        <input 
                                            className="w-full bg-transparent p-2 outline-none"
                                            value={form.link}
                                            onChange={e => setForm({...form, link: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase flex gap-2 items-center mb-2">
                                    <Palette size={14}/> Theme Color (Gradient Start)
                                </label>
                                <div className="flex gap-2">
                                    {colors.map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setForm({...form, bg_gradient_from: c})}
                                            className={`w-8 h-8 rounded-full bg-${c} border-2 ${form.bg_gradient_from === c ? 'border-white' : 'border-transparent'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button onClick={handleCreate} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold mt-4 flex justify-center items-center gap-2">
                                <Save size={18}/> Publish Ad
                            </button>
                        </div>
                    </div>

                    {/* LIVE PREVIEW LIST */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Active Banners ({banners.length})</h2>
                        {loading ? <Loader2 className="animate-spin"/> : banners.map(banner => (
                            <div key={banner.id} className={`p-5 rounded-xl bg-gradient-to-r from-${banner.bg_gradient_from} to-${banner.bg_gradient_to} relative overflow-hidden group`}>
                                <div className="relative z-10">
                                    <h3 className="font-bold text-lg">{banner.title}</h3>
                                    <p className="text-white/80 text-sm mt-1">{banner.description}</p>
                                    <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded text-xs font-bold backdrop-blur-sm">
                                        {banner.button_text} {'->'} {banner.link}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(banner.id)}
                                    className="absolute top-2 right-2 bg-black/20 hover:bg-red-500 p-2 rounded-full text-white/70 hover:text-white transition-colors"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        ))}
                        {banners.length === 0 && <p className="text-slate-500 italic">No ads running. The carousel will be hidden.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAdManagerPage;