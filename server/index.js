import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Company from "./models/Company.js";
import Job from "./models/Job.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const company = Company.findOne({ _id: decoded.companyId });

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.company = company;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};
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

app.get("/", (req, res) => {
  res.send("WELCOME, you're one step closer to finding your dream job.");
});

app.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user based on the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // USE ENCRRYPTED PASSWORD WHEN FRONTEND IS COMPLETED - !!! important
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // Generate a session token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.json({ token });
    console.log("user logged in")
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

app.post("/login/company", async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password !== company.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // USE ENCRRYPTED PASSWORD WHEN FRONTEND IS COMPLETED - !!! important
    // const isPasswordValid = await bcrypt.compare(password, company.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    const token = jwt.sign({ companyId: company._id }, "your-secret-key");

    company.sessionToken = token;
    await company.save();

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

app.post("/signup/user", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
});
app.post("/signup/company", async (req, res) => {
  try {
    const { companyName, industry, email, password } = req.body;

    // Check if the email is already registered
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Create a new company
    const company = new Company({ companyName, industry, email, password });
    await company.save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error during company signup:", error);
    res
      .status(500)
      .json({ message: "An error occurred during company signup" });
  }
});

app.post("/jobs", authenticate, async (req, res) => {
  try {
    const { companyName, title, skills, experience } = req.body;

    // Find the company based on the company name
    const company = await Company.findOne({ companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Create a new job and add it to the company's jobs array
    const job = new Job({ title, companyName, skills, experience });
    await job.save();
    company.jobs.push(job);
    await company.save();

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    console.error("Error during job posting:", error);
    res.status(500).json({ message: "An error occurred during job posting" });
  }
});
app.get("/jobs/search", async (req, res) => {
  try {
    const { title, skills, experience } = req.query;

    // Construct the filter object based on provided query parameters
    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (skills) filter.skills = { $in: skills.split(",") };
    if (experience) filter.experience = experience;

    // Fetch jobs based on the filter
    const jobs = await Job.find(filter);

    res.json(jobs);
    console.log(jobs)
  } catch (error) {
    console.error("Error while fetching jobs:", error);
    res.status(500).json({ message: "An error occurred while fetching jobs" });
  }
});


app.post('/jobs/:jobId/apply', userAuthenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const user = req.user; // Assuming the authenticated user is stored in req.user

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    } else console.log('job found');

    // Add the job to the user's applications
    if (!user.applications) {
      user.applications = []; // Initialize the applications array if not present
    }
    user.applications.push(jobId);
    await user.save();

    // Add the user to the job's applicants
    job.applicants.push(user._id);
    await job.save();

    res.json({ message: 'Job application successful' });
  } catch (error) {
    console.error('Error during job application:', error);
    res.status(500).json({ message: 'An error occurred during job application' });
  }
});


app.get("/user/applications", userAuthenticate, async (req, res) => {
  //add authenticate
  try {
    const user = req.user;

    // Fetch the user's applications
    const bbapplications = await Job.find({ _id: { $in: user.applications } });
    const applications = await Job.find({ _id: { $in: user.applications } });

    res.json(applications);
  } catch (error) {
    console.error("Error while fetching user applications:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user applications" });
  }
});

app.get('/jobs/:jobId/applicants', authenticate, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const company = req.company; // Assuming the authenticated company is stored in req.company

    // Check if the job exists and belongs to the company
    const job = await Job.findOne({ _id: jobId, company: company._id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Retrieve the applicants for the job
    const applicants = await User.find({ _id: { $in: job.applicants } });

    res.json(applicants);
  } catch (error) {
    console.error('Error while fetching job applicants:', error);
    res.status(500).json({ message: 'An error occurred while fetching job applicants' });
  }
});

app.get("/company/jobs", authenticate, async (req, res) => {
  try {
    // Retrieve the authenticated company from the request object
    const { company } = req;

    // Find all jobs posted by the company
    const jobs = await Job.find({ companyId: company._id });

    res.json({ jobs });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    res.status(500).json({ message: "An error occurred while retrieving jobs" });
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
