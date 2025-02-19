import axios from "axios";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true})
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.error(err);
    }
  }

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
                <a onClick={handleLogout}>Logout</a>
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
