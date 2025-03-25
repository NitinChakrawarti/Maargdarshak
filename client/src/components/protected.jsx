import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/contextapi";


const Protected = ({ children }) => {
    const [userdata, setuserdata] = useState({});
    const { user, setuser } = useContext(UserContext);

    const verifytoken = async () => {
        const token = localStorage.getItem("logintoken");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/token-verify`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status) {
                const user = response.data
                setuser(user.status)
            }
            else {
                console.log(response.data.message)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        verifytoken();
    }, []);

    if (!user?._id) {
        return <Navigate to="/" />;
    }
    return children;

}

export default Protected