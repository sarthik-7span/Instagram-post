import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, issuccess } = useSignOutAccount();
  const { user } = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (issuccess) {
      signOut();
      navigate(0);
    }
  }, [issuccess]);

  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          {" "}
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut}
          >
            <img src="/assets/icons/logout.svg" alt="" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
