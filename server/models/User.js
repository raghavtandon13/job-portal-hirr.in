import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  role: {
    type: String,
    enum: ["user", "organization", "admin"],
    default: "user",
  },
  profilePicture: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
