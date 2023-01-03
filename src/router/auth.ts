import express,{Router} from "express";
import passport from "../passport/KaKaoAuth";

const router : Router = express.Router();

router.get("/kakao",(req,res)=>{
    res.render("kakao");
})

router.post("/kakao",(req,res)=>{
    res.send("post kakao");
})

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
    successRedirect : "/auth/kakao"
}));

export default router;