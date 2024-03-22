import { DateRange, LocationOn, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";

export default function TitleAndSubtitleCard({
  title,
  subtitle,
  forWhat = "none",
}) {
  const baseCard = () => (
    <Paper
      elevation={3}
      sx={{
        width: "95%",
        minHeight: "100px",
        mt: 1,
        mb: "50px",
        ml: 2,
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box display="flex" gap="17px">
        {forWhat == "date" && <DateRange />}
        {forWhat == "location" && <LocationOn />}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {subtitle}
        </Typography>
      </Box>
      {forWhat == "location" && (
        <Box>
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
              sx={{
                justifyContent: "flex-start",
                gap: "3px",
                "& .MuiAccordionSummary-content": {
                  flexGrow: 0,
                },
              }}
              expandIcon={<ExpandMore />}
            >
              Show Map
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Paper>
  );

  return baseCard();
}
