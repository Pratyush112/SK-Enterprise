import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
    const Navigate = useNavigate();


    //Goback to previous page
    const goBack = () => {
       Navigate(-1);
    }

    //Redirect path
    const redirectTo = (path, options = {}) => {
        Navigate(path, options)
    }

    return{goBack, redirectTo};
};