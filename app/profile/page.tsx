"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchUserDetails, updateProfilePicture, deleteUserAccount } from "@/services/profile";
import { selectProfile } from "@/lib/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppDispatch } from "@/lib/store";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error } = useSelector(selectProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchUserDetails());
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        await dispatch(updateProfilePicture(e.target.files[0]));
        toast.success("Profile picture updated successfully");
      } catch (error) {
        toast.error("Failed to update profile picture");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await dispatch(deleteUserAccount());
        toast.success("Account deleted successfully");
        router.push("/");
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  const handleLogout = () => {
    router.push("/logout");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-500">
        {error || "Failed to load profile data"}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-semibold">My Profile</h1>
      <div className="flex flex-col items-center gap-6 rounded-lg border p-6 text-center md:flex-row md:text-left">
        <div className="relative">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90">
            <Pencil className="h-4 w-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-4 flex gap-4">
            <Button variant="outline" onClick={() => router.push("/settings")} className="gap-2" disabled={loading}>
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-destructive/30 bg-destructive/10 p-6">
        <h3 className="mb-4 text-xl font-medium text-destructive">Danger Zone</h3>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently remove your account and all associated data
            </p>
          </div>
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}