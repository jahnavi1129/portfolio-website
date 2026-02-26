const router = require("express").Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");

router.post("/",(req,res)=>{
    const {name,email,message} = req.body;

    db.query(
      "INSERT INTO contacts(name,email,message) VALUES (?,?,?)",
      [name,email,message]
    );

    // Email sending
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    });

    transporter.sendMail({
        from:email,
        to:process.env.EMAIL,
        subject:"New Portfolio Message",
        text:message
    });

    res.json({msg:"Message Sent"});
});

module.exports = router;
