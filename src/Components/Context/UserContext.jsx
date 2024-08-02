import { useState, useContext, createContext, useEffect } from "react";

// create user context
const UserContext = createContext();

const initialUserData = {
  email: "",
  id: "",
};

export const UserProvider = ({ children }) => {
  const [user, setUser]=useState(initialUserData);
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : initialUserData;
  // });

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
