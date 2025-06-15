import React from 'react'
import Layout from '../../layout/auth/layout'
import { useSelector } from 'react-redux'
import ProfileComponent from '../../components/user/userProfile'

const UserProfile = () => {
    const { user } = useSelector((state) => state.user)
    console.log("user profile", user);

    return (
        <Layout>
            <ProfileComponent user={user} />
        </Layout>
    )
}

export default UserProfile