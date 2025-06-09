import { users } from '@clerk/clerk-sdk-node';

const thirdPartyUser = async (userId) => {
    try {
        const user = await users.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress || null,
            name: `${user.firstName || ''} ${user.lastName || ''}` || null,
            profileImage: user.imageUrl || null,
            isVerified: user.externalAccounts?.some(account => account.verification) || false,
            mobile: user.phoneNumbers[0]?.phoneNumber || null,
            role: 'user',
            authType: 'oauth',
        };
    } catch (error) {
        console.error('Error fetching third-party user:', error);
        throw error;
    }
};

export default thirdPartyUser;
