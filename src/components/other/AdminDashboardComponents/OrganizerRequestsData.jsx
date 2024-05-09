import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Popover,
  Grid,
} from "@mui/material";
import { useGetAtendeeIVRs } from "../../../API/AdminApi";
import { FilterListSharp } from "@mui/icons-material";
import VerificationDialog from "./VerificationDialog";

export default function OrganizerRequestsData() {
  const [sortType, setSortType] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = async (row) => {
    setRequest(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSortType = (event) => setSortType(event.target.value);

  const handleStatus = (event) => setStatus(event.target.value);

  const handleType = (event) => setType(event.target.value);

  const handleChangePage = (event, newPage) => setPageNumber(newPage);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const openFilter = Boolean(anchorEl);

  const { data, isLoading } = useGetAtendeeIVRs(
    false,
    true,
    type,
    status,
    pageNumber,
    sortType
  );

  const { IVRs, totalPages } = data || {};

  const StyledTableCell = ({ content, style }) => (
    <TableCell align="center" sx={{ padding: "14px", ...style }}>
      <Typography fontWeight={400}>{content}</Typography>
    </TableCell>
  );

  const pending = {
    width: "90px",
    border: "orange solid 1.5px",
    bgcolor: "#fff3e0",
    color: "orange",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#fff3e0",
      boxShadow: "none",
    },
  };

  const approved = {
    width: "90px",
    border: "green solid 1.5px",
    bgcolor: "#e8f5e9",
    color: "green",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#e8f5e9",
      boxShadow: "none",
    },
  };

  const rejected = {
    width: "90px",
    border: "red solid 1.5px",
    bgcolor: "#ffebee",
    color: "red",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#ffebee",
      boxShadow: "none",
    },
  };

  const DESIRED_ROW_COUNT = 6;
  const placeholderRowCount = Math.max(
    DESIRED_ROW_COUNT - (IVRs?.length || 0),
    0
  );

  return (
    <Grid
      sx={{
        width: { xs: `calc(100% - 55px)` },
        height: { xs: `calc(100vh - 64px)` },
        ml: { xs: `55px` },
      }}
      bgcolor="#f7fbff"
      display="flex"
      justifyContent="center"
    >
      <Box mt={5} width={1200} ml={5} mr={5}>
        <TableContainer component={Paper} sx={{ borderRadius: "2%" }}>
          <Table>
            <TableHead>
              <TableRow style={{ height: "85px" }}>
                <TableCell align="left" colSpan={3}>
                  <Typography component="h1" variant="h5" fontWeight="600">
                    All Requests
                  </Typography>
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  <Box
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                    flexDirection="row"
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={handleFilterClick}
                      sx={{ marginRight: "10px" }}
                      startIcon={<FilterListSharp />}
                    >
                      Filters
                    </Button>
                    <Popover
                      open={openFilter}
                      anchorEl={anchorEl}
                      onClose={handleFilterClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Box p={2}>
                        <Box>
                          <Typography>Type:</Typography>
                          <Select
                            variant="standard"
                            value={type}
                            onChange={handleType}
                            sx={{ width: "150px", mt: 1 }}
                          >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Passport"}>Passport</MenuItem>
                            <MenuItem value={"NationalId"}>
                              National Id
                            </MenuItem>
                            <MenuItem value={"DriverLicense"}>
                              Driver License
                            </MenuItem>
                            <MenuItem value={"SchoolCard"}>
                              School Card
                            </MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </Box>
                        <Box mt={3}>
                          <Typography>Status:</Typography>
                          <Select
                            variant="standard"
                            value={status}
                            onChange={handleStatus}
                            sx={{ width: "150px", mt: 1 }}
                          >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                          </Select>
                        </Box>
                        <Box mt={3}>
                          <Typography>Sorted by:</Typography>
                          <Select
                            variant="standard"
                            value={sortType}
                            onChange={handleSortType}
                            sx={{ width: "150px", mt: 1 }}
                          >
                            <MenuItem value={"desc"}>Newest</MenuItem>
                            <MenuItem value={"asc"}>Oldest</MenuItem>
                          </Select>
                        </Box>
                      </Box>
                    </Popover>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {[
                  "Organizer Id",
                  "Organizer Name",
                  "Document Type",
                  "Status",
                ].map((x, index) => (
                  <TableCell key={index} align="center">
                    <Typography fontWeight={600} fontSize={"17px"}>
                      {x}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {IVRs?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleOpen(row)}
                  style={{ cursor: "pointer" }}
                >
                  <StyledTableCell content={row.userId} />
                  <StyledTableCell content={row.userName} />
                  <StyledTableCell content={row.documentType} />
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    <Button
                      sx={
                        row.status === "Pending"
                          ? { ...pending }
                          : row.status === "Approved"
                          ? { ...approved }
                          : { ...rejected }
                      }
                    >
                      {row.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {isLoading &&
                Array.from(new Array(6)).map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {Array.from(new Array(4)).map((_, index) => (
                      <TableCell key={index} align="center">
                        <Skeleton
                          sx={{ m: "auto"}}
                          animation="wave"
                          width="60%"
                          variant="text"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!isLoading && Array.from(new Array(placeholderRowCount)).map((_, index) => (
                <TableRow key={`placeholder-${index}`}>
                  {Array.from(new Array(4)).map((_, index) => (
                    <StyledTableCell
                      key={`placeholder-cell-${index}`}
                      style={{
                        height: "66.5px",
                        border: "none",
                        bgcolor: "#f5f5f5",
                      }}
                    />
                  ))}
                </TableRow>
              ))}
              <VerificationDialog
                open={open}
                handleClose={handleClose}
                request={request}
              />
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Box display="flex" justifyContent="center">
                    <Pagination
                      count={totalPages}
                      page={pageNumber}
                      onChange={handleChangePage}
                      variant="outlined"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      siblingCount={0}
                      boundaryCount={1}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>{" "}
      </Box>
    </Grid>
  );
}
