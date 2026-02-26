const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res)=>{
 const {name,email,password}=req.body;

 const hash = await bcrypt.hash(password,10);

 db.query(
   "INSERT INTO users(name,email,password) VALUES (?,?,?)",
   [name,email,hash]
 );

 res.send("User Registered");
});

router.post("/login",(req,res)=>{
 const {email,password}=req.body;

 db.query(
  "SELECT * FROM users WHERE email=?",
  [email],
  async(err,result)=>{
    if(result.length==0) return res.send("User not found");

    const valid=await bcrypt.compare(password,result[0].password);
    if(!valid) return res.send("Wrong password");

    const token=jwt.sign({id:result[0].id},"secretkey");
    res.json({token});
 });
});

module.exports = router;
