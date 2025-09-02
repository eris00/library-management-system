import Router from "./Router"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

function App() {

  const token = useAuthStore((state) => state.token);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe]);

  return (
    <>
      <Router />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
