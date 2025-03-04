import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { isEmpty } from "lodash";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsList = useSelector((store) => store.connection);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (response) {
        dispatch(addConnections(response?.data?.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-bold text-2xl">Connections</h1>
      {isEmpty(connectionsList) ? (
        <div>There are no connections!</div>
      ) : (
        connectionsList.map((connection, index) => {
          const { firstName, lastName, photoURL, age, gender, about } =
            connection;
          return (
            <div key={index} className="flex m-4 p-4 bg-base-200 rounded-lg w-1/2">
              <img src={photoURL} className="w-20 h-20 rounded-full" />
              <div className="m-4 text-left">
                <h2 className="text-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Connections;
