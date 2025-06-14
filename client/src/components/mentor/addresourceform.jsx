import React, { useState } from 'react';
import { Plus, X, Upload, Star, FileText, Globe, Image, ExternalLink } from 'lucide-react';
import { AddResource } from '../../api';
import { useSelector } from 'react-redux';


const TextInputWithLabel = ({
    type = 'text',
    label,
    name,
    value,
    onChange,
    placeholder = '',
    maxLength = 50,
    error = ''
}) => {

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-[#1a3a6c] mb-2">
                {label} *
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 transition-all ${error
                    ? 'border-red-300 bg-red-50'
                    : 'border-[#b5d5e5]/50 bg-white/70 focus:border-[#0ea5e9]'
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-xs text-[#6b7280] mt-1">{value.length}/{maxLength} characters</p>
        </div>
    );
};

const ResourceForm = ({ onSubmit }) => {
    const { data: mentor } = useSelector((state) => state.auth);
    const [newDomain, setNewDomain] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [resource, setResource] = useState({
        title: '',
        description: '',
        domain: [],
        rating: 5,
        banner: '',
        modules: [],
        mentorId: mentor._id,
        mentorname: mentor.name
    });

    const [modules, setModules] = useState([
        {
            name: '',
            lessons: [
                {
                    title: '',
                    type: 'link',
                    url: '',
                    file: null,
                },
            ],
        },
    ]);

    const addModule = () => {
        setModules((prev) => [
            ...prev,
            { name: '', lessons: [{ title: '', type: 'link', url: '', file: null }] },
        ]);
    };

    const removeModule = (index) => {
        setModules((prev) => prev.filter((_, i) => i !== index));
    };

    const updateModuleName = (moduleIndex, name) => {
        setModules((prev) => {
            const updated = [...prev];
            updated[moduleIndex].name = name;
            return updated;
        });
    };

    const addLesson = (moduleIndex) => {
        setModules((prev) => {
            const updated = [...prev];
            updated[moduleIndex].lessons.push({
                title: '',
                type: 'link',
                url: '',
                file: null,
            });
            return updated;
        });
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        setModules((prev) => {
            const updated = [...prev];
            updated[moduleIndex].lessons = updated[moduleIndex].lessons.filter(
                (_, i) => i !== lessonIndex
            );
            return updated;
        });
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        setModules((prev) => {
            const updated = [...prev];
            updated[moduleIndex].lessons[lessonIndex][field] = value;
            return updated;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'banner') {
            // Handle file input separately
            setResource(prev => ({
                ...prev,
                banner: e.target.files ? e.target.files[0] : ''
            }));
            return;
        }
        setResource(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const addDomain = () => {
        if (newDomain.trim() && !resource.domain.includes(newDomain.trim())) {
            setResource(prev => ({
                ...prev,
                domain: [...prev.domain, newDomain.trim()]
            }));
            setNewDomain('');
        }
    };

    const removeDomain = (index) => {
        setResource(prev => ({
            ...prev,
            domain: prev.domain.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!resource.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (resource.title.length < 4) {
            newErrors.title = 'Title must be at least 4 characters long';
        } else if (resource.title.length > 50) {
            newErrors.title = 'Title must be less than 50 characters';
        }
        if (!resource.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (resource.description.length < 4) {
            newErrors.description = 'Description must be at least 4 characters long';
        } else if (resource.description.length > 100) {
            newErrors.description = 'Description must be less than 100 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResource(prev => ({
            ...prev,
            modules: modules
        }))
        setLoading(true)
        if (validateForm()) {

            const formData = new FormData();
            formData.append('title', resource.title);
            formData.append('description', resource.description);
            formData.append('rating', resource.rating);
            formData.append('domain', JSON.stringify(resource.domain));
            formData.append('modules', JSON.stringify(modules))
            if (resource.banner) {
                formData.append('banner', resource.banner);
            }
            formData.append('mentorId', mentor._id || '');
            formData.append('mentorname', mentor.name);
            const response = await AddResource(formData);
            if (response.status === 200) {
                onSubmit();
                setLoading(false)
                setResource({
                    title: '',
                    description: '',
                    domain: [],
                    rating: 5,
                    banner: '',
                    modules: []
                });
                setNewDomain('');
                setModules([
                    {
                        name: '',
                        lessons: [
                            {
                                title: '',
                                type: 'link',
                                url: '',
                                file: null,
                            },
                        ],
                    },
                ])
                setErrors({});
            } else {
                setLoading(false);
                console.error(response.data);
            }
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
                                <TextInputWithLabel
                                    type="text"
                                    label="Title"
                                    name="title"
                                    value={resource.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter resource title"
                                    maxLength={50}
                                    error={errors.title}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-[#1a3a6c] mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={resource.description}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 transition-all resize-none ${errors.description
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-[#b5d5e5]/50 bg-white/70 focus:border-[#0ea5e9]'
                                    }`}
                                placeholder="Describe your resource..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            <p className="text-xs text-[#6b7280] mt-1">{resource.description.length}/100 characters</p>

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
                                {resource.domain.map((domain, index) => (
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
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-[#b5d5e5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] bg-white/70"
                            />

                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#b5d5e5]/30 shadow-lg">
                        <h2 className="text-xl font-semibold text-[#1a3a6c] mb-4 flex items-center gap-2">
                            <ExternalLink className="text-[#2c67a6]" size={20} />
                            Modules & Resources
                        </h2>

                        {modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="mb-6 border p-4 rounded-xl border-[#b5d5e5]/40 bg-white/50">
                                <div className="mb-4 flex items-center justify-between">
                                    <input
                                        type="text"
                                        placeholder="Module Name"
                                        value={module.name}
                                        onChange={(e) =>
                                            updateModuleName(moduleIndex, e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-[#b5d5e5]/50 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                                    />
                                </div>

                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lessonIndex}
                                        className="grid md:grid-cols-4 gap-4 items-center mb-3"
                                    >
                                        <select
                                            value={lesson.type}
                                            onChange={(e) =>
                                                updateLesson(moduleIndex, lessonIndex, 'type', e.target.value)
                                            }
                                            className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                                        >
                                            <option value="link">Video Link</option>
                                            <option value="document">Document Link</option>
                                            <option value="course">Course Link</option>
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="Lesson Title"
                                            value={lesson.title}
                                            onChange={(e) =>
                                                updateLesson(moduleIndex, lessonIndex, 'title', e.target.value)
                                            }
                                            className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                                        />

                                        {lesson.type === "document" ? (
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) =>
                                                    updateLesson(moduleIndex, lessonIndex, 'file', e.target.files?.[0] || null)
                                                }
                                                className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                                            />
                                        ) : (
                                            <input
                                                type="url"
                                                placeholder="Resource URL"
                                                value={lesson.url}
                                                onChange={(e) =>
                                                    updateLesson(moduleIndex, lessonIndex, 'url', e.target.value)
                                                }
                                                className="px-4 py-2 border-2 border-[#b5d5e5]/50 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50"
                                            />
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                            className="text-[#6b7280] hover:text-red-500 transition-colors p-2"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}

                                <div className="flex gap-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => addLesson(moduleIndex)}
                                        className="bg-[#7ba779] text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
                                    >
                                        + Add Lesson
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeModule(moduleIndex)}
                                        className="text-red-500 border border-red-400 px-4 py-2 rounded-xl hover:bg-red-50"
                                    >
                                        Remove Module
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addModule}
                            className="mt-4 bg-gradient-to-r from-[#7ba779] to-[#7ba779]/80 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
                        >
                            + Add Module
                        </button>
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-3 cursor-pointer border-2 border-[#6b7280] text-[#6b7280] rounded-xl hover:bg-[#6b7280] hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 cursor-pointer  bg-gradient-to-r from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] text-white rounded-xl hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
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