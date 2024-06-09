import { Link, useNavigate } from "react-router-dom";
import { loginUserAccount } from "../../services/authService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/other";
import { ResponseMessage } from "../../config/system";
import FormInput from "../../components/FormInput";
import { FormControlLabel } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAccount = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const result = await loginUserAccount(userAccount);
    switch (result.message) {
      case ResponseMessage.LOGIN_SUCCESS:
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        navigate("/");
        break;
      case ResponseMessage.WRONG_ACCOUNT_OR_PASSWORD:
        dispatch(showAlert({ type: "error", message: "Tài khoản hoặc mật khẩu không đúng!" }))
        break;
      case ResponseMessage.ACCOUNT_INACTIVE:
        dispatch(showAlert({ type: "error", message: "Tài khoản đã bị khóa!" }))
        break;
      case ResponseMessage.LOGIN_FAILED:
        dispatch(showAlert({ type: "error", message: "Email hoặc mật khẩu không đúng!" }))
        break;
      default:
        break;
    }

    if (e.target.rememberPasswod.checked) {
      localStorage.setItem("email", e.target.email.value);
      localStorage.setItem("password", e.target.password.value);
    }
    else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };
  return (
    <div
      style={{ backdropFilter: "blur(20px)" }}
      className="w-[500px] max-w-[500px] border rounded-xl border-slate-400 p-5 text-slate-200 min-h-[560px]"
    >
      <div className="text-center font-semibold text-4xl mb-6">Đăng nhập</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormInput label="Email" name="email" type="email" placeholder="Nhập email" defaultValue={localStorage.getItem("email") || ""} />
        </div>
        <div className="mb-3">
          <FormInput label="Mật khẩu" name="password" type="password" placeholder="Nhập mật khẩu" defaultValue={localStorage.getItem("password") || ""} />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember-password" name="rememberPasswod" defaultChecked={(localStorage.getItem("password") && localStorage.getItem("email")) ? true : false} />
            <label htmlFor="remember-password" className="text-sm" >
              Nhớ mật khẩu
            </label>
          </div>
          <Link to={"/user-account/forgot-password"} className=" text-sm hover:underline">
            Quên mật khẩu
          </Link>
        </div>
        <div className="mb-4">
          <button className="p-2 w-full bg-sky-500 duration-200 hover:bg-sky-600 text-slate-50 rounded-md">
            Đăng nhập
          </button>
        </div>
        <div className="mb-10">
          <p className="text-sm text-center">
            Chưa có tài khoản?{" "}
            <Link
              to={"/user-account/register"}
              className="hover:underline font-bold"
            >
              Đăng ký
            </Link>
          </p>
        </div>
        <div>
          <div className="mb-5 text-center text-base">Hoặc đăng nhập với</div>
          <div className="flex justify-center gap-4">
            <a href="#">
              <img src="/images/google.png" alt="" className="w-14 h-14 duration-300 hover:scale-110" />
            </a>
            <a href="#">
              <img src="/images/facebook.png" alt="" className="w-14 h-14 duration-300 hover:scale-110" />
            </a>
          </div>
        </div>
      </form>
    </div>

  );
}

export default Login;
