import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
	projectName: {
		type: String,
		required: true,
		unique: true
	},
	numProjects: {
		type: Number,
		required: true,
	},
	numSchools: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['in Progress', 'Complete']
	},
}, {
	timestamps: true
})

export default mongoose.model("Projects", ProjectSchema);