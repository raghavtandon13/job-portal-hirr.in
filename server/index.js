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
import pdf2json from "pdf2json";
import fs from "fs/promises";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cors({ credentials: true, origin: "http://34.131.250.17" }));
// app.use(cors({ origin: "*" }));
// app.use(cors());
app.use(express.json());

app.use("/api/static", express.static("public"));

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

app.get("/api", (req, res) => {
  res.send("WELCOME, you're one step closer to finding your dream job.");
});

// Route for Login for User

app.post("/api/login/user", async (req, res) => {
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
        // token: token,
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

app.post("/api/login/company", async (req, res) => {
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

app.post(
  "/api/signup/user",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      let profilePicture = req.file ? req.file.filename : "";
      profilePicture = `http://34.131.250.17/api/api/static/uploads/${profilePicture}`;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email is already registered" });
      }

      const user = new User({ name, email, phone, password, profilePicture });
      await user.save();

      const token = jwt.sign({ userId: user._id }, "your-secret-key");
      console.log(token);
      res.cookie("mytoken", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        domain: ".34.131.250.17",
        secure: true,
        path: "/", // Set the path to the root of your application
      });

      res
        .status(201)
        .json({ message: "User created successfully", token: token });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "An error occurred during signup" });
    }
  }
);

// Route for Signup for Organization

app.post(
  "/api/signup/company",
  upload.single("orgPicture"),
  async (req, res) => {
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
  }
);

// Route for posting jobs

app.post("/api/jobs", authenticate, async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { companyName, title, skills, experience, jobDescription, location } =
      req.body;

    // const company = req.company;
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
      jobDescription,
      location,
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

app.get("/api/jobs/search", async (req, res) => {
  try {
    const { title, skills, experience, page, limit, sort, order } = req.query;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (skills) filter.skills = { $in: skills.split(",") };
    if (experience) filter.experience = experience;

    const currentPage = parseInt(page) || 1;
    const resultsPerPage = parseInt(limit) || 10;

    const skip = (currentPage - 1) * resultsPerPage;

    const sortOptions = {};
    if (sort) {
      if (sort === "rating") {
        sortOptions.averageRating = order === "desc" ? -1 : 1;
      } else if (sort === "relevance") {
        // You can implement relevance-based sorting logic here
        sortOptions.experience = order === "desc" ? -1 : 1;
      } else if (sort === "datePosted") {
        sortOptions.createdAt = order === "desc" ? -1 : 1;
      }
    }

    const jobs = await Job.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(resultsPerPage);

    const totalResults = await Job.countDocuments(filter);

    res.json({
      results: jobs,
      totalResults: totalResults,
    });
  } catch (error) {
    console.error("Error while fetching jobs:", error);
    res.status(500).json({ message: "An error occurred while fetching jobs" });
  }
});

// Route for reccos

app.get("/api/jobs/reccos", async (req, res) => {
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

// Route for fetching details of a job (by job ID)

app.get("/api/jobs/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId).select("-applicants");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    console.log(job);
    res.json(job);
  } catch (error) {
    console.error("Error while fetching job:", error);
    res.status(500).json({ message: "An error occurred while fetching job" });
  }
});

// Route for applying in a given job

app.post("/api/jobs/:jobId/apply", userAuthenticate, async (req, res) => {
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

app.post("/api/jobs/:jobId/save", userAuthenticate, async (req, res) => {
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

app.get("/api/user/applications", userAuthenticate, async (req, res) => {
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

app.get("/api/user/saved", userAuthenticate, async (req, res) => {
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

app.get("/api/jobs/:jobId/applicants", authenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const company = req.company;

    console.log("here we go");
    console.log(company.companyName);

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicants = await User.find({ _id: { $in: job.applicants } }).select(
      "_id name email profilePicture"
    );
    // console.log(applicants);

    res.json(applicants);
  } catch (error) {
    console.error("Error while fetching job applicants:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching job applicants" });
  }
});

// Route for fetching job posts from given organization (with org authentication)

app.get("/api/company/jobs", authenticate, async (req, res) => {
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

// Route for fetching job posts from given organization (with company ID)

app.get("/api/jobs/:companyId/all", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const jobs = await Job.find({ companyId: companyId });
    res.json(jobs);
  } catch (error) {
    res.json(error);
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

//Route for user details (with user authentication)
app.get("/api/user/details", userAuthenticate, async (req, res) => {
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

//Route for user details (with user ID)
app.get("/api/user/:user/details", async (req, res) => {
  // const user = req.user;
  const user = req.params.user;
  console.log(user);
  try {
    const userDetails = await User.findOne({ _id: user });

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Route for application status for a given job {applied or can apply}

app.get("/api/jobs/:jobId/status", userAuthenticate, async (req, res) => {
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
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    if (req.user.profilePicture) {
      user.profilePicture = req.user.profilePicture; // Assuming 'profilePicture' is the field name in your User schema
      user.save();
    }
    res.cookie("mytoken", token);
    console.log(token);

    // res.redirect("http://localhost:5173");
    res.redirect("http://34.131.250.17");
  }
);

// Route for OTP login for user
app.post("/api/otp-login", async (req, res) => {
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
app.post("/api/otp-verify", async (req, res) => {
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
// Route for updating resume

app.post("/api/resume-update", userAuthenticate, async (req, res) => {
  try {
    const user = req.user;

    // Extract the resume data from the request body
    const {
      skills,
      projects,
      onlineProfiles,
      resumeHeadline,
      education,
      employment,
    } = req.body;
    console.log(req.body);

    // Update the user's resume data
    if (skills !== undefined && Array.isArray(skills)) {
      // Filter out empty or incomplete skill entries
      const filteredSkills = skills.filter(
        (skill) =>
          skill &&
          typeof skill === "object" &&
          skill.skillName &&
          typeof skill.skillName === "string" &&
          skill.skillName.trim() !== "" &&
          skill.experience !== ""
      );
      user.resume.skills = filteredSkills;
    }
    if (education !== undefined && Array.isArray(education)) {
      // Filter out empty or incomplete skill entries
      const filteredEducation = education.filter(
        (edu) =>
          edu &&
          typeof edu === "object" &&
          edu.course &&
          typeof edu.course === "string" &&
          edu.course.trim() !== "" &&
          edu.duration !== "" &&
          edu.university &&
          typeof edu.university === "string" &&
          edu.university.trim() !== "" &&
          edu.courseType &&
          typeof edu.courseType === "string" &&
          edu.courseType.trim() !== ""
      );
      user.resume.education = filteredEducation;
    }
    if (employment !== undefined && Array.isArray(employment)) {
      // Filter out empty or incomplete skill entries
      const filteredEmployment = employment.filter(
        (emp) =>
          emp &&
          typeof emp === "object" &&
          emp.currentCompany &&
          typeof emp.currentCompany === "string" &&
          emp.currentCompany.trim() !== "" &&
          emp.experience !== "" &&
          emp.joiningDate !== null &&
          emp.salary !== ""
      );
      user.resume.employment = filteredEmployment;
      console.log(filteredEmployment);
    }

    if (projects !== undefined && Array.isArray(projects)) {
      // Preserve existing projects and filter out new empty or incomplete projects
      const filteredProjects = projects
        .map((project) => ({
          title: (project.title || "").trim(),
          duration:
            typeof project.duration === "string" ? project.duration.trim() : "", // Check and trim if it's a string
          details: (project.details || "").trim(),
        }))
        .filter(
          (project) =>
            project.title !== "" &&
            project.duration !== "" &&
            project.details !== ""
        );

      // Merge the filtered projects with existing projects
      user.resume.projects = [
        ...user.resume.projects, // Preserve existing projects
        ...filteredProjects, // Add the filtered projects
      ];
      // console.log("Total Projects:", projects);
      // console.log("Filtered Projects:", filteredProjects);
    }

    if (onlineProfiles !== undefined && Array.isArray(onlineProfiles)) {
      // Filter out empty or incomplete profile entries
      const filteredProfiles = onlineProfiles.filter(
        (profile) =>
          profile &&
          typeof profile === "object" &&
          profile.websiteName &&
          typeof profile.websiteName === "string" &&
          profile.websiteName.trim() !== "" &&
          profile.websiteLink &&
          typeof profile.websiteLink === "string" &&
          profile.websiteLink.trim() !== ""
      );
      user.resume.onlineProfiles = filteredProfiles;
    }

    user.resume.resumeHeadline = resumeHeadline;

    await user.save();

    res.status(200).json({ message: "Resume updated successfully!" });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "An error occurred while updating resume." });
  }
});

// Route for fetching user profile using UserID
///////////////////////////////
// Set up a route to handle file uploads and PDF extraction
app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    // Get the uploaded PDF file from the request
    const pdfFile = req.file; // Assuming the file input has the name "pdf"

    // Check if a PDF file was uploaded
    if (!pdfFile) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    // Initialize pdf2json
    const pdfParser = new pdf2json.PdfParser();

    // Register event handlers for parsing
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      // Access the parsed data
      const pdfText = pdfData.formImage.Pages[0].Texts.map(
        (text) => text.R[0].T
      ).join(" ");

      // Here, you can process the extracted text as needed
      res.json({ extractedText: pdfText });
    });

    // Read and parse the PDF file
    const pdfData = await fs.readFile(pdfFile.path);
    pdfParser.parseBuffer(pdfData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the PDF" });
  }
});

// Rouete for toggling "complete your porfile" banner

app.post("/api/prof-req", userAuthenticate, async (req, res) => {
  try {
    const user = req.user;
    user.updateReqeust = false;
    await user.save();
    res.json({ message: "Prof req turned off" });
  } catch (error) {
    console.error("Error during job application:", error);
    res
      .status(500)
      .json({ message: "An error occurred during job application" });
  }
});
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
///-----------------------------------------------------------------------
function calculateResumeCompletion(user) {
  const weights = {
    employment: 0.3,
    education: 0.2,
    projects: 0.15,
    onlineProfiles: 0.15,
  };

  let totalCompleteness = 0;
  let totalWeight = 0;

  for (const section of Object.keys(weights)) {
    const weight = weights[section];
    const sectionData = user.resume[section];

    if (sectionData) {
      if (sectionHasData(sectionData)) {
        totalWeight += weight;
        totalCompleteness += weight;
      }
    }
  }

  const overallCompleteness = (totalCompleteness / totalWeight) * 100;

  return Math.round(overallCompleteness - 17);
}

function sectionHasData(sectionData) {
  return Object.values(sectionData).some(
    (field) => field !== null && field !== undefined && field !== ""
  );
}

app.get("/api/resume-completion", userAuthenticate, async (req, res) => {
  try {
    const user = req.user;
    const resumeCompletionPercentage = calculateResumeCompletion(user);
    res.json({ percentage: resumeCompletionPercentage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/api/change-profile-picture",
  upload.single("newProfilePicture"),
  userAuthenticate,
  async (req, res) => {
    try {
      const userId = req.user; // Assuming you have middleware to extract user ID from the token

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let newProfilePicture = req.file ? req.file.filename : "";
      if (!newProfilePicture) {
        return res.status(400).json({ message: "No profile picture provided" });
      }

      // Update the user's profile picture
      user.profilePicture = `http://34.131.250.17/api/static/uploads/${newProfilePicture}`;
      await user.save();

      res.status(200).json({ message: "Profile picture changed successfully" });
    } catch (error) {
      console.error("Error changing profile picture:", error);
      res.status(500).json({
        message: "An error occurred while changing the profile picture",
      });
    }
  }
);

//Route for Company details (with org authentication)
app.get("/api/company/details", authenticate, async (req, res) => {
  const company = req.company;
  try {
    const companyDetails = await Company.findOne({ _id: company._id });

    if (!companyDetails) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json(companyDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route for editing a job post
app.post("/api/job/edit/", authenticate, async (req, res) => {
  const company = req.company;
  const {
    jobId,
    companyName,
    title,
    skills,
    experience,
    jobDescription,
    location,
  } = req.body;
  try {
    const companyDetails = await Company.findOne({ _id: company._id });
    console.log("location recieved from req:", location);

    // Check if the company owns the job post
    if (companyDetails.jobs.includes(jobId)) {
      const job = await Job.findOne({ _id: jobId });

      // Update job properties
      job.title = title;
      job.companyName = companyName;
      job.skills = skills;
      job.experience = experience;
      job.jobDescription = jobDescription;
      job.location = location;
      console.log("location saved in job object:", job.location);

      await job.save();

      res.status(200).json({ message: "Job updated successfully!" });
    }
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "An error occurred while updating job." });
  }
});

// Route for deleting a job

app.delete("/api/jobs/:jobId", authenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const company = req.company;

    // Find the job by its ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the job is in the company's jobs array
    if (!company.jobs.includes(job._id)) {
      return res
        .status(403)
        .json({ message: "Job does not belong to this company" });
    }

    // Remove the job from the company's jobs array
    const jobIndex = company.jobs.indexOf(job._id);
    if (jobIndex !== -1) {
      company.jobs.splice(jobIndex, 1);
      await company.save();
    }

    // Delete the job from the database
    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error during job deletion:", error);
    res.status(500).json({ message: "An error occurred during job deletion" });
  }
});
////////////////////
//------------------------------------------------
// Express App listening on PORT

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
