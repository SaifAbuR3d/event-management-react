import { AttachMoney, Group } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import MyPieChart from "../../../other/eventDashboardComponents/MyPieChart";
import { useGetEventStatus } from "../../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";
import MainLoding from "../../../looding/MainLoding";
import dayjs from "dayjs";
import MyBarChart from "../../../other/eventDashboardComponents/MyBarChart";
import SoldTicketsAreaChart from "../../../other/eventDashboardComponents/SoldTicketsAreaChart";

export default function EventDashboardHome() {
  const { eventId } = useParams();
  const { data, isLoading } = useGetEventStatus(eventId);

  if (isLoading) {
    return <MainLoding isLoading={isLoading} />;
  }

  const PieChatData = [
    {
      name: "Available Ticket",
      value: data.totalTicketsAvailable,
    },
    {
      name: "Sold Ticket",
      value: data.totalTicketsSold,
    },
  ];

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Attendee</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{data.totalTicketsSold}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Revenue</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AttachMoney sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{data.totalRevenue}</Typography>
        </Box>
      </Paper>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: "1/4",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography fontWeight={"bold"}>
            Attendees who have recently bought tickets
          </Typography>
          <List>
            {data.attendeesRecentlyBought.map((attendee, index) => (
              <Box key={attendee.attendeeId}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={attendee.userName}
                      src={
                        attendee?.imageUrl
                          ? `${import.meta.env.VITE_API_URL}/${
                              attendee?.imageUrl
                            }`
                          : ""
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={attendee.fullName}
                    secondary={`Time Created: ${dayjs(
                      attendee.transactionDate
                    ).format("YYYY-MM-DD, H:mm:ss")}`}
                  />
                </ListItem>
                {index < data?.attendeesRecentlyBought?.length - 1 && (
                  <Divider variant="inset" />
                )}
              </Box>
            ))}
            {data.attendeesRecentlyBought.length === 0 && (
              <Typography variant="body1">
                There is no attendees who have recently bought tickets
              </Typography>
            )}
          </List>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, flexGrow: "1", display: "flex", alignItems: "center" }}
        >
          <MyBarChart barChartData={data.tickets} />
        </Paper>
      </Box>

      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <MyPieChart PieChatData={PieChatData} />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <SoldTicketsAreaChart sellingTrack={data.sellingTrack} />
      </Paper>
    </Box>
  );
}
