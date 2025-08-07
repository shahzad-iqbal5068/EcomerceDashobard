import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SaleProfitChart = () => {
  // ✅ Define Sample Data
  const data = [
    { name: "Jan", sales: 4000, profit: 2400 },
    { name: "Feb", sales: 3000, profit: 1398 },
    { name: "Mar", sales: 2000, profit: 9800 },
    { name: "Apr", sales: 2780, profit: 3908 },
    { name: "May", sales: 1890, profit: 4800 },
    { name: "Jun", sales: 2390, profit: 3800 },
  ];

  return (
    <div> 

      {/*Responsive Container for Auto-sizing */}
      <ResponsiveContainer width="100%" className={'bg-slate-100 block'} height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/*Sales Bar */}
          <Bar dataKey="sales" fill="#8884d8" name="Sales" />
          {/*Profit Bar */}
          <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SaleProfitChart ;
