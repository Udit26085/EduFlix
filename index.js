import express from "express";
import { error } from "node:console";
const app = express();
import * as fs from 'node:fs/promises';
import bodyParser from "body-parser";
import pg from "pg";
const port = 3000;



const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Eduflix",
  password: "uditbhatia26",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/login",(req,res)=>{
  res.render("login.ejs");



});


app.get("/vc",(req,res)=>{
  res.render("vconference.ejs");
});



app.get("/",(req,res)=>{
  res.render("index.ejs");
})


app.get("/about",(req,res)=>{
  res.render("about.ejs");
})

app.get("/pricing",(req,res)=>{
  res.render("pricing.ejs");
})


app.get("/sign-up",(req,res)=>{
  res.render("sign-up.ejs");
});


app.post("/sign-up", async(req,res)=>{
  const email = req.body.username;
  const password = req.body.password;

  const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password]
  );
  res.render("logged-in.ejs");
    });

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.render("logged-in.ejs")});
//   try {
//     const result = await db.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       const storedPassword = user.password;

//       if (password === storedPassword) {
//         res.render("logged-in.ejs");
//       } else {
//         res.send("Incorrect Password");
//       }
//     } 
//   } catch (err) {
//     console.log(err);
//   }
// });




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





app.get("/faq",(req,res)=>{
  res.render("faq.ejs");
});