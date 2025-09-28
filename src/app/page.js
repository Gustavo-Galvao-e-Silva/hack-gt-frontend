"use client"
import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

export default function FileUploadComponent() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !filePath) return;

        setIsUploading(true);
        setUploadStatus(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('file_path', filePath);

            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
                console.log('Upload successful:', result);

                // Reset form after successful upload
                setTimeout(() => {
                    setSelectedFile(null);
                    setFilePath('');
                    setUploadStatus(null);
                }, 2000);
            } else {
                const error = await response.json();
                setUploadStatus({ type: 'error', message: error.detail || 'Upload failed' });
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus({ type: 'error', message: 'Network error. Make sure your FastAPI server is running on localhost:8000' });
        } finally {
            setIsUploading(false);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-light text-gray-900 mb-2">Upload File</h1>
                        <p className="text-gray-500 text-sm">Choose a file and specify its destination</p>
                    </div>

                    {/* File Path Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Destination Path
                        </label>
                        <input
                            type="text"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                            placeholder="/home/user/documents/"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
                        />
                    </div>

                    {/* File Upload Area */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select File
                        </label>

                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                                    isDragOver
                                        ? 'border-gray-400 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-25'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-600 mb-1">
                                    Click to browse or drag and drop
                                </p>
                                <p className="text-xs text-gray-400">
                                    Any file type supported
                                </p>
                                <input
                                    id="file-input"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileInputChange}
                                />
                            </div>
                        ) : (
                            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <File className="h-8 w-8 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={clearFile}
                                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        <X className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Button */}
                    {selectedFile && filePath && (
                        <div className="animate-in slide-in-from-bottom-4 duration-300">
                            <button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                                    isUploading
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                            >
                                {isUploading ? 'Uploading...' : 'Upload File'}
                            </button>

                            {/* Status Message */}
                            {uploadStatus && (
                                <div className={`mt-3 p-3 rounded-lg text-sm ${
                                    uploadStatus.type === 'success'
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    {uploadStatus.message}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}