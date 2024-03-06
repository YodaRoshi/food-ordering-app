import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_Base_URl = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};
export const useCreateMyUser = () => {
    const {getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
            const accessToken= await getAccessTokenSilently();
                const response = await fetch(`${API_Base_URl}/api/my/user`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

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
// type <> = {} object 
type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
    // email for is not included 
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently  } = useAuth0();

    const useUpdateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`$API_BASE_URL}/api/my/user`,{
            method: "PUT",
                headers: {
                    Authorization: `bearer${accessToken}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(formData),
        });

        if(!response){
            throw new Error("Faiiled to update user");
        }

    };

    const { 
        mutateAsync: updateUser, 
        isLoading, 
        isSuccess, 
        error,
        reset,
    } = useMutation(useUpdateMyUserRequest);

    if(isSuccess){
        toast.success("User profile updated!")
    }

    if(error){
        toast.error(error.toString());
        // it clears the error state from this request.
        // we don't want this error toast appearing anytime the component rerenders for whatever reason
        reset();
    }

    return { updateUser, isLoading };
};