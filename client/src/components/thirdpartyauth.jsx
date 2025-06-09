import { useSignUp, useUser, useSignIn, useClerk, useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, setError } from '../redux/features/authSlice';
import { setUser } from "../redux/features/userSlice";
import { VerifyToken } from '../api';

const ThirdPartySignUp = ({ method }) => {
    const { signUp, isLoaded } = useSignUp();
    const [loading, setLoading] = useState(false);
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const dispatch = useDispatch();
    const handleSignUp = async () => {
        if (!isLoaded || !signUp) return;
        try {
            setLoading(true);
            openSignIn({
                strategy: "oauth_google",
                redirectUrl: "/signup",
            });

        } catch (err) {
            console.error("OAuth error:", err);

        } finally {
            setLoading(false);
            if (user.id) {
                dispatch(setAuth({
                    role: 'user', data: {
                        _id: user.id,
                        email: user.email,
                        name: user.name,
                        isverified: true,
                        authType: 'oauth',
                    }
                }));
            }
        }
    };

    // const { getToken } = useAuth();
    // useEffect(() => {
    //     const verifyToken = async () => {
    //         try {
    //             const response = await VerifyToken({ token: await getToken() });
    //             const userData = response.data.data;
    //             dispatch(setAuth({
    //                 role: userData.role, data: {
    //                     _id: userData._id,
    //                     email: userData.email,
    //                     name: userData.name,
    //                     isverified: userData.isverified,
    //                 }
    //             }));
    //             dispatch(userData.role === 'user' ? setUser(userData) : setUser(userData));
    //         } catch (error) {
    //             console.error('Error verifying token:', error.data);
    //             dispatch(setAuth({ role: null, data: null }));
    //             dispatch(setError('Token verification failed'));
    //         }
    //     };
    //     verifyToken();
    // }, [dispatch, getToken]);

    return (
        <div className='flex justify-center items-center '>
            <button
                onClick={handleSignUp}
                disabled={loading}
                className={`flex font-medium cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Signing up...' : 'Other Options'}
            </button>

        </div>
    );
};

export default ThirdPartySignUp;

