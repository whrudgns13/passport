import passport from "passport";
import {Strategy} from "passport-kakao";
import dotenv from 'dotenv'
dotenv.config();

const CLIENTID = process.env.CLIENTID as string;
passport.use('kakao', new Strategy({
    clientID: CLIENTID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    if(profile.username==="조경훈"){
      done(null,profile)
    }
}))

passport.serializeUser(function(user, done) {
  console.log('serializeUser() 호출됨.');
  done(null, user);
});

passport.deserializeUser(function(user : string, done) {
  console.log('deserializeUser() 호출됨.');
  console.log(user);
  done(null, user);
})

export default passport;