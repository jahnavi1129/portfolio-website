const router=require("express").Router();
const db=require("../config/db");

router.get("/",(req,res)=>{
 db.query("SELECT * FROM blogs",(e,data)=>{
   res.json(data);
 });
});

router.post("/",(req,res)=>{
 const {title,content}=req.body;

 db.query(
  "INSERT INTO blogs(title,content) VALUES(?,?)",
  [title,content]
 );

 res.send("Blog Added");
});

module.exports=router;
