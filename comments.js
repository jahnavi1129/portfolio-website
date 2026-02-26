const router=require("express").Router();
const db=require("../config/db");

router.post("/",(req,res)=>{
 const {blog_id,user_name,comment}=req.body;

 db.query(
  "INSERT INTO comments(blog_id,user_name,comment) VALUES(?,?,?)",
  [blog_id,user_name,comment]
 );

 res.send("Comment Added");
});

module.exports=router;
