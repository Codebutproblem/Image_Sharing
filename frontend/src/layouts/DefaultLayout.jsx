import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { checkLogin } from "../services/userAccountService";
import MyAlert from "../components/MyAlert";
import Loading from "../components/Loading";
import { refreshToken } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/user";

function DefaultLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayLayout, setDisplayLayout] = useState(false);
  useEffect(() => {
    const waitingAPI = async () => {
      const result = await checkLogin();
      if (!result) {
        navigate("/user-account/login");
      } else {
        dispatch(setUser(result));
        setDisplayLayout(true);
      }
    };
    refreshToken();
    waitingAPI();
    const refreshTokenInterval = setInterval(refreshToken, 13000);
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);

  if (!displayLayout) return;

  return (
    <>
      <MyAlert />
      <header className="w-full fixed top-0 z-[100] bg-slate-50">
        <Header />
      </header>
      <main className="realtive">
        <div className="max-w-7xl mx-auto h-20 px-3 mt-20 pt-5">
          <Outlet />
        </div>
        <Loading />
      </main>
    </>
  );
}

export default DefaultLayout;
