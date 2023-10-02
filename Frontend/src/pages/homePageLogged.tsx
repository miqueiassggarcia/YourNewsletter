import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomePageLogged() {
  const navigate = useNavigate();

  useEffect(() => {
    const validate = localStorage.getItem("validate");
    if(!validate) {
      navigate("/")
    }
  }, [navigate])

  return (
    <></>
  );
}