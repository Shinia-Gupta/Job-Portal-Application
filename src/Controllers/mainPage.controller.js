import JobsModel from "../Models/jobs.model.js";
import RecruiterModel from "../Models/recruiter.model.js";

export default class PageController {
  //Function to get the main page of the job portal
  getMainPage(req, res) {
    res.render("index", {
      userEmail: req.session.userEmail,
      username: req.session.username,
    });
  }

  //Function to render the login form
  getLogin(req, res) {
    res.render("recruiterLogin", { errorMsg: null });
  }

  //Function to render the register form
  getRegister(req, res) {
    res.render("recruiterRegister", { errorMsg: null });
  }

  //Function to register as recruiter
  postRegister(req, res) {
    const { company, username, email, password } = req.body;
    let recruiters = RecruiterModel.getAllRecruiters();
    RecruiterModel.addRecruiter(
      recruiters.length + 1,
      company,
      username,
      email,
      password
    );
    req.session.username = username;
    res.render("recruiterLogin", {
      errorMsg: null,
      userEmail: req.session.userEmail,
      username: req.session.username,
    });
  }

  //Function to show posted jobs after login by the recruiter
  postLogin(req, res) {
    const { email, password } = req.body;
    const recUser = RecruiterModel.isValidRecruiter(email, password);
    if (!recUser) {
      return res.render("recruiterLogin", {
        errorMsg: "Recruiter Not Found! Please Register!",
      });
    }
    // res.locals.user=recUser;
    req.session.userEmail = email;
    req.session.username = recUser.username;

    let jobs = JobsModel.getPostedJobs(recUser.company);
    return res.render("jobsPosted", {
      jobs,
      userEmail: req.session.userEmail,
      username: req.session.username,
    });
  }

  //Function to logout of the session
  sessionLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  }
}
