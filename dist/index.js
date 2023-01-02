"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import passport from "./passport";
const KaKaoAuth_1 = __importDefault(require("./KaKaoAuth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
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
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use(flash());
app.use(KaKaoAuth_1.default.initialize());
app.use(KaKaoAuth_1.default.session());
app.get("/", (req, res) => {
    console.log("Test");
    res.send(`
        <h1>Hello Express</h1>
        <a href="./kakao"> login </a>
    `);
});
app.get('/kakao', KaKaoAuth_1.default.authenticate('kakao'));
app.get("/auth/kakao", (req, res) => {
    res.send("kakao");
});
app.post("/auth/kakao", (req, res) => {
    res.send("post kakao");
});
app.get('/auth/kakao/callback', KaKaoAuth_1.default.authenticate('kakao', {
    failureRedirect: '/',
    successRedirect: "/auth/kakao"
}));
// app.post("/login-prosess",passport.authenticate("local",{
//     successRedirect : "/logined",
//     failureRedirect : "/login",
//     failureFlash : true
// }))
// app.get("/login",(req,res)=>{
//     res.render("login")
// })
app.listen(3001, () => {
    console.log("server open");
});
