import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdHealthAndSafety, 
  MdDashboard, 
  MdUploadFile, 
  MdHistory,
  MdLogin,
  MdAppRegistration,
  MdLogout
} from 'react-icons/md';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 shadow-2xl border-b-4 border-blue-200/30 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo - Medical Branding */}
                    <Link to={token ? "/dashboard" : "/"} className="flex items-center space-x-3 group">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                            <MdHealthAndSafety className="w-8 h-8 text-blue-200 group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-lg">
                                DermaCare AI
                            </h1>
                            <p className="text-xs md:text-sm text-blue-100/80 font-medium tracking-wider uppercase">
                                Medical Intelligence
                            </p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {token ? (
                            <>
                                <Link 
                                    to="/dashboard" 
                                    className="group relative px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 font-semibold text-white hover:text-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    title="Dashboard"
                                >
                                    <MdDashboard className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                                    <span>Dashboard</span>
                                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full group-hover:w-8 transition-all duration-300"></span>
                                </Link>

                                <Link 
                                    to="/predict" 
                                    className="group relative px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 font-semibold text-white hover:text-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    title="New Prediction"
                                >
                                    <MdUploadFile className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span>New Prediction</span>
                                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full group-hover:w-8 transition-all duration-300"></span>
                                </Link>

                                <Link 
                                    to="/history" 
                                    className="group relative px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 font-semibold text-white hover:text-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    title="History"
                                >
                                    <MdHistory className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <span>History</span>
                                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-hover:w-8 transition-all duration-300"></span>
                                </Link>

                                <button 
                                    onClick={handleLogout}
                                    className="group relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-rose-700 hover:-translate-y-1 transition-all duration-300 border border-red-400/50 flex items-center space-x-2 ml-2"
                                    title="Logout"
                                >
                                    <MdLogout className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/" 
                                    className="group relative px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 font-semibold text-white hover:text-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    <MdLogin className="w-5 h-5" />
                                    <span>Login</span>
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="group relative px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 border border-emerald-400/50"
                                >
                                    <MdAppRegistration className="w-5 h-5" />
                                    <span>Register</span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
