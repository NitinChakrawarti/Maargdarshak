import resourceService from "../services/resource.service.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import FileRename from "../utils/filerename.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class Resources {

    async getResources(req, res) {
        const resources = await resourceService.getResources();
        return ResponseHandler(
            statusCodeUtility.Success,
            "Resources fetched successfully",
            resources,
            res
        );
    }

    async addResource(req, res) {

        if (!req.body) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }

        let newPath = "";
        if (req.file) {
            newPath = FileRename(req.file);
        }
        if (!req.file) {
            newPath = req.body.banner;
        }

        const { title, description, domain, rating, reviews, resource, mentorId, mentorname } = req.body;
        const resourceData = await resourceService.addResource({ title, description, domain, rating, reviews, resource, mentorId, mentorname, banner: newPath });

        if (resourceData) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Resource created successfully",
                resourceData,
                res
            );
        }

        else {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "Resource not created",
                resourceData,
                res
            );
        }
    }

    async getResource(req, res) {
        const { id } = req.params;
        const resource = await resourceService.getResource(id);
        return ResponseHandler(
            statusCodeUtility.Success,
            "Resource fetched successfully",
            resource,
            res
        );
    }

    async updateResource(req, res) {
        const { id } = req.params;
        const { title, description, domain, rating, reviews, resource, mentorId } = req.body;
        const resourceData = await resourceService.updateResource(id, { title, description, domain, rating, reviews, resource, mentorId, mentorname, studentsEnrolled, });

        if (resourceData) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Resource updated successfully",
                resourceData,
                res
            );
        }

        else {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "Resource not updated",
                resourceData,
                res
            );
        }
    }

    async deleteResource(req, res) {
        const { id } = req.params;
        const resourceData = await resourceService.deleteResource(id);

        if (resourceData) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Resource deleted successfully",
                resourceData,
                res
            );
        }

        else {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "Resource not deleted",
                resourceData,
                res
            );
        }
    }

}

export default new Resources();