import UserModel from '../model/user.model.js';
import ProjectModel from '../model/project.model.js';

const createNewUser = (req, res, next) => {
	const newUser = new UserModel(req.body);
	newUser.save()
		.then(user => {
			res.status(201).json({
				message: "User created successfully",
				user: user
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "User creation failed",
				error: err
			});
		});
}

const createNewProject = (req, res, next) => {
	const newProject = new ProjectModel(req.body);
	newProject.save()
		.then(project => {
			res.status(201).json({
				message: "Project created successfully",
				project: project
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Project creation failed",
				error: err
			});
		});
}

export default {
	createNewUser,
	createNewProject
}