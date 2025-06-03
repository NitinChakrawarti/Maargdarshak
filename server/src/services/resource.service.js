import Resource from "../models/resource.model.js";


class ResourceService {

    async getResources() {
        const resources = await Resource.find();
        return resources;
    }

    async addResource(resourceData) {
        if (!resourceData) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }

        const { title, description, domain, rating, reviews, resource, banner,mentorname,studentsEnrolled, mentorId} = resourceData;
        const new_resource = await Resource.create({
            title,
            description,
            domain,
            rating,
            reviews,
            resource,
            mentorId,
            banner,
            mentorname,
            studentsEnrolled: studentsEnrolled || 0
        });
        return new_resource;
    }

    async getResource(id) {
        const resource = await Resource.findById(id);
        return resource;
    }

    async updateResource(id, resourceData) {
        const { title, description, domain, rating, reviews, resource, mentorId } = resourceData;
        const updatedResource = await Resource.findByIdAndUpdate(id, {
            title,
            description,
            domain,
            rating,
            reviews,
            resource,
            mentorId,
            mentorname: resourceData.mentorname,
            studentsEnrolled: resourceData.studentsEnrolled || 0
        }, { new: true });
        return updatedResource;
    }

    async deleteResource(id) {
        const deletedResource = await Resource.findByIdAndDelete(id);
        return deletedResource;
    }

}

export default new ResourceService();