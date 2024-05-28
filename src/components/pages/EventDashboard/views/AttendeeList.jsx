import { DataGrid } from "@mui/x-data-grid";
import { useAttendeeList } from "../../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { Cancel, CheckCircle } from "@mui/icons-material";
import CustomNoRowsOverlay from "../../../other/eventDashboardComponents/CustomNoRowsOverlay.jsx";
import { useMemo, useState } from "react";

export default function AttendeeList() {
  const { eventId } = useParams();
  const [pageSize, setPageSize] = useState(5);
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [sortModel, setSortModel] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const {
    data: AtendeeData,
    isLoading: isLoadingTestData,
    fetchPreviousPage,
    hasPreviousPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useAttendeeList(eventId, pageSize, verifiedFilter, sortModel);

  const columns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "attendeeProfilePictureUrl",
        headerName: "Avatar",
        flex: 0.5,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={
                params.row.imageUrl
                  ? `${import.meta.env.VITE_API_URL}/${params.row.imageUrl}`
                  : null
              }
              alt={params.row.fullName}
            />
          </Box>
        ),
      },
      {
        field: "fullName",
        headerName: "Full Name",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "gender",
        headerName: "Gender",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "dateOfBirth",
        headerName: "Date of Birth",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) =>
          dayjs(params.row.dateOfBirth).format("YYYY-MM-DD"),
      },
      {
        field: "isVerified",
        headerName: "Verified",
        flex: 1,
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) =>
          params.value ? (
            <CheckCircle color="secondary" />
          ) : (
            <Cancel color="error" />
          ),
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (!AtendeeData) return [];
    const currentPageData = AtendeeData.pages.find(
      (page) => page.currentPage === paginationModel.page + 1
    );
    return currentPageData ? currentPageData.data : [];
  }, [AtendeeData, paginationModel]);

  const totalRows = AtendeeData?.pages[0]?.TotalCount ?? 0;

  const handlePaginationModelChange = (newModel) => {
    if (newModel.page > paginationModel.page && hasNextPage) {
      fetchNextPage();
    } else if (newModel.page < paginationModel.page && hasPreviousPage) {
      fetchPreviousPage();
    }
    setPaginationModel(newModel);
    setPageSize(newModel.pageSize);
  };

  const handleVerifiedFilterChange = (event) => {
    setVerifiedFilter(event.target.value);
  };

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  return (
    <Box
      sx={{
        width: "80%",
        minHeight: "100%",
        m: "auto",
        mt: "100px",
      }}
    >
      {/* Custom Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="24px 32px"
        border="1px solid #e0e0e0"
        borderBottom="transparent"
        borderRadius="4px 4px 0px 0px"
        bgcolor="#f5f5f5"
      >
        <Typography variant="h5" fontWeight="700">
          Attendee List
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={0}>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel>Verified Filter</InputLabel>
            <Select
              label="Verified Filter"
              value={verifiedFilter}
              onChange={handleVerifiedFilterChange}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={true}>Only Verified</MenuItem>
              <MenuItem value={false}>Only Unverified</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <DataGrid
        autoHeight
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        disableColumnFilter={true}
        disableDensitySelector={true}
        disableColumnMenu={true}
        disableRowSelectionOnClick
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        rowCount={totalRows}
        loading={
          isLoadingTestData || status === "loading" || isFetchingNextPage
        }
        pageSizeOptions={[5, 10, 25]}
        rowsPerPageOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePaginationModelChange}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          width: "100%",
          minHeight: 400,
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
      />
    </Box>
  );
}
