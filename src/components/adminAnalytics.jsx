import React, { useState, useEffect } from "react";

const Analytics = () => {
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

  return (
    <div className="box has-background-light p-5">
      <h2 className="title is-4 has-text-primary has-text-centered">
        📊 Admin Analytics
      </h2>

      {analytics ? (
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="notification is-info">
              <p className="is-size-5 has-text-weight-semibold">👥 Total Users</p>
              <p className="is-size-4">{analytics.totalUsers}</p>
            </div>
          </div>

          <div className="column is-6">
            <div className="notification is-success">
              <p className="is-size-5 has-text-weight-semibold">📢 Total Campaigns</p>
              <p className="is-size-4">{analytics.totalCampaigns}</p>
            </div>
          </div>

          <div className="column is-6">
            <div className="notification is-warning">
              <p className="is-size-5 has-text-weight-semibold">⭐ Interest Markings</p>
              <p className="is-size-4">{analytics.totalInterests}</p>
            </div>
          </div>

          <div className="column is-6">
            <div className="notification is-danger">
              <p className="is-size-5 has-text-weight-semibold">📈 Conversion Rate</p>
              <p className="is-size-4">{analytics.conversionRate}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="has-text-centered">
          <p className="has-text-grey-dark">⏳ Loading analytics...</p>
          <progress className="progress is-small is-primary" max="100">Loading</progress>
        </div>
      )}
    </div>
  );
};

export default Analytics;
