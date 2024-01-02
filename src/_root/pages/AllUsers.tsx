import Loader from "@/components/shared/Loader";
import { useGetAllUser } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { data: allUserData, isPending: isUserPending } = useGetAllUser();
  console.log(allUserData);

  return isUserPending ? (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-wrap items-center p-2 lg:p-5">
      {allUserData?.documents.map((item, index) => {
        return (
          <Link
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/5 p-3"
            to={`/profile/${item.$id}`}
          >
            <div className="bg-black border rounded-lg shadow-md shadow-white dark:bg-gray-800 dark:border-gray-700 px-2 py-6 lg:px-5 lg:py-9">
              <div className="flex flex-col items-center">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={item.imageUrl}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-white ">
                  {item.name}
                </h5>
                <span className="text-sm text-white dark:text-gray-400">
                  {item.username}
                </span>
                <div className="flex mt-4 md:mt-6 gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add friend
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    Message
                  </a>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllUsers;
