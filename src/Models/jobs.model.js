
export default class JobsModel {
  constructor(
    id,
    category,
    applyBy,
    company,
    designation,
    location,
    annualSal,
    skills = 'ReactJS'|| [],
    openings,
    applicants=0
  ) {
    this.id = id;
    this.category = category;
    this.applyBy = applyBy;
    this.company = company;
    this.designation = designation;
    this.location = location;
    this.annualSal = annualSal;
    this.skills = skills;
    this.openings = openings;
    this.applicants = applicants;
  }

  static getJobs() {
    return jobs;
  }

  static getPostedJobs(company) {
    return jobs.filter((job) => job.company === company);
  }

  static addJob(id, category, applyBy, company, designation, location, annualSal, skills = ["AngularJS", "ReactJS"], openings, applicants) {
    const newJob = new JobsModel(id, category, applyBy, company, designation, location, annualSal, skills, openings, applicants);
    jobs.push(newJob);
  }

  static getJobById(id) {
    return jobs.find((job) => job.id == id);
  }

  static updateJob(updatedJob) {
    const jobIndex = jobs.findIndex((job) => job.id == updatedJob.id);
    if (jobIndex !== -1) {
      jobs[jobIndex] = updatedJob;
      console.log(jobs);
    }
  }

  static IncApplicant(jobId){
    const jobAppInc = jobs.find((job) => job.id == jobId);
jobAppInc.applicants++;
// location.reload();
  }

  static deleteJob(jobToDelete) {
    const jobIndex = jobs.findIndex((job) => job.id == jobToDelete.id);
    if (jobIndex !== -1) {
      jobs.splice(jobIndex, 1);
    }
  }

  static searchResult(company) {
    return jobs.filter((job) => job.company === company);
  }

}

var jobs = [
  {
    id: "1",
    category: "Tech",
    applyBy: "18-02-2024",
    company: "Coding Ninjas",
    designation: " SDE",
    location: "Gurgaon HR IND Remote",
    annualSal: "14-20",
    skills: ["React", "NodeJS", "JS", "SQL", "MongoDB", "Express", "AWS"],
    openings: 10,
    applicants: 0,
  },
  {
    id: "2",
    category: "Tech",
    applyBy: "03-02-2024",
    company: "Go Digit",
    designation: " Angular Developer",
    location: "Pune IND On-Site",
    annualSal: "6-10",
    skills: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    openings: 4,
    applicants: 10,
  },
  {
    id: "3",
    category: "Tech",
    applyBy: "26-02-2024",
    company: "Juspay",
    designation: " SDE",
    location: "Bangalore IND",
    annualSal: "20-26",
    skills: ["React", "NodeJS", "JS", "SQL", "MongoDB", "Express", "AWS"],
    openings: 6,
    applicants: 15,
  },
];
export { jobs };
