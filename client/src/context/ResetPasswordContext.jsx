import { createContext, useContext, useEffect, useState } from "react";
import { forgotPasswordRequest, resetPasswordRequest, verifyTokenResetRequest } from "../api/password";
export const ResetPasswordContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useResetPassword = () => {
    const context = useContext(ResetPasswordContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const ResetPasswordProvider = ({children}) => {

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const forgotPassword = async (email) => {
        try {
            const res = await forgotPasswordRequest(email);
            setMessage(res.data.message);
            return res
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    }

    const verifyTokenReset = async(id, token) => {
        try {
            const res = await verifyTokenResetRequest(id, token);
            console.log(res);
            setRedirect(false);
        } catch (error) {
            console.log(error);
            sessionStorage.setItem('messageError', error.response.data.message);
            setRedirect(true);
        }
    }

    const resetPassword = async (id, token, newPassword) => {
        try {
            const res = await resetPasswordRequest(id, token, newPassword);
            setMessage(res.data.message);
            console.log(res.data.message);
            return res;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
            console.log(error);
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }

        if(message !== null) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, [errors, message]);

    return(
        <ResetPasswordContext.Provider value={{
            forgotPassword,
            verifyTokenReset,
            resetPassword,
            errors,
            redirect,
            message,
        }}>
            { children }
        </ResetPasswordContext.Provider>
    )
}