import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MyBarChart({ barChartData }) {
  const data = barChartData.map((ticket) => {
    return {
      name: ticket.name,
      "revenue $": ticket.revenue,
      "sold Tickets": ticket.soldTickets,
      "total Quantity": ticket.totalQuantity,
    };
  });

  return (
    <BarChart
      width={500}
      height={450}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sold Tickets" stackId="a" fill="#8884d8" />
      <Bar dataKey="total Quantity" stackId="a" fill="#82ca9d" />
      <Bar dataKey="revenue $" fill="#ffc658" />
    </BarChart>
  );
}
