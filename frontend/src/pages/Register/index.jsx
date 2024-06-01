import { Link, useNavigate} from "react-router-dom";
import { registerUserAccount } from "../../services/authService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../actions/alert";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAccount = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      gender: e.target.gender.value,
    };
    const result = await registerUserAccount(userAccount);
    switch (result.message) {
      case "register-success":
        dispatch(showAlert({ type: "success", message: "Đăng ký thành công!" }));
        navigate("/user-account/login");
        break;
      case "email-existed":
        dispatch(showAlert({ type: "error", message: "Email đã tồn tại!" }));
        break;
      case "username-existed":
        dispatch(showAlert({ type: "error", message: "Tên tài khoản đã tồn tại!" }));
        break;
      case "password-incorrect":
        dispatch(showAlert({ type: "error", message: "Mật khẩu không khớp!" }));
        break;
      default:
        dispatch(showAlert({ type: "error", message: "Đăng ký thất bại!" }));
        break;
    }
  };
  return (
    <>
      <div className="text-center font-semibold text-3xl mb-6">Đăng ký</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-50">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm text-black"
            placeholder="Nhập email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-50">
            Tên tài khoản
          </label>
          <input
            name="username"
            type="text"
            className="mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm text-black"
            placeholder="Nhập tên tài khoản"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-50">
            Mật khẩu
          </label>
          <input
            name="password"
            type="password"
            className="mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm text-black"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-50">
            Xác nhận mật khẩu
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm text-black"
            placeholder="Nhập xác nhận mật khẩu"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <div className="text-sm font-medium text-slate-50">Giới tính:</div>
          <div className="ms-3">
            <input
              type="radio"
              name="gender"
              id="male-gender"
              value={"male"}
              defaultChecked
              required
            />
            <label htmlFor="male-gender" className="ms-1">
              Nam
            </label>
          </div>
          <div className="ms-3">
            <input
              type="radio"
              name="gender"
              id="female-gender"
              value={"female"}
              required
            />
            <label htmlFor="female-gender" className="ms-1">
              Nữ
            </label>
          </div>
        </div>
        <div className="mb-4">
          <button className="p-2 w-full bg-orange-500 hover:bg-orange-600 text-slate-50 rounded-md">
            Đăng ký
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-center">
            Đã có tài khoản?{" "}
            <Link
              to={"/user-account/login"}
              className="hover:underline font-bold"
            >
              Đăng nhập
            </Link>{" "}
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
