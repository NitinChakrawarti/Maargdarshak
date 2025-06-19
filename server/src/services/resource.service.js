import Resource from "../models/resource.model.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class ResourceService {

    async getResources({ skip = 0, limit = 10 }) {
        const resources = await Resource.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        if (!resources) {
            throw new APIError(statusCodeUtility.NotFound, "No resources found");
        }
        return resources;
    }

    async addResource(resourceData) {
        if (!resourceData) {
            throw new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }

        const { title, description, domain, rating, reviews, modules, banner, mentorname, studentsEnrolled, mentorId } = resourceData;
        const new_resource = await Resource.create({
            title,
            description,
            domain,
            rating,
            reviews,
            modules,
            mentorId,
            banner,
            mentorname,
            studentsEnrolled: studentsEnrolled || 0
        });
        if (!new_resource) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to add resource");
        }
        return new_resource;
    }

    async getResource(id) {
        const resource = await Resource.findById(id);
        if (!resource) {
            throw new APIError(statusCodeUtility.NotFound, "Resource not found");
        }
        return resource;
    }

    async updateResource(id, resourceData) {
        const { title, description, domain, rating, reviews, modules, mentorId } = resourceData;
        const updatedResource = await Resource.findByIdAndUpdate(id, {
            title,
            description,
            domain,
            rating,
            reviews,
            modules,
            mentorId,
            mentorname: resourceData.mentorname,
            studentsEnrolled: resourceData.studentsEnrolled || 0
        }, { new: true });
        if (!updatedResource) {
            throw new APIError(statusCodeUtility.NotFound, "Resource not found");
        }
        return updatedResource;
    }

    async deleteResource(id) {
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            throw new APIError(statusCodeUtility.NotFound, "Resource not found");
        }
        return deletedResource;
    }

    async countDocuments() {
        const count = await Resource.countDocuments();
        if (count === null || count === undefined) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to count resources");
        }
        return count;
    }

    async getTotalLessons(courseId) {
        const totalLessons = await Resource.aggregate([
            { $match: { _id: courseId } },
            { $unwind: "$modules" },
            { $group: { _id: null, totalLessons: { $sum: { $size: "$modules.lessons" } } } }
        ]);
        if (!totalLessons || totalLessons.length === 0) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to calculate total lessons");
        }
        return totalLessons[0].totalLessons;
    }
}

export default new ResourceService();