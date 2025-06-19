
// components/RecentLearning.jsx
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';  

const RecentLearning = ({ learnings, progressDetails }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-600" />
        Recent Learning
      </h3>
    </div>
    <div className="space-y-4">
      {learnings.length > 0 ? learnings.map((course, index) => {
        const completedModules = progressDetails.find(p => p.courseId === course.courseId)?.completedCount || 0;
        return (
          <div key={course.courseId} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${'bg-blue-500'}`}></div>
                {course.title}
              </h4>
              <span className={`text-xs px-2 py-1 rounded-full ${ 'bg-blue-100 text-blue-700'}`}>
                {/* {'In Progress'} */}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
            <div className="flex items-center justify-end">
              
              <Link 
                to={`/user/resources/${course.courseId}`}
                className="text-blue-600 cursor-pointer  hover:text-blue-700 text-sm font-medium flex items-center">
                Continue
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        );
      }) : (
        <p className="text-sm text-gray-500 text-center">You haven't started any courses yet.</p>
      )}
    </div>
  </div>
);

export default RecentLearning;