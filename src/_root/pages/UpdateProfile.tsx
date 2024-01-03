import Loader from "@/components/shared/Loader";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  UseGetUserById,
  UseUpdateProfile,
} from "@/lib/react-query/queriesAndMutations";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: currentUserData, isPending: isDataPending } = UseGetUserById(
    user.id
  );
  const { mutateAsync: updateProfile, isPending: isLoadingUpdate } =
    UseUpdateProfile();
  const [useData, setUseData] = useState({
    username: "",
    name: "",
    email: "",
    imageUrl: "",
    bio: "",
    userId: "",
  });

  useEffect(() => {
    setUseData({
      name: currentUserData ? currentUserData.name : "",
      email: currentUserData ? currentUserData.email : "",
      username: currentUserData ? currentUserData.username : "",
      imageUrl: currentUserData ? currentUserData.imageUrl : "",
      bio: currentUserData ? currentUserData.bio : "",
      userId: user.id,
    });
  }, [currentUserData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUseData(() => {
      return {
        ...useData,
        [name]: value || "",
      };
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUseData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedProfile = await updateProfile(useData);

    if (!updatedProfile) {
      return toast({
        title: "Please try again.",
      });
    }
    navigate(-1);
  };
  return !currentUserData ? (
    <Loader />
  ) : (
    <div className="w-full p-3 md:p-5 2xl:p-14 2xl:py-28">
      <form className="max-w-[700px] mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-300">
              Edit Profile
            </h2>

            <div className="mt-10">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-xl font-medium leading-6 text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter you username..."
                  value={useData.username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                />
              </div>
              <div className="sm:col-span-4 mt-5">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium leading-6 text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter you name..."
                  value={useData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                />
              </div>
              <div className="sm:col-span-4 mt-5">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium leading-6 text-gray-600"
                >
                  Email
                </label>
                <div className="relative mb-6 mt-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    name="email"
                    onChange={handleChange}
                    value={useData.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email..."
                  />
                </div>
              </div>
              <div className="sm:col-span-4 mt-5">
                <label
                  htmlFor="bio"
                  className="block text-xl font-medium leading-6 text-gray-600"
                >
                  Bio
                </label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  placeholder="Enter you bio..."
                  onChange={handleChange}
                  value={useData.bio}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                />
              </div>
              <div className="col-span-full mt-5">
                <label
                  htmlFor="photo"
                  className="block text-xl font-medium leading-6 text-gray-600"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="w-48 h-48 rounded-full overflow-hidden">
                    <img
                      src={
                        useData.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </label>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:otline-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
