import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// functional compoents 
const AuthCallbackPage = () => {
    const navigate = useNavigate();
    // Provides accesse to the current logged-in user info
    const {user} = useAuth0();
    const {createUser} = useCreateMyUser();
    // store state value 
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if(user?.sub && user?.email && !hasCreatedUser.current){
            createUser({auth0Id: user.sub, email: user.email})
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [createUser, navigate, user]);

    return <>Loding...</>
}

export default AuthCallbackPage;