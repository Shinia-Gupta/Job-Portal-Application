// import http from "http";
import EventEmitter from "events";
import nodemailer from "nodemailer";

class CustomEvent extends EventEmitter {
  mailSent(email) {
    this.emit("mailSent", email);
  }
}

const customEvent = new CustomEvent();

function sendMailTo(req, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shiniaatwork@gmail.com",
      pass: "asufrnhlenirrxue",
    },
  });

  if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { email } = JSON.parse(data);
      //  Using Nodemailer to send confirmation email
      const mailOptions = {
        from: "shiniaatwork@gmail.com",
        to: email,
        subject: "Query received",
        text: "We have received your query and will get back to you soon.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // Emit "mailSent" event
          customEvent.mailSent(email);
        }
      });

      res.end("Query received");
    });
  }
}

const Solution = () => {
  customEvent.addListener("mailSent", (email) => {
    console.log("custom event 'mailSent' emitted");
    console.log(
      `confirming that the email has been sent successfully to ${email}`
    );
  });
};

// export default server;
export { sendMailTo, Solution };
