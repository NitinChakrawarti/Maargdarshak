
// components/CertificateList.jsx
import { Award, Calendar, ArrowRight, Trophy, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GenerateCertificateApi } from '../../api';



const CertificateList = ({ certificates }) => {

  const handleDownloadCertificate = async (userId, courseId) => {
    try {
      const response = await GenerateCertificateApi({
        userId,
        courseId
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // open in new tab
    } catch (error) {
      console.error("Error previewing certificate:", error);
    }
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-600" />
          Your Certificates
        </h3>
      </div>
      <div className="space-y-4">
        {certificates.length > 0 ? certificates.map(cert => (
          <div key={cert._id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                {cert.courseName}
              </h4>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Certified</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Instructor: <span className="font-medium">{cert.instructorName}</span>

            </p>
            <p>
              Certificate ID: <span className="font-medium">{cert._id}</span> <Copy className="inline w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => navigator.clipboard.writeText(cert._id)} title="Copy Certificate ID" />
            </p>
            <div className="flex items-center mt-2 justify-between">
              <span className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(cert.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDownloadCertificate(cert.userId, cert.courseId)}
                type="button"
                className="text-purple-600 cursor-pointer hover:text-purple-700 text-sm font-medium flex items-center">
                Download
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-500 text-center">No certificates earned yet.</p>
        )}
      </div>
    </div>
  );
}
export default CertificateList;
