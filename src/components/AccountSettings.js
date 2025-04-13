// pages/AccountSettings.tsx
import React, { useState, useEffect } from "react";
import { auth, monitorAuthState, getUserProfile, updateUserProfile, logout } from "@/lib/firebase";
import { toast } from "sonner";

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = monitorAuthState(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const profile = await getUserProfile(currentUser.uid);
        setUsername(profile?.username || "");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    try {
      await updateUserProfile(user.uid, { username });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Please log in to access your account settings.</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Account Settings</h1>
      <form onSubmit={handleProfileUpdate} className="mt-4 space-y-4">
        <div>
          <label htmlFor="username" className="block text-white">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
            placeholder="Enter your username"
          />
        </div>
        <button type="submit" className="w-full p-2 mt-4 bg-red-600 text-white rounded">Update Profile</button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full p-2 mt-2 bg-gray-600 text-white rounded"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
