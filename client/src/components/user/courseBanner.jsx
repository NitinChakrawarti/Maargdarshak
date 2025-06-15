import { ChevronLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop";

const CourseBanner = ({ resource, backUrl, renderStars }) => {
  if (!resource) return null;

  return (
    <div className="relative h-96 overflow-hidden">
      <img
        src={resource.banner}
        alt={resource.title || "Course Banner"}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
          e.currentTarget.alt = "Fallback image";
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Back Button */}
      <Link
        to={backUrl}
        aria-label="Go back"
        className="absolute top-4 left-4 flex items-center bg-bg text-brand-navy px-4 py-2 rounded-lg shadow-lg transition-all hover:bg-white/80"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Go Back
      </Link>

      {/* Text & Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto text-white">
          {/* Domains */}
          <div className="flex flex-wrap gap-2 mb-3">
            {resource.domain.map((domain, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {domain}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-3 break-words">
            {resource.title}
          </h1>

          {/* Rating and Students */}
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            {renderStars(resource.rating)}
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-1" />
              {resource?.studentsEnrolled?.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
