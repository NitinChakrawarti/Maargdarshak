// pages/UserHome.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetUserDetails } from '../../api';

import {
  BookOpen,
  Target,
  Award,
  BarChart3,
  TrendingUp,
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import DashboardHeader from '../../components/user/dashboardheader';
import AnalyticsCard from '../../components/user/analyticscard';
import RecentLearning from '../../components/user/recentlearnings';
import CertificateList from '../../components/user/certificatelist';

const UserHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await GetUserDetails({ userId: user._id });
        setUserDetails(data.data.data);
      } catch (err) {
        console.error("Failed to fetch user details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-xl font-medium text-gray-600 animate-pulse">Loading your dashboard...</div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-gray-600">Looks like you're just getting started. Begin a course to see your progress here!</p>
        </div>
      </div>
    );
  }

  const { progressSummary = {}, certificates = [], recentLearnings = [] } = userDetails;
  const completionRate = progressSummary.totalCourses
    ? ((progressSummary.completedCourses / progressSummary.totalCourses) * 100).toFixed(1)
    : 0;
  const totalModulesCompleted = progressSummary.progressDetails?.reduce((sum, detail) => sum + detail.completedCount, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <DashboardHeader
          name={userDetails.user.name.split(' ')[0]}
          completedCourses={progressSummary.completedCourses}
          certificates={certificates.length}
          totalModules={totalModulesCompleted}
          completionRate={completionRate}
        />

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-brand-navy" />
            Learning Progress Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Completion</span>
                  <span className="text-sm font-bold text-brand-navy">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-brand-blue to-brand-navy h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              {(progressSummary.progressDetails || []).length > 0 ? progressSummary.progressDetails.map((progress, index) => {
                const course = recentLearnings.find(c => c.courseId === progress.courseId);
                const progressPercent = (progress.completedCount / progress.totalLessons) * 100;
                return (
                  <div key={progress.courseId}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {course?.title || `Course ${index + 1}`}
                      </span>
                      <span className="text-sm font-bold text-brand-blue">{progress.completedCount}/{progress.totalLessons}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${progressPercent === 100
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                          : 'bg-gradient-to-r from-brand-blue to-brand-navy'}`}
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-gray-500 text-sm text-center">No progress data available.</p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="transparent" stroke="url(#gradient)"
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(completionRate / 100) * 251.2} 251.2`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{completionRate}%</span>
                  </div>
                </div>
                <p className="text-gray-600 font-medium">Course Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

    

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentLearning learnings={recentLearnings} progressDetails={progressSummary.progressDetails || []} />
          <CertificateList certificates={certificates} />
        </div>
      </main>
    </div>
  );
};

export default UserHome;
