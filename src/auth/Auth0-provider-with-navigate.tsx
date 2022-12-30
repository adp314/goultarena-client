import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithNavigate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID as string;
  const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE as string;

  const navigate = useNavigate();

  const onRedirectCallback = () => {
    navigate(window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
