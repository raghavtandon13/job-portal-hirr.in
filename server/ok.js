import axios from "axios";


function generateCompanyName() {
  const companyNames = ['TechCorp', 'InnovateX', 'NexGen', 'SwiftTech', 'CyberSys'];
  return companyNames[Math.floor(Math.random() * companyNames.length)];
}

// Function to generate random job title
function generateJobTitle() {
  const jobTitles = ['Software Engineer', 'Data Analyst', 'UX Designer', 'Project Manager', 'QA Tester'];
  return jobTitles[Math.floor(Math.random() * jobTitles.length)];
}

// Function to generate random skills (3 to 5 skills)
function generateSkills() {
  const skillsList = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Data Analysis', 'UI/UX Design', 'Agile'];
  const numSkills = Math.floor(Math.random() * 3) + 3; // Generating 3 to 5 skills
  const selectedSkills = [];
  for (let i = 0; i < numSkills; i++) {
    selectedSkills.push(skillsList[Math.floor(Math.random() * skillsList.length)]);
  }
  return selectedSkills;
}

// Function to generate random experience level
function generateExperience() {
  const experienceLevels = ['Entry Level', 'Intermediate', 'Senior'];
  return experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
}

// Function to generate random job description
function generateJobDescription() {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam id libero malesuada aliquam.';
}

// Function to generate random email
function generateEmail() {
  return `${generateCompanyName().toLowerCase().replace(/\s/g, '')}@example.com`;
}

// Function to generate a random password
function generatePassword() {
  return 'RandomPassword123'; // You can implement a more sophisticated random password generator
}

// Create a company account and post a job
async function createCompanyAndPostJob() {
  try {
    const companyName = generateCompanyName();
    const email = generateEmail();
    const password = generatePassword();
    const industry = 'Technology'; // You can customize the industry as needed

    // Create a company account
    const companyResponse = await axios.post('http://localhost:3000/signup/company', {
      companyName,
      industry,
      email,
      password
    });

    if (companyResponse.status === 201) {
      console.log ("Success account created")
      const authToken = companyResponse.data.token; // Adjust the token retrieval based on your API response
      console.log(authToken);

      // Post a job
      const jobTitle = generateJobTitle();
      const skills = generateSkills();
      const experience = generateExperience();
      const jobDescription = generateJobDescription();

      const jobResponse = await axios.post('http://localhost:3000/jobs', {
        companyName,
        title: jobTitle,
        skills,
        experience,
        jobDescription
      }, {
        headers: {
          Authorization: `${authToken}`
        }
      });

      console.log(jobResponse.data.message);
    } else {
      console.log('Failed to create company account');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to create a company account and post a job
createCompanyAndPostJob();
