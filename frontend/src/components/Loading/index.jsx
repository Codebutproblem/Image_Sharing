import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function Loading() {
  const loading = useSelector((state) => state.LoadingReducer);
  return (
    <>
      {loading && (
        <div className="fixed z-[150] bg-[#00000040] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <CircularProgress disableShrink size={60} color="primary" />
        </div>
      )}
    </>
  );
}

export default Loading;
