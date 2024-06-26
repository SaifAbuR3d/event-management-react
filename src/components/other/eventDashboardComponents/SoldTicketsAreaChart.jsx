import dayjs from "dayjs";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SoldTicketsAreaChart({ sellingTrack }) {
  const salesData = useMemo(() => {
    const endDate =
      sellingTrack.length > 0
        ? new Date(sellingTrack[sellingTrack.length - 1].date)
        : new Date();

    const ticketsMap = new Map();

    for (let i = 6; i >= 0; i--) {
      const date = dayjs(endDate).subtract(i, "day").format("D-MMM");
      ticketsMap.set(date, 0);
    }

    sellingTrack.forEach(({ date, soldTickets }) => {
      const formattedDate = dayjs(date).format("D-MMM");
      ticketsMap.set(formattedDate, soldTickets);
    });

    return Array.from(ticketsMap, ([date, soldTickets]) => ({
      date,
      soldTickets,
    }));
  }, [sellingTrack]);

  return (
    <div style={{ width: "100%", height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={salesData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="soldTickets"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
