import { sum } from "pdf-lib";
import Progress from "../models/progress.model.js";
import APIError from "../utils/APIError.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import mongoose from "mongoose";
import resourceService from "./resource.service.js";


class ProgressService {

    async getProgressSummary(userId) {
        if (!userId) {
            throw new APIError(statusCodeUtility.BadRequest, "No user ID provided");
        }

        const progressSummary = await Progress.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $project: {
                    courseId: 1,
                    completedCount: {
                        $size: {
                            $filter: {
                                input: { $objectToArray: "$progress" },
                                cond: { $eq: ["$$this.v", "completed"] }
                            }
                        }
                    }
                }
            }
        ]);
        const totallessons = await Promise.all(progressSummary.map(item => (
            resourceService.getTotalLessons(item.courseId)
        )));


        const matchedIndexesCount = progressSummary.reduce((count, item, index) => {
            return item.completedCount === totallessons[index] ? count + 1 : count;
        }, 0);

        if (!progressSummary || progressSummary.length === 0) {
            return [];
        }
        return {
            totalCourses: progressSummary.length,
            completedCourses: matchedIndexesCount,
            progressDetails: progressSummary.map(item => ({
                courseId: item.courseId,
                completedCount: item.completedCount,
                totalLessons: totallessons[progressSummary.indexOf(item)]
            }))
        };

    }


    async recentLearnings(userId) {
        if (!userId) {
            throw new APIError(statusCodeUtility.BadRequest, "No user ID provided");
        }

        const recentProgress = await Progress.find({ userId: new mongoose.Types.ObjectId(userId) })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select('courseId');

        if (!recentProgress) {
            throw new APIError(statusCodeUtility.NotFound, "No recent progress found");
        }
        const courseDetails = await Promise.all(recentProgress.map(async (progress) => {
            const course = await resourceService.getResource(progress.courseId);
            return {
                courseId: course._id,
                title: course.title,
                description: course.description,
            };
        }));
        return courseDetails;
    }

}

export default new ProgressService(); 