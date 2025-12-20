import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useAppDispatch } from "@/hooks/hook";
import { LineChartThunk } from "@/slices/warranty/warrantyThunk";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WarrantiesLineChart = () => {
  const dispatch = useAppDispatch();

  const { lineChartData = [], loadingWarranties } = useSelector(
    (state: RootState) => state.warranty
  );

  useEffect(() => {
    dispatch(LineChartThunk());
  }, [dispatch]);

  const chartData = lineChartData.map((item) => ({
    month: new Date(0, item._id - 1).toLocaleString("default", {
      month: "short",
    }),
    total: item.total,
  }));


  if (loadingWarranties) {
    return <p>Loading chart...</p>;
  }

  return (
    <div>
      {/* Chart Title */}
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
        Warranties Added Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#33334d" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            interval={0}
            tickMargin={10}
            angle={-20}
            textAnchor="end"
            label={{
              position: "insideBottom",
              offset: 0,
              fill: "#ccc",
            }}
          />

          <YAxis
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            label={{
              value: "Warranties",
              angle: -90,
              position: "insideLeft",
              offset: 0,
              fill: "#ccc",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#2a2a40",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              marginTop:90
            }}
            itemStyle={{ color: "#fff" }}
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ stroke: "#4F46E5", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  
};

export default WarrantiesLineChart;
