// components/DashboardHeader.jsx
import { Trophy, Zap } from 'lucide-react';

const DashboardHeader = ({ name, completedCourses, certificates, totalModules, completionRate }) => (
  <div className="bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy rounded-xl p-8 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
    <div className="relative z-10">
      <h2 className="text-4xl font-bold mb-4">Welcome, {name}!</h2>
      <p className="text-xl text-blue-100 mb-6">
        You've completed {completedCourses} courses with a {completionRate}% success rate!
      </p>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-300" />
          <span className="text-lg font-semibold">{certificates} Certificate</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-orange-300" />
          <span className="text-lg font-semibold">{totalModules} Modules Completed</span>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHeader;