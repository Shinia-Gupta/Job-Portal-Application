import { body, validationResult } from "express-validator";
import JobsModel, { jobs } from "../Models/jobs.model.js";



export default class validationMiddleware {

//Validation for adding jobs by the recruiter
  validateAddJobReq = async (req, res, next) => {
    const rulesforAddJob = [
      body("category").notEmpty().withMessage("Please select category!"),
      body("designation").notEmpty().withMessage("Please select designation!"),
      body("location").notEmpty().withMessage("Please enter location!"),
      body("company")
        .notEmpty()
        .withMessage("Please enter company!")
        .isLength({ min: 2 })
        .withMessage("Company name must be at least 2 characters long"),
      body("annualSal")
        .notEmpty()
        .withMessage("Please enter Annual Salary!")
        .withMessage("Annual Salary must be a valid number"),
      body("openings")
        .isInt({ min: 1 })
        .notEmpty()
        .withMessage("Please enter openings in number!"),
      body("skills").notEmpty().withMessage("Please select skills!"),
      body("applyBy")
        .notEmpty()
        .withMessage("Please select last date of job application!"),
    ];

    await Promise.all(rulesforAddJob.map((rule) => rule.run(req)));

    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      next();
    } else {
      return res.render("addJobForm", {
        errorMsg: validationErr.array()[0].msg,
      });
    }
  };


  //validation for updating jobs by the recruiter
  validateUpdateJobReq = async (req, res, next) => {
    const rulesforUpdateJob = [
      body("category").notEmpty().withMessage("Please select category!"),
      body("designation").notEmpty().withMessage("Please select designation!"),
      body("location").notEmpty().withMessage("Please enter location!"),
      body("company")
        .notEmpty()
        .withMessage("Please enter company!")
        .isLength({ min: 2 })
        .withMessage("Company name must be at least 2 characters long"),
      body("annualSal")
        .notEmpty()
        .withMessage("Please enter Annual Salary!")
        .withMessage("Annual Salary must be a valid number"),
      body("openings")
        .isInt({ min: 0 })
        .notEmpty()
        .withMessage("Please enter openings in number!"),
      body("skills").notEmpty().withMessage("Please select skills!"),
      body("applyBy")
        .notEmpty()
        .withMessage("Please select last date of job application!"),
    ];

    await Promise.all(rulesforUpdateJob.map((rule) => rule.run(req)));
    // console.log(req.body);
    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      next();
    } else {
      let idNumber = parseInt(req.body.id);
      let job = JobsModel.getJobById(idNumber);
      return res.render("updateJobForm", {
        job,
        errorMsg: validationErr.array()[0].msg,
      });
    }
  };


  //Validation for sending correct information by the applicant while applying for the job
  validateapplyReq = async (req, res, next) => {
    const rulesforApplyJob = [
      body("username")
        .notEmpty()
        .withMessage("Please enter username!")
        .isAlpha()
        .withMessage("Name must contain only alphabetic characters!")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be 3 and 20 characters long!"),
      body("email").notEmpty().withMessage("Please enter valid email!"),
      body("contact")
        .isInt({ min: 0 })
        .withMessage("Please enter a valid contact number with 10 digits!")
        .isLength({ min: 10, max: 10 })
        .withMessage("Contact number must be exactly 10 digits long!"),
      body("resume").custom((value, { req }) => {
        // Check if file exists in the request
        if (!req.file) {
          throw new Error("No file uploaded!");
        }

        // Check if the file is a PDF
        if (req.file.mimetype !== "application/pdf") {
          throw new Error("Please upload a PDF file!");
        }

        // Validation passed
        return true;
      }),
    ];

    await Promise.all(rulesforApplyJob.map((rule) => rule.run(req)));

    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      next();
    } else {
      return res.render("apply", {
        errorMsg: validationErr.array()[0].msg,
        success: false,
      });
    }
  };

  //Validation for recruiter registration
  validateRegisterReq = async (req, res, next) => {
    const rulesforRegis = [
      body("company").notEmpty().withMessage("Please enter company!"),
      body("username")
        .notEmpty()
        .withMessage("Please enter username!")
        .isAlpha()
        .withMessage("Name must contain only alphabetic characters!")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be 3 and 20 characters long!"),
      body("email")
        .notEmpty()
        .withMessage("Please enter valid email!")
        .isEmail()
        .withMessage("Invalid email address!"),
      body("password")
        .notEmpty()
        .isLength({})
        .withMessage("Please enter password!")
        .isLength({ min: 6, max: 20 })
        .withMessage("Password must be between 6 and 20 characters long!"),
    ];

    await Promise.all(rulesforRegis.map((rule) => rule.run(req)));

    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      next();
    } else {
      return res.render("recruiterRegister", {
        errorMsg: validationErr.array()[0].msg,
      });
    }
  };

  
  //Validation for recruiter login
  validateLoginReq = async (req, res, next) => {
    const rulesforLogin = [
      body("email")
        .notEmpty()
        .withMessage("Please enter valid email!")
        .isEmail()
        .withMessage("Invalid email format"),
      body("password")
        .notEmpty()
        .withMessage("Please enter password!")
        .isAlphanumeric()
        .withMessage("Password must contain alphanumeric characters")
        .isLength({ min: 6, max: 20 })
        .withMessage("Password must be between 6 and 20 characters long!"),
    ];

    await Promise.all(rulesforLogin.map((rule) => rule.run(req)));

    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) {
      next();
    } else {
      return res.render("recruiterLogin", {
        errorMsg: validationErr.array()[0].msg,
      });
    }
  };
}
