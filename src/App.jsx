import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import MainScreen from "./components/MainScreen";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<MainScreen />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
