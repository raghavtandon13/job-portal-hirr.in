import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: Number, required: false, unique: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  role: {
    type: String,
    enum: ["user", "organization", "admin"],
    default: "user",
  },
  profilePicture: { type: String, default: "" },
  otp: { type: Number },
  updateReqeust: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
