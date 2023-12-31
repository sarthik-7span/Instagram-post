import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { getPostById } from "@/lib/appwrite/api";
import { UseGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = UseGetPostById(id || "");
  const { user } = useUserContext();
  const handleDeletePost = () => {};
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <div className="xl:w-1/2">
            <img
              src={post?.imageUrl}
              alt="creator"
              className="post_detail-img"
            />
          </div>
          <div className="post_details-info xl:w-1/2">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id} && "hidden"`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete-btn ${
                    user.id !== post?.creator.$id
                  } && "hidden"`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tag.map((tag: string) => {
                  return (
                    <li key={tag} className="text-light-3">
                      <span>#{tag}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
