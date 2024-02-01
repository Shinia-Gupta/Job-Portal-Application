import RecruiterModel from "../Models/recruiter.model.js";
import JobsModel from "../Models/jobs.model.js";

export default class JobsController {
  //Function to render view of all jobs on the job portal
  getJobsView(req, res) {
    const jobs = JobsModel.getJobs();
    res.render("jobsView", {
      jobs,
      userEmail: req.session.userEmail,
      username: req.session.username,
    });
  }

  //Function to get posted jobs by the recruiter on job portal
  getAddJobs(req, res) {
    let recruiters = RecruiterModel.getAllRecruiters();
    let recruiterCalled = recruiters.find(
      (rec) => rec.email == req.session.userEmail
    );
    // let recruiterEmail=recruiterCalled.email;

    if (recruiterCalled) {
      let recJobs = JobsModel.getPostedJobs(recruiterCalled.company);
      res.render("jobsPosted", {
        jobs: recJobs,
        userEmail: req.session.userEmail,
        username: req.session.username,
      });
    } else {
      // Handle case where recruiter is not found
      res.status(404).send("Recruiter not found");
    }
  }

  //Function to add a job on job portal by the recruiter
  postAddJobs(req, res) {
    let jobs = JobsModel.getJobs();
    const {
      category,
      applyBy,
      company,
      designation,
      location,
      annualSal,
      skills,
      openings,
      applicants,
    } = req.body;
    JobsModel.addJob(
      jobs.length + 1,
      category,
      applyBy,
      company,
      designation,
      location,
      annualSal,
      skills,
      openings,
      applicants
    );
    res.render("jobsView", {
      jobs,
      userEmail: req.session.userEmail,
      username: req.session.username,
      errorMsg: null,
    });
  }

  //Function to get recruiter's posted jobs description
  getJobPostedDesc(req, res) {
    const id = req.params.id;
    const idNumber = parseInt(id);
    const findJobToView = JobsModel.getJobById(idNumber);
    if (findJobToView) {
      res.render("jobsPostedDesc", {
        job: findJobToView,
        userEmail: req.session.userEmail,
        username: req.session.username,
      });
    } else {
      // Handle case where job is not found
      res.status(404).send("Job not found");
    }
  }

  //Function to get description of any job on the job portal
  getJobDesc(req, res) {
    const id = req.params.id;
    const idNumber = parseInt(id);
    const findJobToView = JobsModel.getJobById(idNumber);
    if (findJobToView) {
      res.render("jobsDesc", {
        job: findJobToView,
        userEmail: req.session.userEmail,
        username: req.session.username,
      });
    } else {
      // Handle case where job is not found
      res.status(404).send("Job not found");
    }
  }

  //Function to render the update job form
  getUpdateJob(req, res) {
    const id = req.params.id;
    const idNumber = parseInt(id);
    console.log(idNumber);
    const findJobToUpdate = JobsModel.getJobById(idNumber);
    console.log(findJobToUpdate);
    if (findJobToUpdate) {
      res.render("updateJobForm", { job: findJobToUpdate, errorMsg: null });
    } else {
      // Handle case where job is not found
      res.status(404).send("Job not found");
    }
  }

  //Function to update a job
  postUpdateJob(req, res) {
    console.log(req.body);
    JobsModel.updateJob(req.body);
    let jobs = JobsModel.getJobs();
    res.render("jobsView", { jobs, errorMsg: null });
  }

  //Function to delete a job
  postDeleteJob(req, res) {
    const id = req.params.id;
    const idNumber = parseInt(id);
    const findJobToDelete = JobsModel.getJobById(idNumber);
    if (findJobToDelete) {
      JobsModel.deleteJob(findJobToDelete);
      let jobs = JobsModel.getJobs();
      res.render("jobsView", {
        jobs,
        userEmail: req.session.userEmail,
        username: req.session.username,
      });
    } else {
      // Handle case where job is not found
      res.status(404).send("Job not found");
    }
  }

  //Function to get the application form for the applicant
  getApplyForm(req, res) {
    // console.log(req.body);
    console.log(req.params.id);

    let jobApplied = JobsModel.getJobById(req.params.id);
    // console.log(jobApplied);
    // const idNumber=parseInt(jobApplied.id);
    res.render("apply", { errorMsg: null, success: false, job: jobApplied });
  }

  //Function to apply for a job
  appformsubmitted(req, res) {
    let jobApplicantInc = JobsModel.getJobById(req.body.id);
    const idNumber = parseInt(jobApplicantInc.id);
    JobsModel.IncApplicant(idNumber);
    res.redirect(`/viewDesc/${idNumber}`);
    // console.log('app:',req.body);
  }

  // async sendMail(req,res){
  //   const {email,username}=req.body;
  //   await JobsController.sendMail(email,username);
  //   res.render('thankpage');
  // }

  //Function to search a job by its company name
  searchJobs(req, res) {
    console.log(req.query);
    const { company } = req.query;
    const result = JobsModel.searchResult(company);
    res.render("jobsView", { jobs: result });
  }

  //Function to render the add job form
  getAddJobForm(req, res) {
    res.render("addJobForm", {
      errorMsg: null,
      userEmail: req.session.userEmail,
      username: req.session.username,
    });
  }
}
