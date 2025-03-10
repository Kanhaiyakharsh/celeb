import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CampaignModel = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
export default CampaignModel;
