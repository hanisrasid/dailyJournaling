//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ld = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/journalDB");

const journalSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Journal = mongoose.model("Journal", journalSchema);

const homeStartingContent = "Daily journaling is an important habit to instill in our daily routine. It can help you achieve your goals through keeping better track of your intentions and help you stay accountable of your actions. Writing your thoughts down also strengthens your memory and essentially lets your brain know that you want to remember what you wrote down. It also obviously improves your writing and communication skills because you'll consistently be writing down your thoughts and emotions into proper sentences.";
const aboutContent = "I have been on a self-improvement journey as of recently and one of the most beneficial habits that successful individuals have is journaling. As a software developer, I have put my own twist to it and made a whole website for it so that I can keep track of my thought, goals and emotions and be able to use this information to better myself. Come and join me on this self-improvement journey and let's succeed together!";
const contactContent = "You can contact me through LinkedIn and feel free to check out my Github too!😄";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res) =>{
  //returns all journal entries in db
  Journal.find((err,result) =>{
    var posts = result;
    if(err){
        console.log(err);
    }
    else{
        //sends variables to list.ejs
        res.render("home",{content : homeStartingContent, posts : posts});
    }
});
  
});

app.get("/about", (req,res) =>{
  res.render("about",{about: aboutContent});
});

app.get("/contact", (req,res) =>{
  res.render("contact",{contact: contactContent});
});

app.get("/posts/:postID", (req,res) =>{
  //finds journal entry by id
  Journal.findById(req.params.postID, (err,result) => {
    if(err){
      console.log(err);
    }
    else{
      res.render("post",{title: result.title, body: result.body});
    }
  });

});

app.get("/compose", (req,res) =>{
  res.render("compose");
});

app.post("/compose", (req,res) =>{
  const post = new Journal({
    title: req.body.postTitle,
    body: req.body.postBody
  });

  post.save();
  res.redirect("/");
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
