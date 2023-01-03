import express from "express";
//import passport from "./passport";
import passport from "./passport/KaKaoAuth";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import auth from "./router/auth";

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
    resave: true,
    saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    console.log(req.user);
    next();
})

app.get("/",(req,res)=>{
    res.render("home");
})

app.use("/auth",auth);

app.get("/test",(req,res)=>{
    res.send("test")
})

app.get('/login', passport.authenticate('kakao'));
app.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
            return next(err)
        };
        res.redirect("/");
    });
});

app.listen(3000,()=>{
    console.log("server open");
})

// app.post("/login-prosess",passport.authenticate("local",{
//     successRedirect : "/logined",
//     failureRedirect : "/login",
//     failureFlash : true
// }))

// app.get("/login",(req,res)=>{
//     res.render("login")
// })
