import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const Saved = () => {
  const { user } = useUserContext();
  const { data: saved, isPending: isSavedPending } = useGetCurrentUser();
  console.log(saved);

  return isSavedPending ? (
    <Loader />
  ) : (
    <div className="w-full text-center">
      <div className="grid-container py-10 w-full mx-auto">
        {saved?.save.map((item, index) => (
          <div className="relative min-w-80 h-80" key={index}>
            <Link
              to={`/posts/${item.post.$id}`}
              className="grid-post_link hover:scale-105 transition"
            >
              <div className="w-full h-full">
                <img
                  src={item.post.imageUrl}
                  alt="post"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-start gap-3 items-center bg-[#00000094]">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={user.imageUrl} alt="" />
                </div>
                <span className="font-medium text-xl">{user.username}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
