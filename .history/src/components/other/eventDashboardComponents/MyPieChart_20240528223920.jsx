import { Box, Stack, Typography } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function MyPieChart({ PieChatData }) {
  console.log(PieChatData);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          cx={200}
          cy={200}
          data={PieChatData}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {PieChatData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Tikits</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {PieChatData[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
