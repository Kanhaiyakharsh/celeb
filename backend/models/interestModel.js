import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  createdAt: { type: Date, default: Date.now }
});

const InterestModel = mongoose.models.Interest || mongoose.model("Interest", interestSchema);
export default InterestModel;
