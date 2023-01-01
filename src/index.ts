import express from "express";
import passport from "./passport";
import cookieParser from "cookie-parser";

var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');
const app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdgs',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
    console.log("Test");
    res.send(`
        <h1>Hello Express</h1>
        <a href="./login"> login </a>
    `);
})

app.get("/logined",(req,res)=>{
    res.send(`
        <h1>logined</h1>
    `);
})

app.post("/login-prosess",passport.authenticate("local",{
    successRedirect : "/logined",
    failureRedirect : "/login",
    failureFlash : true
}))

app.get("/login",(req,res)=>{
    res.render("login")
})

app.listen(3001,()=>{
    console.log("server open");
})