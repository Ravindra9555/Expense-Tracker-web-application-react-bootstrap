// import { useState, useContext, createContext, useEffect } from "react";

// // create user context
// const UserContext = createContext();

// const initialUserData = {
//   email: "",
//   id: "",
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser]=useState(initialUserData);
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };
import { useState, useContext, createContext, useEffect } from "react";

// create user context
const UserContext = createContext();

const initialUserData = {
  email: "",
  id: "",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from local storage or session storage
    const localUserData = localStorage.getItem("user");
    const sessionUserData = sessionStorage.getItem("user");
    
    if (sessionUserData) {
      return JSON.parse(sessionUserData);
    } else if (localUserData) {
      return JSON.parse(localUserData);
    } else {
      return initialUserData;
    }
  });

  useEffect(() => {
    // Save user data to local storage and session storage whenever it changes
    if (user && user.id) {
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
