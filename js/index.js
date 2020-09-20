

var h = document.querySelector("header"),
    nav_top = document.querySelector(".carousel"),
    items = document.querySelector(".items"),
    fields = document.getElementById("fields"),
    about = document.getElementById("about"),
    our_projects = document.getElementById("our-projects"),
    chronology = document.getElementById("chronology"),
    arr = [nav_top, about, fields, our_projects, chronology],
    stickPoint = getDistance;

function getDistance(par) {
    var topDist = par.offsetTop + par.offsetHeight;

    return topDist;
}

window.onscroll = function (e) {
    //- window.pageYOffset,

    offset = window.pageYOffset + 500;
    console.log(offset)
    arr.forEach((x, rek) => {

        if (offset >= x.offsetTop && offset <= getDistance(x)) {
            document.querySelector('.active-scrol').classList.remove('active-scrol');
            items.children[rek].classList.add('active-scrol');
        }

    });

}
// =====================   من مشاريعنا
const active = document.querySelector(".projects")
console.log(active)
function getEventTarget(e) {
    e = e || window.event;
    console.log(e.target)
    return e.target;
}
active.addEventListener("click", function (event) {
    let target = getEventTarget(event);
    console.log(target.text)
    let li = target.closest('a'); // get reference
    console.log(target, li)
    const img_item = document.querySelector(".img-item");
    let child = img_item.children;

    Object.values(child).forEach(element => {
        element.style.transition = "all 0.3s ease-in-out";
        console.log(element)
    });
    console.log(child);
    if (li != null) {
        document.querySelector('.active').classList.remove('active');
        li.classList.add('active');
    }


    let nodes = Array.from(active.children); // get array

    let index3 = nodes.indexOf(li);
    console.log(active.children, nodes, index3, target.text)

    if (target.text === "مواقع الكترونية") {
        child[2].style.transform = "translateX(-100%) scale(0)";
        child[0].style.display = "block";
        child[1].style.display = "block";
        setTimeout(() => {
            child[2].style.display = "none";
            child[0].style.transform = "scale(1) translateX(50%)";
            child[1].style.transform = " scale(1) translateX(50%)";
        }, 300);


    }
    if (target.text === "تطبيقات الجوال") {
        child[0].style.transform = "scale(0)translateX(0%)";
        child[1].style.transform = " scale(0)translateX(0%)";
        child[2].style.display = "block";
        setTimeout(() => {
            child[0].style.display = "none";
            child[1].style.display = "none";
            child[2].style.transform = "translateX(-100%) scale(1)";

        }, 300)

    }
    if (target.text === "الجميع") {
        Object.values(child).forEach(e => { e.style.display = "block" })

        setTimeout(() => {
            child[0].style.transform = "scale(1) translateX(0%)";
            child[1].style.transform = " scale(1) translateX(0%)";
            child[2].style.transform = "translateX(-0%) scale(1)";
        }, 300)

    }


});
