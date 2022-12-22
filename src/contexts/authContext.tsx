import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(undefined);

type User = { token?: string; user: any };

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>({
    token: "",
    user: {},
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.token) {
      setLoggedInUser(parsedStoredUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
