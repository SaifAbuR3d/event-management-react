import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAttendeeList } from "../../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";
import {
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

export default function AttendeeList() {
  const { eventId } = useParams();
  const [verifiedFilter, setVerifiedFilter] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const [pageSize, setPageSize] = React.useState(5);

  const handleVerifiedFilterChange = (event) => {
    setVerifiedFilter(event.target.value);
    console.log(verifiedFilter);
  };

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const {
    data: testData,
    isLoading: isLoadingTestData,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useAttendeeList(eventId, pageSize, verifiedFilter, sortModel);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 230,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        dayjs(params.row.dateOfBirth).format("YYYY-MM-DD"),
    },
    {
      field: "isVerified",
      headerName: "Verified",
      width: 200,
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
    <Box
      sx={{
        width: "60%",
        minHeight: "90vh",
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
              <MenuItem value={false}>All</MenuItem>
              <MenuItem value={true}>Only Verified</MenuItem>
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
          minHeight: 400,
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
      />
    </Box>
  );
}
