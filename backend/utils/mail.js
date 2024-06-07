import nodemailer from "nodemailer";
const sendMail = (email,subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOption, function (error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log(`Email sent: ${info.response}`)
        }
    });
}

export default sendMail;