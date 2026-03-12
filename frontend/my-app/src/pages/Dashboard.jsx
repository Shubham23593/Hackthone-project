import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MdHealthAndSafety, 
  MdAnalytics, 
  MdUploadFile,
  MdHistory,
  MdArrowForward 
} from 'react-icons/md';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalPredictions: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        // Fetch user history to calculate basic stats
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/predict/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setStats({ totalPredictions: res.data.length });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600 font-medium">Loading your medical dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="text-center mb-12">
                    {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-blue-100 mb-6">
                        <MdHealthAndSafety className="w-6 h-6 text-blue-600 mr-2" />
                        <span className="text-lg font-semibold text-gray-800">DermaCare AI - Medical Dashboard</span>
                    </div> */}
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
                            Welcome Back, user  
                        </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Monitor your skin condition predictions and access AI-powered diagnostics instantly.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Prediction Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                <MdUploadFile className="w-8 h-8 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                <MdArrowForward className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">New Diagnosis</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Upload skin lesion images for instant AI-powered analysis and professional medical insights.
                        </p>
                        <Link 
                            to="/predict" 
                            className="group/btn inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Start New Prediction
                            <MdArrowForward className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
                        </Link>
                    </div>

                    {/* Activity Stats Card */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8">
                        <div className="flex items-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg mr-4">
                                <MdAnalytics className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Prediction Activity</h3>
                                <p className="text-green-700 font-medium">Your diagnostic history</p>
                            </div>
                        </div>
                        <div className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                            {stats.totalPredictions}
                        </div>
                        <p className="text-2xl text-gray-600 mb-8">Total AI Predictions Completed</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link 
                                to="/history" 
                                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-gray-900 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                            >
                                <MdHistory className="w-5 h-5 mr-2" />
                                View Full History
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 text-center">
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Powered by advanced AI dermatology models for accurate skin condition analysis. 
                        All predictions are securely stored for your medical records.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
