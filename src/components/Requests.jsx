import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [showToast, setShowToast] = useState({ toast: false, status: "" });
  let timer = null;

  const reviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(removeRequest(_id))
        setShowToast({ toast: true, status: status });

        timer = setTimeout(() => {
          setShowToast({ toast: false, status: "" });
        }, 3000);
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      if (response) {
        dispatch(addRequests(response?.data?.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found.</h1>;

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-bold text-2xl">Connection Requests</h1>
        {requests?.map((request) => {
          const { _id, firstName, lastName, photoURL, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex items-center m-4 p-4 bg-base-200 rounded-lg w-1/2"
            >
              <img src={photoURL} className="w-20 h-20 rounded-full" />
              <div className="m-4 text-left">
                <h2 className="text-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <button
                  className="btn btn-primary my-2 mr-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary my-2 mr-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showToast.toast && showToast.status === "accepted" ? (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Request Accepted Successfully!</span>
          </div>
        </div>
      ) : showToast.toast && showToast.status === "rejected" && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>Request Rejected Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
