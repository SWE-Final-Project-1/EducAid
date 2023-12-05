import { api } from "@/api";
import React, { createContext } from "react";
import { useQuery } from "react-query";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const getUser = async () => {
    const { data: user } = await api.get("/auth/user");
    return user;
  };

  const { data: user, isLoading: userLoading } = useQuery(["user"], getUser, {
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });

  return (
    <userContext.Provider value={{ user, userLoading }}>
      {children}
    </userContext.Provider>
  );
};
