import { createContext, useState } from "react";

export let RegisterContext = createContext();

export default function RegisterContextProvider({ children }) {
  const [basicData, setBasicData] = useState({});
  return (
    <RegisterContext.Provider value={{ basicData, setBasicData }}>
      {children}
    </RegisterContext.Provider>
  );
}
