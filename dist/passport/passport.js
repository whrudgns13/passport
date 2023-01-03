"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const authData = {
    email: "whrudgns13",
    password: "12345",
    nickname: "jogayo"
};
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    console.log(username, password);
    if (username !== authData.email) {
        return done(null, false, { message: "사용자가 없습니다." });
    }
    if (password !== authData.password) {
        return done(null, false, { message: "비밀번호가 다릅니다." });
    }
    return done(null, authData);
}));
passport_1.default.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    done(null, user);
});
exports.default = passport_1.default;
