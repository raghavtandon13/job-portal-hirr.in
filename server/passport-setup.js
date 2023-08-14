import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/User.js";

const YOUR_CLIENT_ID =
  "705654658896-io99ql0f0nrjah3mn8k255g870opaq62.apps.googleusercontent.com";
const YOUR_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: YOUR_CLIENT_ID,
      clientSecret: YOUR_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (mytoken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePicture:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : "",
            // Set other user properties as needed
          });
          await user.save();
          console.log(profile.photos[0].value);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
