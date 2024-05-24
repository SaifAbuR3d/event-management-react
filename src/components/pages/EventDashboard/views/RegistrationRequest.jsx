import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRegRequests } from "../../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import Actions from "../../../other/eventDashboardComponents/Actions";
import CustomNoRowsOverlay from "../../../other/eventDashboardComponents/CustomNoRowsOverlay";

function getStatusChip(status) {
  const statusMap = {
    Pending: {
      label: "Pending",
      color: "info",
    },
    Approved: {
      label: "Approved",
      color: "success",
    },
    Rejected: {
      label: "Rejected",
      color: "error",
    },
  };
  return statusMap[status] || { label: status, color: "default" };
}

const CustomLoadingOverlay = () => (
  <div style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>
    {Array.from(new Array(5)).map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        animation="wave"
        width="100%"
        height={60}
        style={{ marginBottom: 6 }}
      />
    ))}
  </div>
);

export default function RegistrationRequest() {
  const { eventId } = useParams();
  const [statusFilter, setStatusFilter] = React.useState("Pending");
  const [sortModel, setSortModel] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const [pageSize, setPageSize] = React.useState(5);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    console.log(statusFilter);
  };

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const {
    data: testData,
    isLoading: isLoadingTestData,
    fetchPreviousPage,
    hasPreviousPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetRegRequests(eventId, pageSize, statusFilter, sortModel);

  const columns = [
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
            src={params.row.attendeeProfilePictureUrl}
            alt={params.row.attendeeUserName}
          />
        </Box>
      ),
    },
    {
      field: "attendeeUserName",
      headerName: "User Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        dayjs(params.row.creationDate).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "lastModified",
      headerName: "Last Modified",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        dayjs(params.row.lastModified).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        const { label, color } = getStatusChip(params.value);
        return <Chip label={label} color={color} />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Actions params={params} />,
    },
  ];

  const rows = React.useMemo(() => {
    if (!testData) return [];
    const currentPageData = testData.pages.find(
      (page) => page.currentPage === paginationModel.page + 1
    );
    return currentPageData ? currentPageData.data : [];
  }, [testData, paginationModel]);

  const totalRows = testData?.pages[0]?.TotalCount ?? 0;

  const handlePaginationModelChange = (newModel) => {
    if (newModel.page > paginationModel.page && hasNextPage) {
      fetchNextPage();
    } else if (newModel.page < paginationModel.page && hasPreviousPage) {
      fetchPreviousPage();
    }
    setPaginationModel(newModel);
    setPageSize(newModel.pageSize);
  };

  return (
    <Box sx={{ width: "80%", minHeight: "100%", m: "auto", mt: "100px" }}>
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
          Registration Request
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={0}>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel>Status Filter</InputLabel>
            <Select
              label="Status Filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <DataGrid
        autoHeight={true}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: CustomLoadingOverlay,
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
          minHeight: 400,
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
      />
    </Box>
  );
}
