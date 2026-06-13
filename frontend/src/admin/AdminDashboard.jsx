import React, { useState, useEffect } from 'react';
import { Trash2, Plus, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Custom Confirmation Dialog State Management
    const [showConfirm, setShowConfirm] = useState(false);
    const [targetId, setTargetId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            if (data.success) setProducts(data.data);
        } catch (err) {
            console.error('Failed to load items:', err);
        } finally {
            setLoading(false);
        }
    };

    const triggerDeletePrompt = (id) => {
        setTargetId(id);
        setShowConfirm(true);
    };

    const executeDeletion = async () => {
        if (!targetId) return;
        try {
            const res = await fetch(`http://localhost:5000/api/products/${targetId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setProducts(products.filter(item => item._id !== targetId));
            }
        } catch (err) {
            console.error('Delete request failed:', err);
        } finally {
            setShowConfirm(false);
            setTargetId(null);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">

                {/* Header Action Row Layout */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and audit all dynamic store inventories natively.</p>
                    </div>
                    <Link to="/admin-upload-product" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all active:scale-95">
                        <Plus size={18} />
                        <span>Upload New Item</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 font-medium text-slate-400">Loading your catalog entries...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <LayoutGrid size={48} className="mx-auto text-slate-300 mb-3" />
                        <p className="font-semibold text-slate-400">No products found in database records.</p>
                    </div>
                ) : (
                    /* Products Inventory Layout Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                                <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                    {item.images.length > 1 && (
                                        <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                            +{item.images.length - 1} Images
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-extrabold mt-0.5">₦{item.price.toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => triggerDeletePrompt(item._id)} className="w-full inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 font-bold py-2.5 rounded-xl text-sm transition-colors">
                                        <Trash2 size={16} />
                                        <span>Delete Product</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* CENTER POPUP CONFIRMATION ALERT DIALOG MODAL */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-center">
                        <div className="mx-auto mb-4 w-12 h-12 bg-red-50 dark:bg-red-950/50 rounded-full flex items-center justify-center text-red-500 font-bold text-lg">!</div>
                        <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Do you really want to delete this product? This action cannot be reversed.</p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-colors">
                                Cancel
                            </button>
                            <button onClick={executeDeletion} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md shadow-red-500/10">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
