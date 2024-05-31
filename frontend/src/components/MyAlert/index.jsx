import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { showAlert } from "../../actions/alert";
import { useEffect } from "react";

function MyAlert() {
    const alert = useSelector(state => state.AlertReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const timeRest = setTimeout(() => {
            dispatch(showAlert({ type: "hidden", message: "" }));
        }, 3000);
        return () => clearTimeout(timeRest);
      }, [alert]);
    return (
        <div className="fixed z-[100] top-20 right-12">
            {
                alert.type !== "hidden" && (
                    <Alert severity={alert.type}>{alert.message}</Alert>
                )
            }
        </div>
    )
}

export default MyAlert;