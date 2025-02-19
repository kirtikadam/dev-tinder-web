import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const MainScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store?.user)

  const fetch = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response?.data));
    } catch (err) {
      console.log("Error = ", err);
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if(!user) {
      fetch();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainScreen;
