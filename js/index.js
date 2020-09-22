

const h = document.querySelector("header"),
    nav_top = document.querySelector(".carousel"),
    items = document.querySelector(".items"),
    fields = document.getElementById("fields"),
    about = document.getElementById("about"),
    our_projects = document.getElementById("our-projects"),
    chronology = document.getElementById("chronology"),
    counter = document.getElementById("counts"),
    arr = [nav_top, about, fields, our_projects, chronology],
    stickPoint = getDistance;

function getDistance(par) {
    var topDist = par.offsetTop + par.offsetHeight;

    return topDist;
}
//======================نحن فخورون

function anmition(id) {
    let start // set on the first step to the timestamp provided
    const el = document.getElementById(id) // get the element
    const final = parseInt(el.textContent, 10) // parse out the final number
    const duration = 1000 // duration in ms
    const step = ts => {
        if (!start) {
            start = ts
        }
        // get the time passed as a fraction of total duration
        let progress = (ts - start) / duration

        el.textContent = Math.floor(progress * final) // set the text
        if (progress < 1) {
            // if we're not 100% complete, request another animation frame
            requestAnimationFrame(step)
        }
    }


    // start the animation
    return requestAnimationFrame(step)
}
const count_items = document.querySelector(".count-items").children;

let ticking = false

var height = counter.getClientRects()
window.addEventListener('scroll', function (e) {

    var wh = window.innerHeight - 40
    let titel = document.getElementById("titel").getBoundingClientRect()
    arr.forEach((x, rek) => {

        if (wh / 3 >= x.getBoundingClientRect().top) {
            document.querySelector('.active-scrol').classList.remove('active-scrol');
            items.children[rek].classList.add('active-scrol');
        }
    });
    if (wh >= titel.top && !ticking) {
        Array.from(count_items, item => anmition(item.firstElementChild.id))
        ticking = true
    }



})
// =====================   من مشاريعنا
const active = document.querySelector(".projects")

function getEventTarget(e) {
    e = e || window.event;
    return e.target;
}
active.addEventListener("click", function (event) {
    let target = getEventTarget(event);

    let li = target.closest('a'); // get reference

    const img_item = active.nextElementSibling.firstElementChild;
    let child = img_item.children;

    Object.values(child).forEach(element => {
        element.style.transition = "all 0.3s ease-in-out";

    });
    if (li != null) {
        Array.from(active.children, ch => ch.classList.remove('active'));
        li.classList.add('active');
    }


    let nodes = Array.from(active.children); // get array

    let index3 = nodes.indexOf(li);
    console.log(img_item)

    if (index3 === 1) {
        child[2].style.transform = "translateX(-100%) scale(0)";
        child[0].style.display = "block";
        child[1].style.display = "block";
        setTimeout(() => {
            child[2].style.display = "none";
            child[0].style.transform = "scale(1) translateX(50%)";
            child[1].style.transform = " scale(1) translateX(50%)";
        }, 300);


    }
    if (index3 === 2) {
        child[0].style.transform = "scale(0)translateX(0%)";
        child[1].style.transform = " scale(0)translateX(0%)";
        child[2].style.display = "block";
        setTimeout(() => {
            child[0].style.display = "none";
            child[1].style.display = "none";
            child[2].style.transform = "translateX(-100%) scale(1)";

        }, 300)

    }
    if (index3 === 0) {
        Object.values(child).forEach(e => { e.style.display = "block" })

        setTimeout(() => {
            child[0].style.transform = "scale(1) translateX(0%)";
            child[1].style.transform = " scale(1) translateX(0%)";
            child[2].style.transform = "translateX(-0%) scale(1)";
        }, 300)

    }


});


//===========cr
const sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    indicatots_ol = document.getElementById('indicatots-ol'),
    carouselImages = document.querySelectorAll('.carousel-seat');
f = [...sliderItems.children]

for (const [key, value] of Object.entries(sliderItems.children)) {
    let addchiled = document.createElement('li');
    addchiled.setAttribute('class', 'indicator-item');
    indicatots_ol.appendChild(addchiled);

}
/*[...].forEach(() => {
    

})*/
indicatots_ol.firstElementChild.classList.add('selected');

function slide(items, prev, next, ind) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.children,

        slidesLength = sliderItems.childElementCount,
        firstSlide = items.firstElementChild,
        lastSlide = items.lastElementChild,
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;
    var index = 0;
    window.index = index;
    console.log([...f])
    window.slidesLength = slidesLength
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    const dragStart = (e) => {
        e = e || window.event;
        console.log(e)
        e.preventDefault();
        posInitial = items.offsetLeft;
        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmousemove = dragAction;
            document.onmouseup = dragEnd;

        }
    }
    const dragAction = (e) => {
        e = e || window.event;
        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }
    const dragEnd = (e) => {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1);
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1);
        } else {
            items.style.left = (posInitial) + "px";
        }
        e.preventDefault()
        console.log(document.onmouseup, document.onmousemove)
        document.onmouseup = false;
        document.onmousemove = false;
    }
    const shiftSlide = (dir) => {
        items.classList.add('shifting');
        console.log('index shiftSlide', index)
        if (allowShift) {
            document.querySelector('.selected').classList.remove('selected');
            if (dir == 1) {
                if (index === ind.childElementCount - 1) {

                    ind.firstElementChild.classList.add('selected');
                } else {

                    ind.children[index + 1].classList.add('selected');
                }
                items.style.left = -((index + 2) * 100) + '%';
                index++;
            } else if (dir == -1) {
                if (index === 0) {
                    ind.children[ind.childElementCount - 1].classList.add('selected');
                } else {

                    ind.children[index - 1].classList.add('selected');
                }
                items.style.left = -(index * 100) + '%';

                index--;
            }
        };
        allowShift = false;
    }
    const checkIndex = () => {
        items.classList.remove('shifting');
        //let indexli = nodes.indexOf(li)
        var animat = document.getElementsByClassName("content");




        if (index == -1) {
            items.style.left = -(ind.children.length * 100) + "%";
            console.log('ind.children', index)
            index = ind.children.length - 1;
        }
        if (index == ind.children.length) {
            items.style.left = -(1 * 100) + "%";
            index = 0;
        }
        document.querySelectorAll(".content-animtions").forEach(x => x.classList.remove("content-animtions"))
        f[index].classList.add("content-animtions")
        console.log('index check', f[index], index)
        allowShift = true;
    }
    // Click events
    function getEventTarget(e) {
        e = e || window.event;
        return e.target;
    }
    ind.addEventListener("click", function (event) {
        let target = getEventTarget(event);
        let li = target.closest('li'); // get reference
        console.log(li)
        if (li == null) {
            target.preventDefault
        } else {
            document.querySelector('.selected').classList.remove('selected');
            let nodes = Array.from(ind.children); // get array
            let index3 = nodes.indexOf(li);
            li.classList.add('selected');
            items.classList.add('shifting');
            items.style.left = -((index3 + 1) * 100) + "%";

            index = index3;
            console.log('index addEventListener', index)
            alert(index3);
        }
    });
    /*-------------------Key events------------------ */
    document.addEventListener('keydown', function (e) {
        switch (e.code) {
            case "KeyA":
            case "ArrowLeft":
                shiftSlide(-1);
                break;
            case "KeyD":
            case "ArrowRight":
                nextT();
                break;
        }
    });
    /*-------------------Click events----------------- */
    prev.addEventListener('click', function () {
        shiftSlide(-1)

    });
    const nextT = () => {
        console.log(f)
        shiftSlide(1)
    }
    next.addEventListener('click', nextT);
    // Mouse events
    items.onmousedown = dragStart;
    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
    // Transition events
    items.addEventListener('transitionend', checkIndex);
    console.log(checkIndex())
    setInterval(nextT, 12000)
}

slide(sliderItems, prev, next, indicatots_ol);