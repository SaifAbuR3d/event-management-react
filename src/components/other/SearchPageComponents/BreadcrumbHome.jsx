import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Search } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
}

export default function BreadcrumbHome() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          to={"/"}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <Search sx={{ mr: 0.5 }} fontSize="inherit" />
          Search
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
