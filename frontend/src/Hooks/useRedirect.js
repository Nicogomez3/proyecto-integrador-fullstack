import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRedirect = (redirectTo) => {
    const { loggedInUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (loggedInUser && redirectTo) {
        navigate(redirectTo); // Redirige solo si `redirectTo` tiene un valor válido
      }
    }, [loggedInUser, navigate, redirectTo]);
  };
  
  export default useRedirect;