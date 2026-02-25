import React, { useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

const FileUpload = ({ onUpload, loading }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (selectedFile) => {
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
            setError('File size should be less than 10MB.');
            return;
        }

        setFile(selectedFile);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer
            ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={loading}
                    />

                    <div className={`p-4 rounded-full ${file ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        {file ? <File className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                    </div>

                    <div className="text-center">
                        <h3 className="font-medium text-gray-900">
                            {file ? file.name : 'Click to upload medical PDF'}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {file ? `${(file.size / 1024).toFixed(1)} KB` : 'PDF files up to 10MB'}
                        </p>
                    </div>

                    {file && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || loading}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all shadow-sm
            ${!file || loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'}`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing Report...</span>
                        </div>
                    ) : (
                        'Analyze Medical Report'
                    )}
                </button>
            </form>
        </div>
    );
};

export default FileUpload;
