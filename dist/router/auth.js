"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const KaKaoAuth_1 = __importDefault(require("../passport/KaKaoAuth"));
const router = express_1.default.Router();
router.get("/kakao", (req, res) => {
    res.render("kakao");
});
router.post("/kakao", (req, res) => {
    res.send("post kakao");
});
router.get('/kakao/callback', KaKaoAuth_1.default.authenticate('kakao', {
    failureRedirect: '/',
    successRedirect: "/auth/kakao"
}));
exports.default = router;
