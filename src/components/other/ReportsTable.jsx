import React from "react";
import AdminTableData from "./AdminTableData";
import { Box, Grid } from "@mui/material";
import { useDrawer } from "../../contexts/DrawerContext";

export default function ReportsTable() {
  const { drawerOpen } = useDrawer();
  return (
    <Grid
      sx={{
        width: { xs: `calc(100% - 65px)` },
        ml: { xs: `65px` },
      }}
      minHeight="91vh"
      maxHeight="100vh"
      bgcolor="#f7fbff"
      display="flex"
      justifyContent="center"
    >
      <Box mt={5} width={1200} ml={5} mr={5}>
        <AdminTableData />
      </Box>
    </Grid>
  );
}
