import mongoose from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  sessionToken: { type: String }
});

companySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});
const Company = mongoose.model("Company", companySchema);

export default Company;
