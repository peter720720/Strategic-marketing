import React, { useState } from 'react';

export default function AdminUpload() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files) {
            setSelectedImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || selectedImages.length === 0) {
            setAlertMessage('Please input item specifications and pick asset photos.');
            setShowAlert(true);
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        selectedImages.forEach((img) => formData.append('images', img));

        try {
            const res = await fetch('http://localhost:5000/api/products/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setAlertMessage('Product Uploaded Successfully!');
                setName(''); setPrice(''); setSelectedImages([]);
            } else {
                setAlertMessage(`Upload Error: ${data.message}`);
            }
        } catch {
            setAlertMessage('Server connectivity lost.');
        } finally {
            setLoading(false);
            setShowAlert(true);
        }
    };

    return (
        <div className="min-h-[80vh] p-6 flex items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-black mb-6 tracking-tight text-center sm:text-left">Upload Store Asset</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Product Identity Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Price Amount</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Amount Value" className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Multi-Image Selection</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-600 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:opacity-90 cursor-pointer" />
                        {selectedImages.length > 0 && <p className="text-[11px] text-blue-500 font-bold mt-2">📂 Ready to push: {selectedImages.length} items.</p>}
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50">
                        {loading ? 'Processing Cloud Uploads...' : 'Publish Item'}
                    </button>
                </form>
            </div>

            {/* MID-POP ALERT OVERLAY MODAL WINDOW */}
            {showAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-center animate-scale-up">
                        <h3 className="text-base font-bold mb-2">Notification</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-semibold leading-relaxed">{alertMessage}</p>
                        <button onClick={() => setShowAlert(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md">
                            Okay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
