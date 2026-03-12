import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MdHistory, MdMedicalServices, MdErrorOutline, MdUploadFile } from 'react-icons/md';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/');
            try {
                const res = await axios.get('http://localhost:4000/api/predict/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setHistory(res.data);
            } catch (err) { console.log(err); }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, [navigate]);

    if (loading) return <div className="p-20 text-center">Loading Records...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-black mb-10 flex items-center"><MdHistory className="mr-4 text-blue-600"/> Patient Records</h1>
            {history.length === 0 ? (
                <div className="text-center p-20 bg-white rounded-3xl shadow">
                    <p className="mb-6">No history found.</p>
                    <Link to="/predict" className="bg-blue-600 text-white p-4 rounded-2xl font-bold inline-flex items-center"><MdUploadFile className="mr-2"/> New Scan</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {history.map((item) => (
                        <div key={item._id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            <img src={`http://localhost:4000/${item.imagePath}`} className="w-full h-48 object-cover" alt="Scan" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold uppercase">{item.predictedDisease}</h3>
                                <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;