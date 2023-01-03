"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_kakao_1 = require("passport-kakao");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENTID = process.env.CLIENTID;
passport_1.default.use('kakao', new passport_kakao_1.Strategy({
    clientID: CLIENTID,
    callbackURL: '/auth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    if (profile.username === "조경훈") {
        done(null, profile);
    }
})));
passport_1.default.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    console.log(user);
    done(null, user);
});
exports.default = passport_1.default;
