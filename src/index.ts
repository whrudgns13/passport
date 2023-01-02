import express from "express";
//import passport from "./passport";
import passport from "./KaKaoAuth";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');
const app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdgs',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
    console.log("Test");
    res.send(`
        <h1>Hello Express</h1>
        <a href="./kakao"> login </a>
    `);
})


app.get('/kakao', passport.authenticate('kakao'));
app.get("/auth/kakao",(req,res)=>{
    res.send("kakao");
})

app.post("/auth/kakao",(req,res)=>{
    res.send("post kakao");
})

app.get('/auth/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
    successRedirect : "/auth/kakao"
}));

// app.post("/login-prosess",passport.authenticate("local",{
//     successRedirect : "/logined",
//     failureRedirect : "/login",
//     failureFlash : true
// }))

// app.get("/login",(req,res)=>{
//     res.render("login")
// })

app.listen(3001,()=>{
    console.log("server open");
})