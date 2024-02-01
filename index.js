import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import PageController from "./src/Controllers/mainPage.controller.js";
import JobsController from "./src/Controllers/jobs.controller.js";
import validationMiddleware from "./src/middlewares/formsValidation.js";
import session from "express-session";
import { auth } from "./src/middlewares/recruiterAuth.middleware.js";
import cookieParser from "cookie-parser";
import {
  setJobPostedOn,
  setLastUpdatedJob,
  setLastVisit,
} from "./src/middlewares/cookiesSet.middleware.js";
import { uploadFile } from "./src/middlewares/uploadFiles.middleware.js";
import { sendMail } from "./src/middlewares/sendMail.middleware.js";
// import { sendMailTo } from './src/MailEvent.js';
const app = express();
const pageController = new PageController();
const jobsController = new JobsController();
const validMiddle = new validationMiddleware();
app.use(express.static("public"));
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(expressEjsLayouts);

app.use(express.static("src/views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setLastVisit);

app.get("/", pageController.getMainPage);
app.get("/login", pageController.getLogin);
app.get("/jobs", jobsController.getJobsView);
app.get("/addJob", auth, jobsController.getAddJobForm);
app.post(
  "/addJob",
  auth,
  validMiddle.validateAddJobReq,
  jobsController.postAddJobs,
  setJobPostedOn
);
app.post(
  "/updateJob",
  auth,
  validMiddle.validateUpdateJobReq,
  jobsController.postUpdateJob,
  setLastUpdatedJob
);
app.get("/register", pageController.getRegister);
app.post(
  "/register",
  validMiddle.validateRegisterReq,
  pageController.postRegister
);
app.post("/login", validMiddle.validateLoginReq, pageController.postLogin);
app.get("/viewDesc/:id", jobsController.getJobDesc);
app.get("/viewPosted", auth, jobsController.getAddJobs);
app.get("/viewPostedDesc/:id", auth, jobsController.getJobPostedDesc);

app.get("/updateJob/:id", auth, jobsController.getUpdateJob);
app.get("/apply/:id", jobsController.getApplyForm);
// app.post('/apply',uploadFile.single('resume'),validMiddle.validateapplyReq,jobsController.appformsubmitted,sendMail);
app.post(
  "/apply",
  uploadFile.single("resume"),
  validMiddle.validateapplyReq,
  jobsController.appformsubmitted
);

// app.get('/deleteJob',auth,)
app.post("/deleteJob/:id", auth, jobsController.postDeleteJob);
app.get("/thankyou", jobsController.appformsubmitted);
app.get("/search", jobsController.searchJobs);
app.get("/logout", pageController.sessionLogout);
export default app;
