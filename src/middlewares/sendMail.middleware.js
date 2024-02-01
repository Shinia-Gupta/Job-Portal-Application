import nodemailer from 'nodemailer'
export const sendMail=async (req,res)=>{
    const {email}=req.body;
    console.log(req.body);
    const mailTransporter=await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'abc@mail.com',
            pass:'adfgasdfadff'
        }
    });

    const mailOptions={
        from:'abc@mail.com',
        to:email,
        subject:'Application Recieved',
        text:'Dear Applicant,\n\nThank you for applying to our job posting. We appreciate your interest in our company and the position. We will review your application and contact you if you are selected for further consideration.\n\nBest regards,\nYour Company Name '
    }

   await mailTransporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log('Error occurred:',err);
        }else{
            console.log('Email sent: ',info.response);
        }
    })
}