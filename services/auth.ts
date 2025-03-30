// services/auth.ts
import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./api";
import { AppDispatch } from "../lib/store";
import { setLoading, setSignupData, setToken, setUser } from "../lib/slices/authSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email: string, navigate: (path: string) => void) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/otp-verification");
        } catch (error: any) {
            console.error("SENDOTP ERROR:", error);
            toast.error(error.message || "Could Not Send OTP");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}

export function login(credentials: LoginCredentials) {
    return async (dispatch: AppDispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", LOGIN_API, credentials);
        console.log("API Response:", response); // Debug statement
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        const { token, user } = response.data;
  
        // Dispatch actions to update Redux state
        dispatch(setToken(token));
        dispatch(
          setUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType,
          })
        );
  
        // Optionally, store token in localStorage
        localStorage.setItem("authToken", token);
  
        toast.success("Login Successful");
      } catch (error: any) {
        console.error("LOGIN ERROR:", error);
        toast.error(error.message || "Login Failed");
      } finally {
        dispatch(setLoading(false));
      }
    };
  }
export function logout(navigate: (path: string) => void) {
    return async (dispatch: AppDispatch) => {
        try {
            // Clear token and reset Redux state
            dispatch(setToken(null));
            dispatch(setUser(null));

            // Optionally, clear localStorage or cookies if token is stored there
            localStorage.removeItem("authToken");

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("LOGOUT ERROR:", error);
        }
    };
}