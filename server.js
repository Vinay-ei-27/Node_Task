// *--------------------------Imports------------------------------*
import express, { json, static as Static, urlencoded } from 'express';
const app = express()
import { resolve } from 'path';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import mongoose from 'mongoose'
import passport from 'passport';
import session from 'express-session';

// Route Imports
import LoginRoutes from './routes/routes.js';
// File Imports
import Passport from './controllers/log/passport.js';
// *--------------------------Imports------------------------------*

// Path & File Reader Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// View Engine
app.set("view engine", "ejs");
// Dotenv and express config
config()
// Serve Static Content
app.use("/assets", Static(resolve(__dirname, "assets")));
// Parsers
app.use(json({ extended: true }));
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
// Session Manger
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
    })
);
// DB initialization
try {
    mongoose.connect('mongodb+srv://admin-vinay:Vinay1996@cluster0.s1o8y.mongodb.net/taskDB', {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }).then(() => console.log('DB Connected Successfully'), err => console.log(err));
} catch (error) {
    console.log('Cannot Connect to Database')
}
// Catch error after db connection
mongoose.connection.on('error', err => {
    console.log(err)
});
// Passport config
Passport(passport);
// Pass passport to the view
app.use(passport.initialize());
app.use(passport.session());
// Authenticate user for each req
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    if (req.isAuthenticated()) {
        res.locals.user = req.user || null;
    }
    next();
})
// Adding Routes
app.use("/", LoginRoutes);
// App Port Initialization
const PORT = process.env.PORT || 3000
// Starting Server on Port
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))