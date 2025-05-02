import Mentor from "../models/mentor.model.js";
import User from "../models/user.model.js";

class chatDetails {
    async chat(userslist) {
        try {
            const userDetails = await Promise.all(
                userslist.map(async (id) => {
                    // Search in User model
                    const user = await User.findById(id).select("profile name _id");
                    if (user) return user;

                    // If not found in User, search in Mentor model
                    const mentor = await Mentor.findById(id).select("profile name _id");
                    if (mentor) return mentor;

                    // If not found in either, return null
                    return null;
                })
            );

            // Filter out any null values (if an ID doesn't exist in either model)
            return userDetails.filter((detail) => detail !== null);
        } catch (error) {
            console.error("Error fetching user/mentor details:", error);
            return false;
        }
    }
}

export default new chatDetails();