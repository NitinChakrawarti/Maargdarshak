import { useEffect, useState } from "react";
import { Star, ExternalLink, Eye, Tag, ArrowRight, Pen, DeleteIcon, Delete, Trash2 } from "lucide-react";
import { GetResources } from "../../api";
import { Link } from "react-router-dom";
import SkeletonCard from "../skeleton/resourcegrid";

const ResourcesGrid = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFetchResources = async () => {
        try {
            const response = await GetResources();
            if (response.status === 200) {
                const data = response.data.data;
                if (Array.isArray(data)) {
                    setResources(data);
                } else {
                    console.warn("API returned non-array data. Setting empty array.");
                    setResources([]);
                }
            } else {
                console.error("Failed to fetch resources:", response.message);
            }
        } catch (error) {
            console.error("Error fetching resources:", error);
            setResources([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        handleFetchResources();
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <div className="flex items-center space-x-1">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {hasHalfStar && (
                    <div className="relative">
                        <Star className="w-4 h-4 text-gray-300" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="text-sm text-gray-600 ml-2">({rating})</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-4  pb-12 px-0">
            <div className="max-w-7xl mt-4 mx-auto">
                {loading ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))
                        }
                    </div>
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resources?.map((resource) => (
                                <div
                                    key={resource._id}
                                    className=" rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col justify-between "
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="flex flex-wrap gap-2 mb-4 top-2 left-4 absolute z-10">
                                            {resource.domain.slice(0, 2).map((domain, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 bg-bg rounded-full text-xs font-medium  text-brand-navy"
                                                >
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    {domain}
                                                </span>
                                            ))}
                                        </div>
                                        <img
                                            src={resource?.banner}
                                            alt={resource.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-6 flex flex-col justify-between lg:h-64 md:64">
                                        <div className="mb-3">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                                {resource.title.slice(0, 20)}{resource.title.length > 20 ? "..." : ""}
                                            </h3>
                                            {renderStars(resource.rating)}
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {resource.description.slice(0, 50)}{resource.description.length > 50 ? "..." : ""}
                                        </p>



                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span className="flex items-center">
                                                <Eye className="w-4 h-4 mr-1" />
                                                {resource.reviews?.length || 0} reviews
                                            </span>
                                            <span className="text-brand-navy font-medium">
                                                {resource.resource?.length || 0} resource
                                                {resource.resource?.length !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <div>
                                            <Link
                                                to={`${resource._id}`}
                                                className="flex-1 bg-gradient-to-r from-dark-blue to-light-blue text-white py-3 px-4 rounded-xl font-semibold hover:from-light-blue hover:to-dark-blue transition-all duration-300 transform  hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ResourcesGrid;
