import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/api";
import { setProfile, setLoading, setError, resetProfile } from "@/lib/slices/profileSlice";
import { AppDispatch } from "@/lib/store";
import { toast } from "react-hot-toast";

// Fetch User Details
export const fetchUserDetails = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("GET", endpoints.GET_USER_DETAILS_API);
    const userData = response.data;

    dispatch(
      setProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        image: userData.image,
        additionalDetails: {
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth,
          about: userData.about,
          contactNumber: userData.contactNumber,
        },
      })
    );

    toast.success("Profile data fetched successfully");
  } catch (error: any) {
    dispatch(setError(error.message));
    toast.error("Failed to fetch profile data");
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Profile Picture
export const updateProfilePicture = (imageFile: File) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const formData = new FormData();
    formData.append("displayPicture", imageFile);

    const response = await apiConnector(
      "PUT",
      endpoints.UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(setProfile(response.data.data));
    toast.success("Profile picture updated successfully");
  } catch (error: any) {
    dispatch(setError(error.message));
    toast.error("Failed to update profile picture");
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete User Account
export const deleteUserAccount = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await apiConnector("DELETE", endpoints.DELETE_ACCOUNT_API);
    dispatch(resetProfile());
    toast.success("Account deleted successfully");
  } catch (error: any) {
    dispatch(setError(error.message));
    toast.error("Failed to delete account");
  } finally {
    dispatch(setLoading(false));
  }
};