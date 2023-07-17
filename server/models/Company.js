import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  sessionToken: { type: String }
});

const Company = mongoose.model("Company", companySchema);

export default Company;
