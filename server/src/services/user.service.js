import User from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import bcrypt from 'bcryptjs';
import statusCodeUtility from "../utils/statusCodeUtility.js";
import Resource from "../models/resource.model.js";
import Progress from "../models/progress.model.js";
import Certificate from "../models/certificate.model.js";
import { generateCertificate } from "../utils/generatecertificate.js";


const salt = bcrypt.genSaltSync(10);

class UserService {

    // ----------------- 1. user registration ----------------- //
    async createUser(data) {
        const { email, password, name } = data;
        const previous_user = await User.findOne({
            email
        });
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (previous_user) {
            throw new APIError(statusCodeUtility.Conflict, "This account already register...");
        }

        else {
            const new_user = await User.create({
                email,
                password: hashedPassword,
                name,
                isverified: false,
                authType: "manual"
            });
            if (!new_user) {
                throw new APIError(statusCodeUtility.InternalServerError, "Failed to create user");
            }
            return new_user;
        }

    }

    // ----------------- 2. user login ----------------- //
    async loginUser(data) {
        const { email, password } = data;
        const user = await User.findOne({
            email
        });
        if (!user) {
            throw new APIError(statusCodeUtility.NotFound, "User not found");
        }
        if (user.isverified != true) {
            return {
                UserNotVerified: true,
                data: {
                    email: user.email,
                    role: user.role
                }
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new APIError(statusCodeUtility.BadRequest, "Invalid password");
        }
        return user;
    }


    // ----------------- 2.5. user login with third party ----------------- //
    async loginWithThirdParty(data) {
        const { clerkId, email, name, profile, role, isVerified, authType } = data;
        const newUser = await User.create({
            clerkId,
            email,
            name,
            profile,
            role,
            isVerified,
            authType
        });
        if (!newUser) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to create user with third party authentication");
        }
        return newUser;
    }

    // ----------------- 3. add course ----------------- //
    async addCourse(data) {
        const { courseName, description, courseId, userId } = data;
        const session = await User.startSession();
        session.startTransaction();
        const response = await Promise.all([
            User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: {
                            courseName,
                            description,
                            courseId
                        }
                    }
                },
                { new: true }
            ),
            Progress.create({
                userId: userId,
                courseId: courseId,
                Progress: {}
            }),
            Resource.findByIdAndUpdate(
                courseId,
                {
                    $inc: { studentsEnrolled: 1 }
                },
                { new: true }
            )
        ]);
        if (!response[0] || !response[1] || !response[2]) {
            await session.abortTransaction();
            session.endSession();
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to add course");
        }
        await session.commitTransaction();
        session.endSession();
        return response[0];
    }

    async addfavorite(data) {
        const { courseId, userId } = data;
        const existingFavorite = await User.findOne({ _id: userId, savedItems: courseId });
        if (existingFavorite) {
            const response = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        savedItems: courseId
                    }

                },
                { new: true }
            );
            if (!response) {
                throw new APIError(statusCodeUtility.NotFound, "User not found or course not in favorites");
            }
            return { removed: true, favorites: response.savedItems, message: "Course removed from favorites successfully" };
        }

        const response = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    savedItems: courseId
                }
            },
            { new: true }
        );
        if (!response) {
            throw new APIError(statusCodeUtility.NotFound, "User not found");
        }
        return { added: true, favorites: response.savedItems, message: "Course added to favorites successfully" };
    }

    async fetchFavorites(data) {
        const { ids, skip, limit } = data;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No favorite IDs provided");
        }
        const response = await Resource.find({ _id: { $in: ids } },
            {
                _id: 1,
                title: 1,
                description: 1,
                domain: 1,
            }
        ).skip(skip).limit(limit);
        if (!response || response.length === 0) {
            throw new APIError(statusCodeUtility.NotFound, "No favorite courses found");
        }
        return response;
    }

    async getCourseProgress(resourceId) {
        const progress = await Progress.findOne({ courseId: resourceId });
        if (!progress) {
            throw new APIError(statusCodeUtility.NotFound, "Course progress not found");
        }
        return progress;
    }

    async updateCourseProgress({ userId, courseId, Progressdata }) {
        console.log("Updating progress for user:", userId, "course:", courseId, "data:", Progressdata);
        
        const progress = await Progress.findOneAndUpdate(
            { userId, courseId },
            {
                $set: {
                    Progress: Progressdata
                }
            },
            { new: true }
        );

        console.log("Updated Progress:", progress);
        if (!progress) {
            throw new APIError(statusCodeUtility.NotFound, "Course progress not found");
        }
        return progress;
    }


    async checkEligibilityForCertificate({ userId, courseId }) {

        const progress = await Progress.findOne({ userId, courseId });
        const course = await Resource.findById(courseId);
        if (!progress || !course) {
            throw new APIError(statusCodeUtility.NotFound, "Course progress not found");
        }

        const courseProgress = progress.Progress;
        const resource = course.toObject();
        const completedLessons = courseProgress.size;
        const totalLessons = resource.modules.reduce((count, module) => count + (module.lessons?.length || 0), 0);

        const calculateProgress = () => {
            return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        };

        if (completedLessons === totalLessons) {
            return {
                eligible: true,
                progress: calculateProgress(),
                message: "You are eligible for the certificate."
            };
        } else {
            throw new APIError(statusCodeUtility.BadRequest, "You are not eligible for the certificate yet.");
        }
    }


    async generateCertificate({ userId, courseId }) {
        const [user, resource] = await Promise.all([
            User.findById(userId).select("name email"),
            Resource.findById(courseId).select("title mentorname")
        ]);

        if (!user || !resource) {
            throw new APIError(statusCodeUtility.NotFound, "User or Course not found");
        }

        let existingCertificate = await Certificate.findOne({ userId, courseId });

        if (!existingCertificate) {
            existingCertificate = await Certificate.create({
                userId: userId,
                courseName: resource.title,
                learnerName: user.name,
                instructorName: resource.mentorname,
                courseId: courseId
            });

            if (!existingCertificate) {
                throw new APIError(statusCodeUtility.InternalServerError, "Error creating certificate record");
            }
        }

        return await generateCertificate({
            name: user.name,
            moduleName: resource.title,
            certificateId: existingCertificate._id.toString(),
            adminName: resource.mentorname,
            date: existingCertificate.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        });
    }



}

export default new UserService();