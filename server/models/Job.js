import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // Other job fields...
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
