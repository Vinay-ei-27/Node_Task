import { Strategy } from 'passport-local';
import UserModel from '../../model/user.model.js'

const LocalStrategy = Strategy;
const User = UserModel;

export default function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'User is not registered' }); }
                if (user.password !== password) { return done(null, false, { message: 'Password Incorrect' }); }
                return done(null, user);
            });
        }
    ));

    // serialize user object
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // deserialize user object
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });
}