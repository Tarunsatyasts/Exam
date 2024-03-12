// IdContext.js
import { createContext, useContext, useEffect, useState } from "react";

const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [id, setId] = useState();
  useEffect(() => {
    // Save the id to sessionStorage whenever it changes
    sessionStorage.setItem("id", id);
  }, [id]);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};

export const useId = () => {
  return useContext(IdContext);
};
