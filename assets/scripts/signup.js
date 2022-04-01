const createUserForm = document.querySelector("#create__user__form");

createUserForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let data = {};
	if (document.getElementById("ppass").value !== document.getElementById("cpass").value) {
		alert("Password and Confirm Password do not match");
		return;
	}
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
			if (res.message == "User created successfully") {
				window.location.href = "/login";
			} else {
				alert(res.message);
			}
		}).catch((err) => {
			alert(err.message)
		})
})
