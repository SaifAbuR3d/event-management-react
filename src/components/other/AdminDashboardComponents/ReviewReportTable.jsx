import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Popover,
  Select,
  Skeleton,
  TableFooter,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetReviewReports, useSetStatusSeen } from "../../../API/AdminApi";
import ReportDialog from "./ReportDialog";
import { FilterListSharp } from "@mui/icons-material";

export default function ReviewReportTable() {
  const [sortType, setSortType] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState({});
  const [status, setStatus] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);

  const { mutateAsync } = useSetStatusSeen();

  const handleOpen = async (row) => {
    row.status === "Pending" && (await mutateAsync(row.id));
    setReport(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSortType = (event) => setSortType(event.target.value);

  const handleChangePage = (event, newPage) => setPageNumber(newPage);

  const handleStatus = (event) => setStatus(event.target.value);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const openFilter = Boolean(anchorEl);

  const { data, isLoading } = useGetReviewReports(pageNumber, sortType, status);

  const { Reports, totalPages } = data || {};

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

  const seen = {
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

  const DESIRED_ROW_COUNT = 6;
  const placeholderRowCount = Math.max(
    DESIRED_ROW_COUNT - (Reports?.length || 0),
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
                <TableCell align="left" colSpan={4}>
                  <Typography component="h1" variant="h5" fontWeight="600">
                    All Reports
                  </Typography>
                </TableCell>
                <TableCell align="right" colSpan={1}>
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
                            <MenuItem value={"Seen"}>Seen</MenuItem>
                          </Select>
                        </Box>
                      </Box>
                    </Popover>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {[
                  "Event Id",
                  "Event Name",
                  "Attendee Name",
                  "Organizer Name",
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
              {Reports?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleOpen(row)}
                  style={{ cursor: "pointer" }}
                >
                  <StyledTableCell content={row.eventId} />
                  <StyledTableCell content={row.eventName} />
                  <StyledTableCell content={row.attendeeUserName} />
                  <StyledTableCell content={row.organizerUserName} />
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    <Button
                      sx={
                        row.status === "Pending" ? { ...pending } : { ...seen }
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
                    {Array.from(new Array(5)).map((_, index) => (
                      <TableCell key={index} align="center">
                        <Skeleton
                          sx={{ m: "auto" }}
                          animation="wave"
                          width="60%"
                          variant="text"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!isLoading &&
                Array.from(new Array(placeholderRowCount)).map((_, index) => (
                  <TableRow key={`placeholder-${index}`}>
                    {Array.from(new Array(5)).map((_, index) => (
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
              <ReportDialog
                open={open}
                handleClose={handleClose}
                report={report}
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
        </TableContainer>
      </Box>
    </Grid>
  );
}
