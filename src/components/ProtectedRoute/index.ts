import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = { component: () => JSX.Element };

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("This Route is Protected");
    navigate("/home");
  }, []);

  return component();
}
