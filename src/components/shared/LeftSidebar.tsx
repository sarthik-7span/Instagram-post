import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constant";
import { INavLink } from "@/types";
import Loader from "./Loader";

const LeftSidebar = () => {
  const { pathname } = useLocation();
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
    <nav className="leftsidebar shadow-xl shadow-slate-600">
      <div className="flex gap-11 flex-col">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className="h-14 w-14 rounded-full"
            alt="profile"
          />
          <div>
            <p className="text-light-2 text-sm">{user.name}</p>
            <p className="text-light-2 text-sm">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  className="p-4 flex gap-3 items-center"
                  to={link.route}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium md:base-medium">Log Out</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
