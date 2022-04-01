import express from 'express'
import loginController from '../controllers/login.controller.js';
import adminController from '../controllers/admin.controller.js';
const Router = express.Router();

// Get Routes
Router.get("/login", loginController.getLogin);
Router.get("/forgot_password", loginController.getForgot);
Router.get("/dashboard", loginController.getDashboard);
Router.get("/", loginController.getSignup);

// Post Routes
Router.post("/login", loginController.postLogin);
Router.post("/create_user", adminController.createNewUser);
Router.post("/create_project", adminController.createNewProject);
Router.post("/forgot", loginController.postForgot);

export default Router;