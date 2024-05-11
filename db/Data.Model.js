import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    userAgent: {
      type: String,
      required: true,
    },
    email: String,
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Data || mongoose.model("Data", dataSchema);
