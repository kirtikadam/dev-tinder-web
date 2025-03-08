import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  }

  return (
    <div className="flex justify-center">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
