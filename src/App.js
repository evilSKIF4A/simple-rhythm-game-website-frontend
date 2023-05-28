import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyPage from "./pages/MyPage/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import Game from "./pages/Game/Game";

function App() {
  const dispatch = useDispatch();
  //const userData = useSelector((state) => state.auth.data);
  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  // React.useEffect(() => {
  //   userData && socket.emit("addUser", userData?._id);
  // }, [userData]);

  if (status === "loaded" && !isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
