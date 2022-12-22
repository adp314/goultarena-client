import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = { component: React.ReactNode };

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { component } = props;
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const parsedUser = JSON.parse(loggedInUser || '""');

  useEffect(() => {
    console.log(parsedUser);
    if (!parsedUser) {
      navigate("/login");
    }
  }, []);

  return component;
}
