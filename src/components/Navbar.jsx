import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻 DevTinder</Link>
      </div>
      <div className="flex gap-2">
        {!isEmpty(user) && (
          <>
          <p className="flex items-center">Welcome, {user?.firstName || "User"}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Image"
                  src={user?.photoURL || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-picture-placeholder&psig=AOvVaw2oDSaCCiw5AprkgzBCwy_G&ust=1740045698300000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKixhMO9z4sDFQAAAAAdAAAAABAE"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
