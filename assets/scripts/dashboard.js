const newusermodaltrigger = document.querySelector(".trigger__modal_user");
const usercreatemodal = document.querySelector(".user__create__modal");
const modalBox = document.querySelector(".modal__box");
const createUserForm = document.querySelector("#create_user_form");

newusermodaltrigger.addEventListener("click", function () {
	if (usercreatemodal.classList.contains("visible")) {
		usercreatemodal.classList.remove("visible")
	} else {
		usercreatemodal.classList.add("visible")
	}
})

usercreatemodal.addEventListener("click", function (e) {
	if (e.target == usercreatemodal) {
		usercreatemodal.classList.remove("visible")
	}
})

createUserForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let data = {};
	createUserForm.querySelectorAll("input").forEach((ele) => {
		const keyname = ele.getAttribute("name");
		const datavalue = ele.value;
		data[keyname] = datavalue;
	})
	createUserForm.querySelectorAll("select").forEach((ele) => {
		const keyname = ele.getAttribute("name");
		const datavalue = ele.value;
		data[keyname] = datavalue;
	})
	fetch("/create_user", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res) => res.json())
		.then((res) => {
			console.log(res)
		})
	usercreatemodal.classList.remove("visible")
})

// Projects
const newprojectmodaltrigger = document.querySelector(".trigger__modal_project");
const projectcreatemodal = document.querySelector(".project__create__modal");
const modalpbox = document.querySelector(".modalp__box");
const createProjectForm = document.querySelector("#create_project_form");

newprojectmodaltrigger.addEventListener("click", function () {
	if (projectcreatemodal.classList.contains("visible")) {
		projectcreatemodal.classList.remove("visible")
	} else {
		projectcreatemodal.classList.add("visible")
	}
})

projectcreatemodal.addEventListener("click", function (e) {
	if (e.target == projectcreatemodal) {
		projectcreatemodal.classList.remove("visible")
	}
})

createProjectForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let data = {};
	createProjectForm.querySelectorAll("input").forEach((ele) => {
		const keyname = ele.getAttribute("name");
		const datavalue = ele.value;
		data[keyname] = datavalue;
	})
	createProjectForm.querySelectorAll("select").forEach((ele) => {
		const keyname = ele.getAttribute("name");
		const datavalue = ele.value;
		data[keyname] = datavalue;
	})

	fetch("/create_project", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res) => res.json())
		.then((res) => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	projectcreatemodal.classList.remove("visible")
})

const sortdata = () => {
	document.querySelector(".projects__sorts").submit()
}