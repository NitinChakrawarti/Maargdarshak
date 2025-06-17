import React, { useEffect } from 'react'
import { CheckEligibilityForCertificate, GenerateCertificateApi } from '../../api';
import { toast } from 'react-toastify';

const GenerateCertificate = ({ resourceId, user, courseProgress, resource }) => {
    const [eligible, setEligible] = React.useState(false);
    const totalLessons = resource.modules.reduce(
        (count, module) => count + (module.lessons?.length || 0),
        0
    );
    const completed = Object.values(courseProgress).filter((s) => s === "completed").length;
    const isEligibleForCertificate = completed === totalLessons && totalLessons > 0;

    useEffect(() => {
        const checkEligibility = async () => {
            const response = await CheckEligibilityForCertificate({
                userId: user._id,
                courseId: resourceId
            });
            setEligible(response.data.data.eligible);
        };
        checkEligibility();
    }, [courseProgress]);


    const handleDownloadCertificate = async () => {
        try {
            const response = await GenerateCertificateApi({
                userId: user._id,
                courseId: resourceId
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank'); // open in new tab
        } catch (error) {
            console.error("Error previewing certificate:", error);
        }
    };



    return (
        <div className="flex items-center justify-center p-6">
            {isEligibleForCertificate && eligible ? (
                <button className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-brand-navy to-brand-blue hover:from-brand-blue  hover:to-brand-blue text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer "
                    onClick={handleDownloadCertificate}
                >
                    <svg
                        className="w-5 h-5 mr-2 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Generate Certificate
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-200"></div>
                </button>
            ) : (
                <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <svg
                        className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="text-amber-800 font-medium">
                        You need to complete all lessons to get a certificate.
                    </p>
                </div>
            )}
        </div>
    )
}

export default GenerateCertificate