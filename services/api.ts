// services/api.ts
const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const endpoints = {
    SENDOTP_API: `${BASE_API}/auth/sendotp`,
    SIGNUP_API: `${BASE_API}/auth/signup`,
    LOGIN_API: `${BASE_API}/auth/login`,
    RESETPASSTOKEN_API: `${BASE_API}/auth/reset-password-token`,
    RESETPASSWORD_API: `${BASE_API}/auth/reset-password`,
    GET_USER_DETAILS_API: `${BASE_API}/profile/getUserDetails`,
    UPDATE_PROFILE_API: `${BASE_API}/profile/updateProfile`,
    UPDATE_DISPLAY_PICTURE_API: `${BASE_API}/profile/updateDisplayPicture`,
    DELETE_ACCOUNT_API: `${BASE_API}/profile/deleteProfile`,
    // RESEARCH_API: "http://172.16.8.46:5000/agent/fetch_docs",
    RESEARCH_API: "http://192.168.193.251:5000/agent/fetch_docs",

};