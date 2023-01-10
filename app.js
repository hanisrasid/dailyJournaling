//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ld = require("lodash");
let posts = [];

const homeStartingContent = "Daily journaling is an important habit to instill in our daily routine. It can help you achieve your goals through keeping better track of your intentions and help you stay accountable of your actions. Writing your thoughts down also strengthens your memory and essentially lets your brain know that you want to remember what you wrote down. It also obviously improves your writing and communication skills because you'll consistently be writing down your thoughts and emotions into proper sentences.";
const aboutContent = "I have been on a self-improvement journey as of recently and one of the most beneficial habits that successful individuals have is journaling. As a software developer, I have put my own twist to it and made a whole website for it so that I can keep track of my thought, goals and emotions and be able to use this information to better myself. Come and join me on this self-improvement journey and let's succeed together!";
const contactContent = "You can contact me through LinkedIn and feel free to check out my Github too!😄";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res) =>{
  res.render("home",{content : homeStartingContent, posts : posts});
  
});

app.get("/about", (req,res) =>{
  res.render("about",{about: aboutContent});
});

app.get("/contact", (req,res) =>{
  res.render("contact",{contact: contactContent});
});

app.get("/posts/:post", (req,res) =>{
  //iterates through posts array
  posts.forEach((post) =>{
    //checks if element in posts array includes route param
    if(ld.lowerCase(post.title) === ld.lowerCase(req.params.post)){
      res.render("post",{title:post.title, body:post.body});
    }
  });

});

app.get("/compose", (req,res) =>{
  res.render("compose");
});

app.post("/compose", (req,res) =>{
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
