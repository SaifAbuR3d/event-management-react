import React, { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <DrawerContext.Provider
      value={{ drawerOpen, handleDrawerOpen, handleDrawerClose }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
