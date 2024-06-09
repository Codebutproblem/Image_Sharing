import { sendOTP, verifyOTP } from "../../services/authService";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/other";
import OtpInput from 'react-otp-input';
import { ResponseMessage } from "../../config/system";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
function ForgotPassword() {

    const [sent, setSent] = useState(false);
    const [otp, setOtp] = useState("");
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sent) {
            const result = await sendOTP(inputRef.current.value);
            if (result.message === ResponseMessage.SEND_OTP_SUCCESS) {
                setSent(true);
                dispatch(showAlert({ type: "success", message: "Mã xác thực đã được gửi" }));
            } else {
                dispatch(showAlert({ type: "error", message: "Email không tồn tại" }));
            }
        }
        else {
            if ((/^\d+$/).test(otp) === false || otp.length !== 6) {
                dispatch(showAlert({ type: "error", message: "Mã xác thực không hợp lệ" }));
                return;
            }
            const result = await verifyOTP({ email: inputRef.current.value, otp });
            if (result.message === "verify-otp-success") {
                dispatch(showAlert({ type: "success", message: "Xác thực thành công" }));
            } else {
                dispatch(showAlert({ type: "error", message: "Mã xác thực không đúng" }));
            }
        }
    };

    const sendOTPAgain = async () => {
        const result = await sendOTP(inputRef.current.value);
        if (result.message === ResponseMessage.SEND_OTP_SUCCESS) {
            dispatch(showAlert({ type: "success", message: "Mã xác thực đã được gửi" }));
        } else {
            dispatch(showAlert({ type: "error", message: "Email không tồn tại" }));
        }
    };
    return (
        <div
            style={{
                backdropFilter: "blur(15px)",
            }}
            className="w-[500px] max-w-[500px] border rounded-xl border-slate-400 p-5 text-slate-200 min-h-[300px]"
        >
            <div className="text-center font-semibold text-4xl mb-6">Xác thực tài khoản</div>
            <form onSubmit={handleSubmit} className="mb-12">
                <div className="mb-5">
                    <FormInput label="Email" name="email" type="email" placeholder="Nhập email" readOnly={sent} inputRef={inputRef} />
                </div>
                {sent &&
                    <div className="mb-10">
                        <label className="block text-center text-lg font-medium text-slate-50 mb-2">
                            Mã xác thực
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className=" font-medium text-xl">-</span>}
                            renderInput={(props) => <input {...props} />}
                            containerStyle="flex justify-center gap-2"
                            inputStyle="text-black text-3xl mt-1 min-w-[40px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                        />
                    </div>
                }
                <div className="mb-4 flex gap-2">
                    {sent &&
                        <span
                            onClick={sendOTPAgain}
                            className="text-center w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                            Gửi lại
                        </span>
                    }
                    <button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {sent ? "Xác nhận" : "Gửi mã xác thực"}
                    </button>

                </div>
            </form>
            <div className="text-center">
                <Link to={"/user-account/login"} className="inline-block p-3 border border-slate-400 rounded-full duration-200 hover:text-black hover:bg-slate-50">
                    <IoMdArrowRoundBack className="text-3xl"/>
                </Link>
            </div>
        </div>

    );
}

export default ForgotPassword;