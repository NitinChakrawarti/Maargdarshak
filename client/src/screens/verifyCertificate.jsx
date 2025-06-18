import React, { useState } from 'react';
import { Search, Shield, CheckCircle, XCircle, FileText, Calendar, User, Award, AlertCircle, ArrowLeft } from 'lucide-react';
import { VerifyCertificateApi } from '../api';
import { toast } from 'react-toastify';

const VerifyCertificate = () => {
    const [certificateId, setCertificateId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [showResult, setShowResult] = useState(false);


    const handleVerify = async () => {
        if (!certificateId.trim()) return;

        setIsVerifying(true);
        setShowResult(false);
        const response = await VerifyCertificateApi({ certificateId });
        if (response.status === 200) {
            setIsVerifying(false);
            setVerificationResult(response.data);
            console.log("Verification Result:", response.data.data);
            
            toast.success("Certificate verified successfully");
        }
        setIsVerifying(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleVerify();
        }
    };

    const handleBackToHome = () => {
        // Navigate to home page - adjust the path as needed for your routing setup
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Back to Home Button */}
            <div className="pt-6 px-6">
                <button
                    onClick={handleBackToHome}
                    className="inline-flex items-center cursor-pointer space-x-2 px-4 py-2 text-brand-navy hover:text-light-blue transition-colors duration-200 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="font-medium">Back to Home</span>
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-navy  to-light-blue rounded-2xl mb-6">
                        <Award className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-brand-navy mb-4">
                        Verify Certificate Authenticity
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Enter a certificate ID to instantly verify its authenticity and view detailed credential information
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter Certificate ID "
                                className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
                            />
                            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            onClick={handleVerify}
                            disabled={isVerifying || !certificateId.trim()}
                            className="px-8 py-4 bg-gradient-to-r from-brand-navy  to-light-blue text-white rounded-xl font-semibold hover:from-light-blue cursor-pointer hover:to-brand-navy disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                        >
                            {isVerifying ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                'Verify Certificate'
                            )}
                        </button>
                    </div>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg transition-all duration-500">
                        {verificationResult.data ? (
                            <div>
                                {/* Valid Certificate */}
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-7 h-7 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-green-700">Certificate Verified!</h3>
                                        <p className="text-green-600">This certificate is authentic and valid</p>
                                    </div>
                                </div>

                                {/* Certificate Details */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <User className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Recipient</p>
                                                <p className="text-lg font-semibold text-gray-900">{verificationResult.data.learnerName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <FileText className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Course/Program</p>
                                                <p className="text-lg font-semibold text-gray-900">{verificationResult.data.courseName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Award className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Instructor</p>
                                                <p className="text-lg font-semibold text-gray-900">{verificationResult.data.instructorName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Issue Date</p>
                                                <p className="text-lg font-semibold text-gray-900">{new Date(verificationResult.data.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                                <p className="text-lg font-semibold text-gray-900">{new Date(verificationResult.data.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Shield className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Certificate ID</p>
                                                <p className="text-lg font-semibold text-gray-900">{verificationResult.data._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Course ID */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-start space-x-3">
                                        <FileText className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Course ID</p>
                                            <p className="text-lg font-semibold text-gray-900">{verificationResult.data.courseId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Invalid Certificate */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <XCircle className="w-7 h-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-red-700">Certificate Not Found</h3>
                                        <p className="text-red-600">This certificate ID could not be verified</p>
                                    </div>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="text-red-800 font-medium">Possible reasons:</p>
                                            <ul className="text-red-700 text-sm mt-1 space-y-1">
                                                <li>• Certificate ID was entered incorrectly</li>
                                                <li>• Certificate has been revoked or expired</li>
                                                <li>• Certificate was not issued by a verified institution</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default VerifyCertificate;