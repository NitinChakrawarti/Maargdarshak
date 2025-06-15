import { useState } from "react";
import { Check, Timer, ExternalLink, ChevronDown, ChevronRight, Circle, PlayCircle, Award, Download, Lock } from "lucide-react";
import { useSelector } from "react-redux";

const CourseModule = ({
    module,
    moduleIndex,
    courseProgress,
    isAddedToList,
    handleProgressChange,
}) => {
    const [expanded, setExpanded] = useState(true);
    const toggleExpand = () => setExpanded((prev) => !prev);

    const getProgressIcon = (resourceId) => {
        const status = courseProgress[resourceId] || 'not-started';
        switch (status) {
            case 'completed':
                return <Check className="w-5 h-5 text-green-600" />;
            case 'in-progress':
                return <Circle className="w-5 h-5 text-yellow-500 fill-current" />;
            default:
                return <Circle className="w-5 h-5 text-gray-300" />;
        }
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div
                className="bg-gray-50 p-4 font-semibold text-gray-800 flex items-center justify-between cursor-pointer"
                onClick={toggleExpand}
            >
                <span>{module.name}</span>
                {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>

            {expanded && (
                <div className="divide-y divide-gray-100">
                    {module.lessons.map((lesson, lessonIndex) => {
                        const lessonId = `${moduleIndex}-${lessonIndex}`;
                        return (
                            <div
                                key={lessonId}
                                className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors"
                            >


                                {/* Progress Status */}
                                <div className="flex-shrink-0">{getProgressIcon(lessonId)}</div>

                                {/* Content Type Icon */}

                                {/* Content Info */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span className="capitalize">{lesson.type}</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => window.open(lesson.url, '_blank')}
                                    className="p-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                                {/* Progress Controls */}
                                {/* 
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleProgressChange(lessonId, 'completed')}
                                        className="p-2 cursor-pointer text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Mark as Completed"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleProgressChange(lessonId, 'in-progress')}
                                        className="p-2 cursor-pointer text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                        title="Mark as In Progress"
                                    >
                                        <Circle className="w-5 h-5" />
                                    </button>
                                </div> */}

                                <div className="relative w-fit">
                                    {!isAddedToList && (
                                        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-not-allowed">
                                            <Lock className="w-4 h-4 text-gray-500" />
                                        </div>
                                    )}

                                    <div
                                        className={`flex items-center space-x-2 p-1 rounded-lg ${!isAddedToList ? 'opacity-50 pointer-events-none select-none' : ''
                                            }`}
                                    >
                                        <button
                                            onClick={() => handleProgressChange(lessonId, 'completed')}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Mark as Completed"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleProgressChange(lessonId, 'in-progress')}
                                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                            title="Mark as In Progress"
                                        >
                                            <Circle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>




                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CourseModule;
