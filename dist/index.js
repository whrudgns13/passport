"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import passport from "./passport";
const KaKaoAuth_1 = __importDefault(require("./passport/KaKaoAuth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./router/auth"));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
const app = (0, express_1.default)();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdgs',
    resave: true,
    saveUninitialized: false,
}));
app.use(flash());
app.use(KaKaoAuth_1.default.initialize());
app.use(KaKaoAuth_1.default.session());
app.use((req, res, next) => {
    console.log(req.user);
    next();
});
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/auth", auth_1.default);
app.get("/test", (req, res) => {
    res.send("test");
});
app.get('/login', KaKaoAuth_1.default.authenticate('kakao'));
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        ;
        res.redirect("/");
    });
});
app.listen(3000, () => {
    console.log("server open");
});
// app.post("/login-prosess",passport.authenticate("local",{
//     successRedirect : "/logined",
//     failureRedirect : "/login",
//     failureFlash : true
// }))
// app.get("/login",(req,res)=>{
//     res.render("login")
// })
