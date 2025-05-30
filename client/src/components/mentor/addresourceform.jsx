import React, { useState } from 'react';
import { Plus, X, Upload, Star, FileText, Globe, Image, ExternalLink } from 'lucide-react';
import FileUpload from '../parts/fileupload';
import InputField from '../parts/inputfield';

const ResourceForm = ({ onSubmit, isLoading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        domain: [],
        rating: 5,
        banner: '',
        resource: []
    });

    const [newDomain, setNewDomain] = useState('');
    const [newResource, setNewResource] = useState({
        type: "link",
        title: "",
        url: "",
        file: null, // For documents
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const addDomain = () => {
        if (newDomain.trim() && !formData.domain.includes(newDomain.trim())) {
            setFormData(prev => ({
                ...prev,
                domain: [...prev.domain, newDomain.trim()]
            }));
            setNewDomain('');
        }
    };

    const removeDomain = (index) => {
        setFormData(prev => ({
            ...prev,
            domain: prev.domain.filter((_, i) => i !== index)
        }));
    };

    const addResource = () => {
        if (newResource.title.trim() && newResource.url.trim()) {
            setFormData(prev => ({
                ...prev,
                resource: [...prev.resource, { ...newResource }]
            }));
            setNewResource({ type: 'link', title: '', url: '' });
        }
    };

    const removeResource = (index) => {
        setFormData(prev => ({
            ...prev,
            resource: prev.resource.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 4) {
            newErrors.title = 'Title must be at least 4 characters long';
        } else if (formData.title.length > 50) {
            newErrors.title = 'Title must be less than 50 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 4) {
            newErrors.description = 'Description must be at least 4 characters long';
        } else if (formData.description.length > 100) {
            newErrors.description = 'Description must be less than 100 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#b5d5e5]/20 ">
            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] rounded-lg px-8 py-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/20 via-[#0ea5e9]/20 to-[#3b82f6]/20 opacity-50"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b5d5e5]/30 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7a35c]/30 rounded-full blur-xl"></div>

                        <div className="relative z-10">
                            <h1 className="text-2xl font-bold text-white mb-2">Create New Resource</h1>
                            <p className="text-[#b5d5e5]">Share valuable resources with the community</p>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#b5d5e5]/30 shadow-lg">
                        <h2 className="text-xl font-semibold text-[#1a3a6c] mb-4 flex items-center gap-2">
                            <FileText className="text-[#2c67a6]" size={20} />
                            Basic Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#1a3a6c] mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 transition-all ${errors.title
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-[#b5d5e5]/50 bg-white/70 focus:border-[#0ea5e9]'
                                        }`}
                                    placeholder="Enter resource title"
                                />

                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                <p className="text-xs text-[#6b7280] mt-1">{formData.title.length}/50 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1a3a6c] mb-2">
                                    Rating
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                                        className="flex-1 h-2 bg-[#b5d5e5]/50 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex items-center gap-1 min-w-[80px]">
                                        <Star className="text-[#f7a35c] fill-current" size={16} />
                                        <span className="text-[#1a3a6c] font-medium">{formData.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-[#1a3a6c] mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 transition-all resize-none ${errors.description
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-[#b5d5e5]/50 bg-white/70 focus:border-[#0ea5e9]'
                                    }`}
                                placeholder="Describe your resource..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            <p className="text-xs text-[#6b7280] mt-1">{formData.description.length}/100 characters</p>
                        </div>
                    </div>

                    <div className='md:flex   gap-4 w-full'>
                        {/* Domains */}
                        <div className="bg-white/80 mb-4 md:mb-0 md:w-1/2 backdrop-blur-sm rounded-2xl p-6 border border-[#b5d5e5]/30 shadow-lg">
                            <h2 className="text-xl font-semibold text-[#1a3a6c] mb-4 flex items-center gap-2">
                                <Globe className="text-[#2c67a6]" size={20} />
                                Domains
                            </h2>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newDomain}
                                    onChange={(e) => setNewDomain(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
                                    className="flex-1 px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                                    placeholder="Add domain (e.g., Web Development)"
                                />
                                <button
                                    type="button"
                                    onClick={addDomain}
                                    className="px-4 py-2 bg-gradient-to-r from-[#2c67a6] to-[#0ea5e9] text-white rounded-xl hover:from-[#2c67a6]/90 hover:to-[#0ea5e9]/90 transition-all hover:scale-105"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.domain.map((domain, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-[#b5d5e5]/30 text-[#1a3a6c] rounded-full text-sm font-medium"
                                    >
                                        {domain}
                                        <button
                                            type="button"
                                            onClick={() => removeDomain(index)}
                                            className="text-[#6b7280] hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="md:w-1/2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#b5d5e5]/30 shadow-lg">
                            <h2 className="text-xl font-semibold text-[#1a3a6c] mb-4 flex items-center gap-2">
                                <Image className="text-[#2c67a6]" size={20} />
                                Banner Image
                            </h2>

                            <input
                                type="file"
                                name="banner"
                                accept="image/*"
                                value={formData.banner}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                                placeholder="Enter banner image URL"
                            />
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#b5d5e5]/30 shadow-lg">
                        <h2 className="text-xl font-semibold text-[#1a3a6c] mb-4 flex items-center gap-2">
                            <ExternalLink className="text-[#2c67a6]" size={20} />
                            Resources
                        </h2>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <select
                                value={newResource.type}
                                onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value }))}
                                className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                            >
                                <option value="link">Video Link</option>
                                <option value="document">Document</option>
                                <option value="course">Course Link</option>
                            </select>

                            <input
                                type="text"
                                value={newResource.title}
                                onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                                className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                                placeholder="Resource title"
                            />

                            {newResource.type === "document" ? (
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        setNewResource((prev) => ({
                                            ...prev,
                                            file: e.target.files?.[0] || null,
                                        }))
                                    }
                                    className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                                />
                            ) : (
                                <input
                                    type="url"
                                    value={newResource.url}
                                    onChange={(e) =>
                                        setNewResource((prev) => ({ ...prev, url: e.target.value }))
                                    }
                                    className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                                    placeholder="Resource URL"
                                />
                            )}


                            <button
                                type="button"
                                onClick={addResource}
                                className="px-4 w-1/6 flex justify-center items-center py-2 bg-gradient-to-r from-[#7ba779] to-[#7ba779]/80 text-white rounded-xl hover:from-[#7ba779]/90 hover:to-[#7ba779]/70 transition-all hover:scale-105"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {formData.resource.map((resource, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-[#b5d5e5]/20 rounded-xl border border-[#b5d5e5]/30"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 bg-[#2c67a6] text-white text-xs rounded-full">
                                            {resource.type}
                                        </span>
                                        <span className="font-medium text-[#1a3a6c]">{resource.title}</span>
                                        <span className="text-[#6b7280] text-sm truncate max-w-xs">{resource.url}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeResource(index)}
                                        className="text-[#6b7280] hover:text-red-500 transition-colors p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-3 border-2 border-[#6b7280] text-[#6b7280] rounded-xl hover:bg-[#6b7280] hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-gradient-to-r from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] text-white rounded-xl hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Create Resource
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default ResourceForm;