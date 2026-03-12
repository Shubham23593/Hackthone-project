import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MdHealthAndSafety, MdPersonAdd, MdEmail, MdLockOutline, 
  MdAppRegistration, MdErrorOutline, MdLogin 
} from 'react-icons/md';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
        if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const valErrors = validateForm();
        if (Object.keys(valErrors).length > 0) { setErrors(valErrors); return; }

        setLoading(true);
        try {
            await axios.post('http://localhost:4000/api/auth/register', formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setErrors({ server: err.response?.data?.message || 'Registration failed' });
        } finally { setLoading(false); }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    if (success) return <div className="p-20 text-center text-2xl font-bold">Registration Successful! Redirecting...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-black mb-6 text-center">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}
                    <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-4 border rounded-2xl" />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-4 border rounded-2xl" />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-4 border rounded-2xl" />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-4 border rounded-2xl" />
                    <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold">
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/" className="text-blue-600 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;