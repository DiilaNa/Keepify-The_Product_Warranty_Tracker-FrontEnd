import type { RootState } from "@/app/store";
import { useAppDispatch } from "@/hooks/hook";
import { BarChartThunk } from "@/slices/brands/brandsThunk";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopProductsBarChart = () => {
  const { brands, loadingBrands } = useSelector(
    (state: RootState) => state.brands
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(BarChartThunk());
  }, [dispatch]);

  if (loadingBrands) return <p style={{ color: "#fff" }}>Loading chart...</p>;

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
        Top Registered Products
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={brands}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          barCategoryGap={100}
        >
          <CartesianGrid stroke="#444466" strokeDasharray="3 3" />

          <XAxis
            dataKey="brandName"
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            tickMargin={10}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
            label={{
              value: "Product Name",
              position: "bottom",
              offset: 20,
              fill: "#ccc",
            }}
          />

          <YAxis
            stroke="#ccc"
            tick={{ fill: "#ccc", fontSize: 12 }}
            label={{
              value: "Brands",
              angle: -90,
              position: "insideLeft",
              offset: -10,
              fill: "#ccc",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#2a2a40",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />

          <Bar
            dataKey="total"
            fill="#4F46E5"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            cursor="pointer"
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsBarChart;
