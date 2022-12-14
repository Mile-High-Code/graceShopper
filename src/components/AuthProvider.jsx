import React, { useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { getMe } from "../axios-services/index";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const me = await getMe();
      if (me.id) {
        setUser(me);
      } else {
        setUser({});
      }
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
