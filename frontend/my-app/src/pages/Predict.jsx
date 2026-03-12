import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MdUploadFile, MdMedicalServices, MdAnalytics, MdErrorOutline, MdHistory, MdArrowBack } from 'react-icons/md';

// Purana diseaseInfo object hata kar ye naya wala daal dein:
const diseaseInfo = {
    Acne: { desc: "Pimples and blackheads on the skin.", symptoms: "Red bumps, whiteheads.", treatments: "Salicylic acid, topical creams." },
    Actinic_Keratosis: { desc: "Precancerous rough, scaly patch on skin.", symptoms: "Rough, dry or scaly patch of skin.", treatments: "Cryotherapy, topical creams." },
    Benign_tumors: { desc: "Non-cancerous skin growths.", symptoms: "Lumps on skin.", treatments: "Observation or surgical removal." },
    Bullous: { desc: "A group of rare skin diseases causing blisters.", symptoms: "Fluid-filled blisters.", treatments: "Corticosteroids." },
    Candidiasis: { desc: "A fungal infection caused by a yeast.", symptoms: "Red rash, itching.", treatments: "Antifungal creams." },
    DrugEruption: { desc: "Skin reaction caused by a medication.", symptoms: "Red spots, hives.", treatments: "Stop medication, antihistamines." },
    Eczema: { desc: "Condition that makes skin red and itchy.", symptoms: "Dry skin, severe itching.", treatments: "Moisturizers, steroid creams." },
    Infestations_Bites: { desc: "Skin reaction from insect bites or parasites.", symptoms: "Itching, redness, swelling.", treatments: "Anti-itch creams, pest removal." },
    Lichen: { desc: "Inflammatory skin condition.", symptoms: "Purplish, itchy, flat bumps.", treatments: "Topical steroids, light therapy." },
    Lupus: { desc: "Autoimmune disease affecting the skin.", symptoms: "Butterfly rash on face.", treatments: "Sun protection, immunosuppressants." },
    Moles: { desc: "Common skin growths.", symptoms: "Dark spots on skin.", treatments: "Usually none, unless changing shape/color." },
    Psoriasis: { desc: "Skin disease causing red, scaly patches.", symptoms: "Thick red patches with silver scales.", treatments: "Topical treatments, light therapy." },
    Rosacea: { desc: "Condition causing redness and visible blood vessels.", symptoms: "Facial redness, swollen red bumps.", treatments: "Antibiotics, anti-acne meds." },
    Seborrh_Keratoses: { desc: "Noncancerous skin growth in older adults.", symptoms: "Waxy, elevated skin growths.", treatments: "None usually required, removal if irritated." },
    SkinCancer: { desc: "Abnormal growth of skin cells.", symptoms: "New or changing skin lesions.", treatments: "Surgery, radiation." },
    Sun_Sunlight_Damage: { desc: "Skin damage from excessive UV exposure.", symptoms: "Sunburn, peeling, premature aging.", treatments: "Aloe vera, moisturizers, prevention with SPF." },
    Tinea: { desc: "Fungal infection of the skin (Ringworm).", symptoms: "Ring-shaped red rash.", treatments: "Antifungal medications." },
    Unknown_Normal: { desc: "Healthy skin or condition not identified.", symptoms: "None.", treatments: "Maintain good hygiene." },
    Vascular_Tumors: { desc: "Tumors made of blood vessels.", symptoms: "Red or purple lumps.", treatments: "Laser therapy, surgery." },
    Vasculitis: { desc: "Inflammation of the blood vessels.", symptoms: "Purple spots, skin ulcers.", treatments: "Steroids, immunosuppressants." },
    Vitiligo: { desc: "Loss of skin pigment.", symptoms: "White patches on skin.", treatments: "Light therapy, topical creams." },
    Warts: { desc: "Small, fleshy bump on the skin or mucous membrane.", symptoms: "Rough bumps.", treatments: "Freezing (cryotherapy), salicylic acid." }
};

const Predict = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setResult(null);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return setError('Select an image');
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:4000/api/predict', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setResult(res.data);
        } catch (err) { setError('Analysis failed'); }
        finally { setLoading(false); }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8 flex items-center"><MdMedicalServices className="mr-3 text-emerald-600"/> AI Skin Scan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <form onSubmit={handleUpload} className="space-y-6 bg-white p-8 rounded-3xl shadow-xl">
                    <input type="file" onChange={handleFileChange} className="mb-4" />
                    {preview && <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />}
                    <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold">
                        {loading ? 'Analyzing...' : 'Run Diagnosis'}
                    </button>
                </form>

                {result && (
                    <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-500">
                        <h3 className="text-2xl font-black mb-4">{result.disease}</h3>
                        <p className="text-emerald-700 font-bold mb-6">{(result.confidence * 100).toFixed(1)}% Confidence</p>
                        <div className="flex space-x-4">
                            <Link to="/history" className="bg-blue-600 text-white p-3 rounded-xl flex items-center"><MdHistory className="mr-2"/> History</Link>
                            <button onClick={() => window.location.reload()} className="bg-gray-200 p-3 rounded-xl flex items-center"><MdArrowBack className="mr-2"/> Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Predict;