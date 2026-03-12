import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLockOutline, MdLogin, MdErrorOutline, MdHealthAndSafety } from 'react-icons/md';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.user.name);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <MdHealthAndSafety className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h2 className="text-3xl font-black">Doctor Login</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <div className="text-red-600 text-sm flex items-center"><MdErrorOutline className="mr-2"/> {error}</div>}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border rounded-2xl" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border rounded-2xl" required />
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center">
                        <MdLogin className="mr-2" /> {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    New? <Link to="/register" className="text-emerald-600 font-bold">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;