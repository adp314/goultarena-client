import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = { component: React.ReactNode };

export function ProtectedRoute(props: any) {
  const { component } = props;
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const parsedUser = JSON.parse(loggedInUser || '""');

  useEffect(() => {
    console.log(parsedUser);
    if (parsedUser.user.role !== "ADMIN") {
      navigate("/login");
    }
  }, []);

  return component;
}
