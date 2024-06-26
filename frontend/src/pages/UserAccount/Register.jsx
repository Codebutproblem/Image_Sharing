import { Link, useNavigate } from "react-router-dom";
import { registerUserAccount } from "../../services/authService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/other";
import ResponseMessage from "../../config/message";
import FormInput from "../../components/FormInput";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAccount = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };
    const result = await registerUserAccount(userAccount);
    switch (result.message) {
      case ResponseMessage.REGISTER_SUCCESS:
        dispatch(
          showAlert({ type: "success", message: "Đăng ký thành công!" }),
        );
        navigate("/user-account/login");
        break;
      case ResponseMessage.FIELD_REQUIRED:
        dispatch(
          showAlert({
            type: "error",
            message: "Vui lòng điền đầy đủ thông tin!",
          }),
        );
        break;
      case ResponseMessage.EMAIL_EXISTED:
        dispatch(showAlert({ type: "error", message: "Email đã tồn tại!" }));
        break;
      case ResponseMessage.PASSWORD_NOT_MATCH:
        dispatch(showAlert({ type: "error", message: "Mật khẩu không khớp!" }));
        break;
      default:
        dispatch(showAlert({ type: "error", message: "Đăng ký thất bại!" }));
        break;
    }
  };
  return (
    <div className="px-6 w-[500px] max-w-[500px] min-w-[300px] border rounded-xl border-slate-400 p-5 text-slate-200 min-h-[560px] backdrop-blur-lg">
      <div className="text-center font-semibold text-4xl mb-6">Đăng ký</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-4">
          <FormInput
            label="Tên tài khoản"
            name="username"
            type="text"
            placeholder="Nhập tên tài khoản"
          />
        </div>
        <div className="mb-4">
          <FormInput
            label="Mật khẩu"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-4">
          <FormInput
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            placeholder="Nhập xác nhận mật khẩu"
          />
        </div>
        <div className="mb-4">
          <button className="p-2 w-full duration-200 bg-orange-500 hover:bg-orange-600 text-slate-50 rounded-md">
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
    </div>
  );
}

export default Register;
