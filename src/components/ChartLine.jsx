import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import reportServices from "../services/reportServices"
import toast from "react-hot-toast"

const LineChartReport = () => {
  const [data, setData] = useState([])

  const fetchLineData = async () => {
    try {
      const res = await reportServices.getMonthlySales()

      const formatted = res.data.map(item => ({
        name: item.month,
        sales: item.totalSales,
        sold: item.totalSold
      }))
      setData(formatted)
    } catch (error) {
      console.error("Error fetching line chart data:", error)
      toast.error("Failed to load line chart")
    }
  }

  useEffect(() => {
    fetchLineData()
  }, [])

  return (
   <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
      <h2 className="flex justify-between items-center mb-6 font-semibold">Sales Trend (Monthly)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Total Sales") {
                  return [`Rp ${value.toLocaleString("id-ID")}`, "Sales"];
                }
                if (name === "Total Sold") {
                  return [value, "Sold"];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Sales"
            />
            <Line
              type="monotone"
              dataKey="sold"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Sold"
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default LineChartReport
