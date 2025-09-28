import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import type { RootState } from "@/redux/store";
import { editProfile } from "@/apiCall/userCall";
import { setUserData } from "@/redux/slices/userSlice";

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(userData?.name || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [profilePic, setProfilePic] = useState(userData?.profilePicture || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("username", username);
      if (imageFile) {
        formData.append("profilePic", imageFile);
      }
      const data = await editProfile(formData);
      dispatch(setUserData(data));
      navigate(`/profile/${username}`);
    } catch (error) {
      console.error(`Cannot Edit profile: ${error}`);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-4">
          <Link
            to={`/profile/${userData?.username}`}
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Profile
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Edit Your Profile
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                  />
                  <div
                    onClick={() => imageInputRef?.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-700 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <input
                type="file"
                hidden
                ref={imageInputRef}
                onChange={handleUpdateImage}
                accept="image/*"
              />

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8 space-x-4">
                <Link
                  to={`/profile/${userData?.username}`}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
