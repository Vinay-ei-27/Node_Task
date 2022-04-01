// Nav Bar
const navtiles = document.querySelectorAll(".nav__tile");
const subnavtiles = document.querySelectorAll(".sub__tile");

navtiles.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        let nosubtileactive = true
        subnavtiles.forEach((elem) => {
            if (elem.classList.contains("subactive__tile")) {
                nosubtileactive = false
                if (elem.parentElement.parentElement !== ele) {
                    elem.classList.remove("subactive__tile");
                }
            }
        });
        if (nosubtileactive) {
            let localsubtile = ele.querySelectorAll(".sub__tile")
            localsubtile[0].classList.add("subactive__tile");
        }
        navtiles.forEach((ele) => {
            ele.classList.remove("active__tile");
        });
        ele.classList.add("active__tile");
    })
})

subnavtiles.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        subnavtiles.forEach((ele) => {
            ele.classList.remove("subactive__tile");
        });
        ele.classList.add("subactive__tile");
        ele.parentElement.parentElement.classList.add("active__tile");
    })
})