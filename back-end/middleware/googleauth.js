 const passport = require("passport");
 const GoogleStrategy = require("passport-google-oauth20").Strategy;
 const clientID=process.env.GOOGLE_CLIENT_ID;
 const clientSecret=process.env.GOOGLE_CLIENT_SECRET;
const User = require('../models/userModel')


 passport.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL: "/auth/google/callback",
        },
        async(accessToken,refreshToken,profile,done)=>{
            console.log("User Profile:",profile)
            try {
                let user = await User.findOne({email:profile.emails[0].value});
            
                if(!user){
                    user = new User({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        profileImg: profile.photos[0].value,
                        role:"vendor"
                    });
                    await user.save();
                }
                return done(null,user)
                
            } catch (error) {
                return done( err ,null);
            }
            
        }
    )
 );

 passport.serializeUser((user,done)=>{
    done(null,user);
 });
 
 passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});