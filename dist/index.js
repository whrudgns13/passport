"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("./passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
const app = (0, express_1.default)();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use((0, cookie_parser_1.default)());
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdgs',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use(flash());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", (req, res) => {
    console.log("Test");
    res.send(`
        <h1>Hello Express</h1>
        <a href="./login"> login </a>
    `);
});
app.get("/logined", (req, res) => {
    res.send(`
        <h1>logined</h1>
    `);
});
app.post("/login-prosess", passport_1.default.authenticate("local", {
    successRedirect: "/logined",
    failureRedirect: "/login",
    failureFlash: true
}));
app.get("/login", (req, res) => {
    res.render("login");
});
app.listen(3001, () => {
    console.log("server open");
});
