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
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  TableFooter,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useGetReports, useSetStatusSeen } from "../../API/AdminApi";
import { queryClient } from "../../main";
import ReportDialog from "./ReportDialog";

export default function BasicTable() {
  const [sortType, setSortType] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState({});

  const {mutateAsync} = useSetStatusSeen();

  const handleOpen = async (row) => {
    row.status === "Pending" && await mutateAsync(row.id);
    setReport(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSortType = (event) => {
    setSortType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  const { data, isLoading } = useGetReports(pageNumber, sortType);

  const { Reports } = data || {};

  const initialData = queryClient.getQueryData(["Reports", 1, "desc"]);

  const totalPages = initialData?.totalPages;

  const StyledTableCell = ({ content }) => (
    <TableCell align="center" sx={{ padding: "14px" }}>
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

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "2%" }}>
      <Table>
        <TableHead>
          <TableRow style={{ height: "85px" }}>
            <TableCell align="left" colSpan={2}>
              <Typography component="h1" variant="h5" fontWeight="600">
                All Reports
              </Typography>
            </TableCell>
            <TableCell align="right" colSpan={3}>
              <Box display="flex" justifyContent="end" alignItems="center">
                <Typography>Sorted by: </Typography>
                <Select
                  value={sortType}
                  label="Age"
                  onChange={handleSortType}
                  sx={{
                    width: "101px",
                    border: "none", // Remove border
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border for outlined variant
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border when focused
                    },
                  }}
                >
                  <MenuItem value={"desc"}>Newest</MenuItem>
                  <MenuItem value={"asc"}>Oldest</MenuItem>
                </Select>
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
                  variant="contained"
                  sx={row.status === "Pending" ? { ...pending } : { ...seen }}
                >
                  {row.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {isLoading &&
            Array.from(new Array(7)).map((_, index) => (
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
          <ReportDialog open={open} handleClose={handleClose} report={report}/>
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
  );
}
