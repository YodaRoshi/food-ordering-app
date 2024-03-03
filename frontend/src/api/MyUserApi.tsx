import { useMutation } from "react-query";

const API_Base_URl = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};
export const useCreateMyUser = () => {
    const createMyUserRequest = async (user: CreateUserRequest) => {
                const response = await fetch(`${API_Base_URl}/api/my/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })

                if(!response.ok){
                    throw new Error("failed to create user");         
                }
    };
    //  
    const {
        mutateAsync: createUser, // renaming mutateAsync as createUser
        isLoading, 
        isError, 
        isSuccess
    } = useMutation(createMyUserRequest);

    return {
        createUser, 
        isLoading, 
        isError, 
        isSuccess,
    };
};