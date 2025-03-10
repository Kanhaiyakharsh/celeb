import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsChart = () => {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000); // Fetch every 60s
    return () => clearInterval(interval);
  }, []);

  if (!analytics) {
    return (
      <div className="has-text-centered">
        <p className="has-text-grey-dark">⏳ Loading analytics...</p>
        <progress className="progress is-small is-primary" max="100">Loading</progress>
      </div>
    );
  }

  // Data for bar chart
  const barChartData = [
    { name: "Users", count: analytics.totalUsers },
    { name: "Campaigns", count: analytics.totalCampaigns },
    { name: "Interests", count: analytics.totalInterests },
  ];

  // Data for pie chart
  const pieChartData = [
    { name: "Converted", value: analytics.conversionRate },
    { name: "Not Converted", value: 100 - analytics.conversionRate },
  ];

  return (
    <div className="box has-background-light p-5">
      <h2 className="title is-4 has-text-primary has-text-centered">📊 Admin Analytics</h2>

      <div className="columns">
        {/* Bar Chart */}
        <div className="column is-half">
          <div className="box">
            <h3 className="subtitle has-text-centered">📶 Platform Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="column is-half">
          <div className="box">
            <h3 className="subtitle has-text-centered">📈 Conversion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
