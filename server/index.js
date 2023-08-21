import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Company from "./models/Company.js";
import Job from "./models/Job.js";
import cors from "cors";
import path from "path";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import "./passport-setup.js";
import "./utils/otp.util.js";
import { generateOTP } from "./utils/otp.util.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// app.use(cors({ origin: "*" }));
// app.use(cors());
app.use(express.json());

app.use("/static", express.static("public"));

// Passport middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//------------------------------------------------
// Authentication middleware for Organization

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    const company = await Company.findOne({ _id: decoded.companyId }).exec();
    console.log(decoded.companyId);

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(company.companyName);
    req.company = company;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};
//------------------------------------------------

// Authentication middleware for User

const userAuthenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};
//------------------------------------------------
// MongoDB connection

const MONGODB_URI =
  "mongodb+srv://tandonraghav13:1q2w3e4r5t@cluster0.iimfm2f.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
//------------------------------------------------
// Routes

// Home Route

app.get("/", (req, res) => {
  res.send("WELCOME, you're one step closer to finding your dream job.");
});

// Route for Login for User

app.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials 1" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials 2" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    console.log(token);

    res.cookie("mytoken", token, {
      expires: new Date(Date.now() + 3600000),
      // httpOnly: true,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // Add other relevant user data
      },
    });
    console.log("user logged in");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route for Login for Organization

app.post("/login/company", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const company = await Company.findOne({ email });
    console.log(company);
    if (!company) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ companyId: company._id }, "your-secret-key");
    res.cookie("orgtoken", token, {
      expires: new Date(Date.now() + 3600000),
      // httpOnly: true,
    });

    company.sessionToken = token;
    await company.save();

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route for Signup for User

app.post("/signup/user", upload.single("profilePicture"), async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    let profilePicture = req.file ? req.file.filename : "";
    profilePicture = `http://localhost:3000/static/uploads/${profilePicture}`;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = new User({ name, email, phone, password, profilePicture });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
});

// Route for Signup for Organization

app.post("/signup/company", upload.single("orgPicture"), async (req, res) => {
  try {
    const { companyName, industry, email, password } = req.body;
    const orgPicture = req.file ? req.file.filename : "";

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const company = new Company({
      companyName,
      industry,
      email,
      password,
      orgPicture,
    });
    await company.save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error during company signup:", error);
    res
      .status(500)
      .json({ message: "An error occurred during company signup" });
  }
});

// Route for posting jobs

app.post("/jobs", authenticate, async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { companyName, title, skills, experience } = req.body;

    const company = await Company.findOne({ companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const companyId = company._id;
    const orgPicture = company.orgPicture;
    const job = new Job({
      title,
      companyName,
      skills,
      experience,
      companyId,
      orgPicture,
    });
    await job.save();
    company.jobs.push(job);
    await company.save();

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    console.error("Error during job posting:", error);
    res.status(500).json({ message: "An error occurred during job posting" });
  }
});

// Route for searching jobs

app.get("/jobs/search", async (req, res) => {
  try {
    const { title, skills, experience } = req.query;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (skills) filter.skills = { $in: skills.split(",") };
    if (experience) filter.experience = experience;

    const jobs = await Job.find(filter);

    res.json(jobs);
    console.log(jobs);
  } catch (error) {
    console.error("Error while fetching jobs:", error);
    res.status(500).json({ message: "An error occurred while fetching jobs" });
  }
});

// Route for applying in a given job

app.post("/jobs/:jobId/apply", userAuthenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const user = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    } else console.log("job found");

    if (!user.applications) {
      user.applications = [];
    }
    user.applications.push(jobId);
    await user.save();

    job.applicants.push(user._id);
    await job.save();

    res.json({ message: "Job application successful" });
  } catch (error) {
    console.error("Error during job application:", error);
    res
      .status(500)
      .json({ message: "An error occurred during job application" });
  }
});

// Route for saving in a given job

app.post("/jobs/:jobId/save", userAuthenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const user = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!user.saved) {
      user.saved = [];
    }
    const jobIdObject = new mongoose.Types.ObjectId(jobId);

    if (user.saved.includes(jobId)) {
      await user.updateOne({ $pull: { saved: jobIdObject } });
      await user.save();
      res.json({ message: "Job unsaved successfully" });
    } else {
      await user.updateOne({ $push: { saved: jobIdObject } });
      await user.save();
      res.json({ message: "Job saved successfully" });
    }
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ message: "An error occurred during saving job" });
  }
});

// Route for viewing applications of user

app.get("/user/applications", userAuthenticate, async (req, res) => {
  try {
    const user = req.user;

    const applications = await Job.find({ _id: { $in: user.applications } });

    res.json(applications);
  } catch (error) {
    console.error("Error while fetching user applications:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user applications" });
  }
});
// Route for fetching saved jobs of user

app.get("/user/saved", userAuthenticate, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const saved = await Job.find({ _id: { $in: user.saved } });

    res.json(saved);
  } catch (error) {
    console.error("Error while fetching user saved jobs:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user saved jobs" });
  }
});

// Route for fetching applicants of given job

app.get("/jobs/:jobId/applicants", authenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const company = req.company;
    console.log(company);

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicants = await User.find({ _id: { $in: job.applicants } }).select(
      "_id name email"
    );

    res.json(applicants);
  } catch (error) {
    console.error("Error while fetching job applicants:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching job applicants" });
  }
});

// Route for fetching job posts from given organization

app.get("/company/jobs", authenticate, async (req, res) => {
  try {
    const { company } = req;
    console.log(company.companyName, "from route");

    const jobs = await Job.find({ companyName: company.companyName });

    res.json({ jobs });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving jobs" });
  }
});

// Route for validation of token

app.get("/api/validate_token", (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token missing." });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    return res.status(200).json({ message: "Token is valid.", user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
});

//Route for user details
app.get("/user/details", userAuthenticate, async (req, res) => {
  const user = req.user;
  try {
    const userDetails = await User.findOne({ _id: user._id });

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:user/details", async (req, res) => {
  // const user = req.user;
  const user = req.params.user;
  try {
    const userDetails = await User.findOne({ _id: user._id });

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Route for know application status for a given job {applied or can apply}

app.get("/jobs/:jobId/status", userAuthenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const user = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applied = job.applicants.includes(user._id);
    const saved = user.saved.includes(jobId);

    return res.status(200).json({ applied, saved });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for google auth

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.cookie("mytoken", token);

    res.redirect("http://localhost:5173");
  }
);

// Route for OTP login for user
app.post("/otp-login", async (req, res) => {
  const { phone } = req.body;
  console.log(phone);
  const user = await User.findOne({ phone });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOTP(6);
  console.log(otp);
  user.otp = otp;
  await user.save();
});
app.post("/otp-verify", async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.otp === parseInt(otp)) {
    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    console.log("OTP verified successfully");
    res.cookie("mytoken", token, {
      expires: new Date(Date.now() + 3600000),
    });
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(404).json({ message: "OTP not verified" });
  }
});

//------------------------------------------------
// Express App listening on PORT

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
