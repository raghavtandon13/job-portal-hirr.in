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
  resume: {
    status: ["Employed", "Unemployed"],
    resumeHeadline: { type: String },
    skills: [
      {
        skillName: { type: String },
        experience: { type: Number },
      },
    ],
    employment: [
      {
        currentlyEmployed: { type: Boolean, default: false },
        employmentType: ["Full Time", "Part Time", "Internship"],
        totalExperience: { type: Number },
        currentCompany: { type: String },
        joiningDate: { type: String },
        salary: { type: Number },
        skillsRequired: [{ type: String }],
      },
    ],
    education: [
      {
        educationType: ["Full Time", "Correspondence"],
        course: { type: String },
        university: { type: String },
        courseType: { type: String },
        duration: { type: Number },
      },
    ],
    projects: [
      {
        title: { type: String },
        duration: { type: Number },
        details: { type: String },
      },
    ],
    onlineProfiles: [
      {
        websiteName: { type: String },
        websiteLink: { type: String },
      },
    ],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $ne: null } } });

const User = mongoose.model("User", userSchema);

export default User;
