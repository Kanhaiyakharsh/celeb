// import express from "express";
// const analytics_router = express.Router();

// // In-memory storage (Temporary solution)
// let campaignCount = 0;
// let interestCount = 0;
// let userCount = 10; // Assuming initial users; replace with actual user tracking

// // Increment campaign count when a campaign is created
// analytics_router.post("/track-campaign", (req, res) => {
//   campaignCount++;
//   res.json({ message: "Campaign tracked", totalCampaigns: campaignCount });
// });

// // Increment interest count when a user shows interest in a celebrity
// analytics_router.post("/track-interest", (req, res) => {
//   interestCount++;
//   res.json({ message: "Interest marked", totalInterests: interestCount });
// });

// // Fetch analytics
// analytics_router.get("/analytics", (req, res) => {
//   const conversionRate = campaignCount
//     ? ((interestCount / campaignCount) * 100).toFixed(2)
//     : 0;

//   res.json({
//     totalUsers: userCount,
//     totalCampaigns: campaignCount,
//     totalInterests: interestCount,
//     conversionRate: `${conversionRate}%`,
//   });
// });

// export default analytics_router;


// import express from "express";
// import User from "../models/userModel.js"; // Import the User model

// // import mongoose from "mongoose"; 

// const analytics_router = express.Router();

// // In-memory storage (Temporary solution)
// let campaignCount = 0;
// let interestCount = 0;

// // Increment campaign count when a campaign is created
// analytics_router.post("/track-campaign", (req, res) => {
//   campaignCount++;
//   res.json({ message: "Campaign tracked", totalCampaigns: campaignCount });
// });

// // Increment interest count when a user shows interest in a celebrity
// analytics_router.post("/track-interest", (req, res) => {
//   interestCount++;
//   res.json({ message: "Interest marked", totalInterests: interestCount });
// });

// // Fetch analytics
// analytics_router.get("/analytics", async (req, res) => {
//   try {
//     // Fetch total users from MongoDB
//     const totalUsers = await User.countDocuments();

//     // Calculate conversion rate
//     const conversionRate = campaignCount
//       ? ((interestCount / campaignCount) * 100).toFixed(2)
//       : 0;

//     res.json({
//       totalUsers,
//       totalCampaigns: campaignCount,
//       totalInterests: interestCount,
//       conversionRate: `${conversionRate}%`,
//     });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ message: "Failed to fetch analytics", error });
//   }
// });

// export default analytics_router;

import express from "express";
import User from "../models/userModel.js"; 
import Campaign from "../models/campaignModel.js"; 
import Interest from "../models/interestModel.js";

const analytics_router = express.Router();

// ✅ Track a new campaign
analytics_router.post("/track-campaign", async (req, res) => {
  try {
    const { campaignName } = req.body;

    if (!campaignName) {
      return res.status(400).json({ error: "Campaign name is required" });
    }

    const campaign = await Campaign.create({ name: campaignName });

    res.json({ message: "Campaign tracked successfully", campaign });
  } catch (error) {
    console.error("Error tracking campaign:", error);
    res.status(500).json({ error: "Failed to track campaign" });
  }
});

// ✅ Track interest in a campaign
analytics_router.post("/track-interest", async (req, res) => {
  try {
    const { userId, campaignId } = req.body;

    if (!userId || !campaignId) {
      return res.status(400).json({ error: "User ID and Campaign ID are required" });
    }

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Check if campaign exists
    const campaignExists = await Campaign.findById(campaignId);
    if (!campaignExists) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // ✅ Prevent duplicate interest
    const existingInterest = await Interest.findOne({ userId, campaignId });
    if (existingInterest) {
      return res.status(400).json({ error: "Interest already marked for this campaign" });
    }

    await Interest.create({ userId, campaignId });

    res.json({ message: "Interest marked successfully" });
  } catch (error) {
    console.error("Error marking interest:", error);
    res.status(500).json({ error: "Failed to mark interest" });
  }
});

// ✅ Fetch analytics data
analytics_router.get("/analytics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalInterests = await Interest.countDocuments();

    // ✅ Conversion rate: (Total Interests / Total Campaigns) * 100
    const conversionRate = totalCampaigns
      ? ((totalInterests / totalCampaigns) * 100).toFixed(2)
      : 0;

    res.json({
      totalUsers,
      totalCampaigns,
      totalInterests,
      conversionRate: `${conversionRate}%`,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics", error });
  }
});

export default analytics_router;
