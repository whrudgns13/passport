import passport from "passport";
import { Strategy } from "passport-local";

const authData = {
    email : "whrudgns13",
    password : "745613",
    nickname : "joga"
};

passport.use(new Strategy((username , password, done) => {
    if(username!==authData.email){
        return done(null,false,{message : "사용자가 없습니다."})
    }
    
    if(password!==authData.password){
        return done(null,false,{message : "비밀번호가 다릅니다."})
    }
    return done(null,authData);
}))

passport.serializeUser(function(user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});

// passport.deserializeUser(function(user, done) {
//     console.log('deserializeUser() 호출됨.');
//     console.log(user);

//     done(null, user);
// })

export default passport