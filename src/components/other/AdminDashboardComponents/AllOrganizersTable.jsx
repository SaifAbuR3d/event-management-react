import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Popover,
  Select,
  Skeleton,
  TableFooter,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetAllOrganizers } from "../../../API/AdminApi";
import {
  Block,
  Edit,
  FilterListSharp,
  Unpublished,
  Verified,
} from "@mui/icons-material";
import DeleteUserDialog from "./DeleteUserDialog";
import EditOrganizerDialog from "./EditOrganizerDialog";
import { useNavigate } from "react-router-dom";

export default function AllOrganizersTable() {
  const [sortType, setSortType] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSortType = (event) => setSortType(event.target.value);

  const handleChangePage = (event, newPage) => setPageNumber(newPage);

  const handleStatus = (event) => setStatus(event.target.value);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const openFilter = Boolean(anchorEl);

  const handleOpenEdit = (row) => {
    setUser(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const { data, isLoading } = useGetAllOrganizers(pageNumber, sortType, status);

  const { Organizers, totalPages } = data || {};

  const StyledTableCell = ({ content, style }) => (
    <TableCell align="center" sx={{ padding: "14px", ...style }}>
      <Typography fontWeight={400}>{content}</Typography>
    </TableCell>
  );

  const DESIRED_ROW_COUNT = 6;
  const placeholderRowCount = Math.max(
    DESIRED_ROW_COUNT - (Organizers?.length || 0),
    0
  );

  function stringAvatar(name) {
    return {
      sx: {
        backgroundImage: "linear-gradient(to bottom, #c5cae9 , #f5fffa)",
        color: "black",
        border: "black solid 1px",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

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
                    All Organizers
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
                          <Typography>Sorted by:</Typography>
                          <Select
                            variant="standard"
                            value={sortType}
                            onChange={handleSortType}
                            sx={{ width: "120px", mt: 1 }}
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
                            sx={{ width: "120px", mt: 1 }}
                          >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"true"}>Verified</MenuItem>
                            <MenuItem value={"false"}>Not Verified</MenuItem>
                          </Select>
                        </Box>
                      </Box>
                    </Popover>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {[
                  "",
                  "Organizer Id",
                  "Organizer Name",
                  "Verification",
                  "Actions",
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
              {Organizers?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell
                    sx={{
                      padding: "14px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {row.imageUrl ? (
                      <Avatar
                        onClick={() =>
                          navigate(`/organizer-profile/${row.userName}`)
                        }
                        src={`${import.meta.env.VITE_API_URL}/${row.imageUrl}`}
                      />
                    ) : (
                      <Avatar
                        onClick={() =>
                          navigate(`/organizer-profile/${row.userName}`)
                        }
                        {...stringAvatar(row.userName)}
                      />
                    )}
                  </TableCell>
                  <StyledTableCell content={row.id} />
                  <StyledTableCell content={row.userName} />

                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row.isVerified ? (
                      <Verified fontSize="medium" color="primary" />
                    ) : (
                      <Unpublished fontSize="medium" color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={handleOpen}>
                      <Block />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {isLoading &&
                Array.from(new Array(6)).map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Skeleton
                        sx={{ m: "auto" }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    {Array.from(new Array(4)).map((_, cellIndex) => (
                      <TableCell key={cellIndex} align="center">
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
                          height: "68.5px",
                          border: "none",
                          bgcolor: "#f5f5f5",
                        }}
                      />
                    ))}
                  </TableRow>
                ))}

              <DeleteUserDialog open={open} handleClose={handleClose} />
              <EditOrganizerDialog
                open={openEdit}
                handleClose={handleCloseEdit}
                user={user}
              />
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
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
