import { Link, useNavigate } from "react-router-dom";
import { loginUserAccount } from "../../services/authService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../actions/other";

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
      case "login-success":
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        navigate("/");
        break;
      case "login-failed":
        dispatch(showAlert({ type: "error", message: "Email hoặc mật khẩu không đúng!" }))
        break;
      case "account-inactive":
        dispatch(showAlert({ type: "error", message: "Tài khoản đã bị khóa!" }))
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="text-center font-semibold text-3xl mb-6">Đăng nhập</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-50">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="text-black mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-1">
          <label className="block text-sm font-medium text-slate-50">
            Mật khẩu
          </label>
          <input
            name="password"
            type="password"
            className="text-black mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember-password" />
            <label htmlFor="remember-password" className="text-sm">
              Nhớ mật khẩu
            </label>
          </div>
          <a href="/" className=" text-sm hover:underline">
            Quên mật khẩu
          </a>
        </div>
        <div className="mb-4">
          <button className="p-2 w-full bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-md">
            Đăng nhập
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-center">
            Chưa có tài khoản?{" "}
            <Link
              to={"/user-account/register"}
              className="hover:underline font-bold"
            >
              Đăng ký
            </Link>{" "}
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
