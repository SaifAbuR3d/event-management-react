import { Event, Group } from "@mui/icons-material";
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
import MyAreaChart from "../../../other/eventDashboardComponents/MyAreaChart";

export default function EventDashboardHome() {
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
          <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Tickets</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Event sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Attendees who have recently bought tickets</Typography>
          <List>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Attendees who liked the event recently</Typography>
          <List>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={"ahmad"} src={"asda"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"ahmad"}
                  secondary={`Time Created: 20-11-2002`}
                />
              </ListItem>
              <Divider variant="inset" />
            </Box>
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <MyPieChart />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <MyAreaChart />
      </Paper>
    </Box>
  );
}
