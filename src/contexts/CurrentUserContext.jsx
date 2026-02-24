import { createContext, useState, useEffect, useCallback } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { getUserProfile, signin, signup } from "../utils/auth";

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const checkToken = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsAuthLoading(false);
      return;
    }
    try {
      const user = await getUserProfile();
      setCurrentUser(user);
      setIsLoggedIn(true);
    } catch {
      removeToken();
      setCurrentUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleSignIn = async ({ email, password }) => {
    const data = await signin({ email, password });
    setToken(data.token);
    const user = await getUserProfile();
    setCurrentUser(user);
    setIsLoggedIn(true);
    return user;
  };

  const handleSignUp = async ({ name, avatar, email, password }) => {
    await signup({ name, avatar, email, password });
    const data = await signin({ email, password });
    setToken(data.token);
    const user = await getUserProfile();
    setCurrentUser(user);
    setIsLoggedIn(true);
    return user;
  };

  const handleSignOut = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const value = {
    currentUser,
    isLoggedIn,
    isAuthLoading,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleUpdateUser,
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
