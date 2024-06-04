import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLogin } from "../../services/userAccountService";
import MyAlert from "../../components/MyAlert";
function UserAccountDefault() {
  const [displayLayout, setDisplayLayout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const waitingAPI = async () => {
      const login = await checkLogin();
      if (login) {
        navigate("/");
      } else {
        setDisplayLayout(true);
      }
    };
    waitingAPI();
  }, []);


  if (!displayLayout) return;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[url('/images/user_account_bg.gif')] bg-cover bg-no-repeat bg-fixed bg-center">
      </div>
      <MyAlert />
      <Outlet/>
    </>
  );
}

export default UserAccountDefault;
