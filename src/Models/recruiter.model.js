export default class RecruiterModel {
    constructor(id,company, username, email, password, skills) {
      this.id=id;
      this.company = company;
      this.username = username;
      this.email = email;
      this.password = password;

    }
  static getAllRecruiters(){
    return recruiters;
  }

  static addRecruiter(id,company,username,email,password){
const newRecruiter=new RecruiterModel(id,company,username,email,password);
recruiters.push(newRecruiter);
  }

  static isValidRecruiter(email,password){
    const result=recruiters.find(r=>r.email===email && r.password===password);
    return result;
  }
}
  var recruiters = [
    {
        id:1,
      company: "Coding Ninjas",
      username: "Amit",
      email: "amit@gmail.com",
      password: "amit1234",
    },
    {
        id:2,
      company: "Go Digit",
      username: "Shreeja",
      email: "shreeja@gmail.com",
      password: "shree12345",
    },
    {
        id:3,
      company: "Juspay",
      username: "Krish",
      email: "Krish@gmail.com",
      password: "krish123",
    },
  ];
  