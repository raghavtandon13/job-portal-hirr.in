import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  companyId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  orgPicture: { type: String }, // Add this field
  // Other job fields...
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
