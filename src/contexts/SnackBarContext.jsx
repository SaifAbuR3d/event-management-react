import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { createContext } from "react";

const SnackBarContext = createContext();

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typeColor, setTypeColor] = useState("info");
  const [variant, setVariant] = useState("standard");

  const showSnackBar = (text, color, variant) => {
    setMessage(text);
    setTypeColor(color);
    setVariant(variant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setTypeColor("info"); // Reset to default after close
      setVariant("standard");
    }, "1000");
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeColor} variant={variant}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = () => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
