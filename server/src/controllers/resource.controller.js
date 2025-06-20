import resourceService from "../services/resource.service.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import FileRename from "../utils/filerename.js";
import { paginate } from "../utils/pagination.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class Resources {

    async getResources(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const totalItems = await resourceService.countDocuments();
        const { skip, totalPages } = paginate(totalItems, page, limit);
        const resources = await resourceService.getResources({ skip, limit });
        return ResponseHandler(
            statusCodeUtility.Success,
            "Resources fetched successfully",
            {
                resources,
                pagination: {
                    totalItems,
                    currentPage: parseInt(page),
                    totalPages: totalPages,
                    limit: parseInt(limit)
                }
            },
            res
        );
    }

    async getResourceById(req, res) {
        const { id } = req.params;
        const resource = await resourceService.getResourceById(id);
        return ResponseHandler(
            statusCodeUtility.Success,
            "Resource fetched successfully",
            resource,
            res
        );
    }


    async getResourceByMentorId(req, res) {
        const { mentorId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const totalItems = await resourceService.countDocumentsByMentorId(mentorId);
        const { skip, totalPages } = paginate(totalItems, page, limit);
        const resources = await resourceService.getResourcesByMentorId(mentorId , { skip, limit });
        return ResponseHandler(
            statusCodeUtility.Success,
            "Resources by mentor fetched successfully",
            {
                resources,
                pagination: {
                    totalItems,
                    currentPage: parseInt(page),
                    totalPages: totalPages,
                    limit: parseInt(limit)
                }
            },
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

        const { title, description, domain, rating, reviews, modules, mentorId, mentorname } = req.body;
        const parsedmodules = JSON.parse(modules);
        const parsedDomain = JSON.parse(domain);
        const resourceData = await resourceService.addResource({ title, description, domain: parsedDomain, rating, reviews, modules: parsedmodules, mentorId, mentorname, banner: newPath });

        if (resourceData) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Resource created successfully",
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
        const { title, description, domain, rating, reviews, modules, mentorId } = req.body;
        const parsedmodules = JSON.parse(modules);
        const parsedDomain = JSON.parse(domain);
        const resourceData = await resourceService.updateResource(id, { title, description, domain: parsedDomain, rating, reviews, modules: parsedmodules, mentorId, mentorname, studentsEnrolled, });
        console.log(parsedDomain, parsedmodules);

        if (resourceData) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Resource updated successfully",
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
    }

}

export default new Resources();