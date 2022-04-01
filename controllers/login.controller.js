import UserModel from '../model/user.model.js';
import ProjectModel from '../model/project.model.js';
import passport from 'passport'

const getLogin = (req, res, next) => {
    res.render("login")
}

const getSignup = (req, res, next) => {
    res.render("signup")
}

const getForgot = (req, res, next) => {
    res.render("forgot")
}

const postForgot = (req, res, next) => {
    const { email, firstName, password } = req.body

    UserModel.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/forgot_password");
        } else {
            if (user) {
                if (user.firstName != firstName) {
                    return res.status(400).redirect("/forgot_password");
                }
                user.password = password;
                user.save((err, user) => {
                    if (err) {
                        console.log(err);
                        res.redirect("/forgot_password");
                    } else {
                        res.redirect("/login");
                    }
                })
            } else {
                res.redirect("/forgot_password");
            }
        }
    })
}

const postLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard?psort=progress",
        failureRedirect: "/login",
    })(req, res, next);
}

const getDashboard = async (req, res, next) => {
    const { psort } = req.query
    const Users = await UserModel.find({});
    const Projects = await ProjectModel.find({});
    if (psort === "num_projects") {
        Projects.sort((a, b) => {
            return b.numProjects - a.numProjects
        })
    } else if (psort === "num_schools") {
        Projects.sort((a, b) => {
            return b.numSchools - a.numSchools
        })
    } else if (psort == "date") {
        Projects.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    } else if (psort == "progress") {
        Projects.sort((a, b) => {
            return 1;
        })
    }
    res.render("dashboard", {
        userdata: Users, keybinding: [
            { type: "firstName", value: "Name" },
            { type: "email", value: "Email" },
            { type: "phoneNum", value: "Contact Number" },
            { type: "createdAt", value: "Creation Date" },
            { type: "accessLevel", value: "Access Details" }
        ],
        projectdata: Projects,
        pkeybindings: [
            { type: "projectName", value: "Name" },
            { type: "numProjects", value: "No. of Projects" },
            { type: "numSchools", value: "No. of Schools" },
            { type: "status", value: "Status" },
            { type: "createdAt", value: "Creation Date" },
            { type: "view", value: "View" }
        ]
    })
}

export default {
    getLogin,
    getForgot,
    postLogin,
    getDashboard,
    getSignup,
    postForgot
}