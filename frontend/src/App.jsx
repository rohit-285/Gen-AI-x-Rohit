import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Beaker, ShieldAlert } from 'lucide-react';
import { motion } from "framer-motion";

import FileUpload from './components/FileUpload';
import SummaryDisplay from './components/SummaryDisplay';

function App() {

    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (file) => {

        setLoading(true);
        setError('');
        setSummaryData(null);

        const formData = new FormData();
        formData.append('file', file);

        try {

           const response = await axios.post(
    'https://gen-ai-x-rohit-3.onrender.com/api/summarize/',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setSummaryData(response.data);

        } catch (err) {

            const errorMessage =
                err.response?.data?.error ||
                'Failed to process the medical report. Please try again.';

            setError(errorMessage);

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-slate-50 text-gray-900 pb-20">

            {/* ---------- HEADER ---------- */}

            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">

    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <div className="flex items-center gap-3">

            {/* NEW PROFESSIONAL LOGO (not AI style) */}
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">MS</span>
            </div>

            <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
                MediSummarizer
            </h1>

        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">

            <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Secure
            </span>

            <span className="flex items-center gap-1.5">
                <Beaker className="w-4 h-4" /> Advanced Processing
            </span>

        </div>

    </div>

</header>

            {/* ---------- HERO + MAIN ---------- */}

            <motion.main
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto px-4 pt-16"
            >

                {/* HERO */}

                <div className="max-w-3xl mx-auto text-center mb-16">

    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
        Medical Report Simplified
    </h2>

    <p className="mt-6 text-lg text-slate-600">
        Clear, structured explanations of your health data in seconds.
    </p>

</div>


                {/* UPLOAD */}

                <FileUpload onUpload={handleUpload} loading={loading} />


                {/* ERROR */}

                {error && (

                    <div className="max-w-xl mx-auto mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 shadow-sm">

                        <ShieldAlert className="w-5 h-5 mt-1" />

                        <div>
                            <p className="font-semibold">Processing Error</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>

                    </div>

                )}


                {/* LOADING */}

                {loading && (

                    <div className="flex justify-center mt-12">

                        <div className="bg-white rounded-2xl px-8 py-5 shadow flex items-center gap-3">

                            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />

                            <span className="font-medium text-gray-700">
                                Reading and analyzing your medical report...
                            </span>

                        </div>

                    </div>

                )}


                {/* RESULT */}

                {summaryData && <SummaryDisplay data={summaryData} />}


                {/* STEPS */}

                {!summaryData && !loading && !error && (

                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

                        {[
                            ["Upload Report", "Securely upload your medical PDF file"],
                            ["Smart Analysis", "System extracts key medical information"],
                            ["Clear Explanation", "Understand results in simple language"]
                        ].map((item, i) => (

                            <div key={i}
                                className="bg-white rounded-3xl shadow-sm p-8 text-center hover:shadow-md transition">

                                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    {i + 1}
                                </div>

                                <h4 className="font-semibold mb-2">{item[0]}</h4>

                                <p className="text-sm text-gray-500">{item[1]}</p>

                            </div>

                        ))}

                    </div>

                )}

            </motion.main>


            {/* ---------- FOOTER ---------- */}

            <footer className="mt-24 border-t border-slate-200 pt-10 max-w-4xl mx-auto px-4">

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3 text-amber-800 text-sm shadow-sm">

                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />

                    <p>
                        <strong>Medical Notice:</strong> This platform helps you understand
                        medical reports for educational purposes only. It does not replace
                        professional medical advice, diagnosis, or treatment.
                        Always consult a qualified healthcare professional for medical decisions.
                    </p>

                </div>

            </footer>

        </div>

    );

}

export default App;