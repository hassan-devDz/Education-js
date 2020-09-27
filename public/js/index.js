const h = document.querySelector("header"),
    nav_top = document.querySelector(".carousel"),
    items = document.querySelector(".items"),
    fields = document.getElementById("fields"),
    about = document.getElementById("about"),
    our_projects = document.getElementById("our-projects"),
    chronology = document.getElementById("chronology"),
    counter = document.getElementById("counts"),
    arr = [nav_top, about, fields, our_projects, chronology],
    stickPoint = getDistance,
    count_items = document.querySelector(".count-items").children,
    height = counter.getClientRects(),
    active = document.querySelector(".projects"),
    sliderItems = document.getElementById("slides"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    indicatots_ol = document.getElementById("indicatots-ol"),
    carouselImages = document.querySelectorAll(".carousel-seat"),
    f = [...sliderItems.children];
let ticking = false;
for (const [key, value] of Object.entries(sliderItems.children)) {
    let addchiled = document.createElement("li");
    addchiled.setAttribute("class", "indicator-item");
    indicatots_ol.appendChild(addchiled);
}

indicatots_ol.firstElementChild.classList.add("selected");

function getDistance(par) {
    let topDist = par.offsetTop + par.offsetHeight;

    return topDist;
}
//======================نحن فخورون

function anmition(id) {
    let start; // set on the first step to the timestamp provided
    const el = document.getElementById(id), // get the element
        final = parseInt(el.textContent, 10), // parse out the final number
        duration = 1000, // duration in ms
        step = (ts) => {
            if (!start) {
                start = ts;
            }
            // get the time passed as a fraction of total duration
            let progress = (ts - start) / duration;

            el.textContent = Math.floor(progress * final); // set the text
            if (progress < 1) {
                // if we're not 100% complete, request another animation frame
                requestAnimationFrame(step);
            }
        };

    // start the animation
    return requestAnimationFrame(step);
}

window.addEventListener("scroll", function(e) {
    var wh = window.innerHeight - 40;
    var cont_select_h = document.querySelector(".cont_select_int");

    console.log(
        "cont_select_int ",
        cont_select_h.getBoundingClientRect().top,
        window.innerHeight
    );
    let titel = document.getElementById("titel").getBoundingClientRect();
    arr.forEach((x, rek) => {
        if (wh / 3 >= x.getBoundingClientRect().top) {
            document.querySelector(".active-scrol").classList.remove("active-scrol");
            items.children[rek].classList.add("active-scrol");
        }
    });
    if (wh >= titel.top && !ticking) {
        Array.from(count_items, (item) => anmition(item.firstElementChild.id));
        ticking = true;
    }
});
// =====================   من مشاريعنا

function getEventTarget(e) {
    e = e || window.event;

    return e.target;
}
active.addEventListener("click", function(event) {
    let target = getEventTarget(event);

    let li = target.closest("a"); // get reference

    const img_item = this.nextElementSibling.firstElementChild;
    let child = img_item.children;

    Object.values(child).forEach((element) => {
        element.style.transition = "all 0.3s ease-in-out";
    });
    if (li != null) {
        Array.from(this.children, (ch) => ch.classList.remove("active"));
        li.classList.add("active");
    }

    let nodes = Array.from(this.children); // get array

    let index3 = nodes.indexOf(li);

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
        }, 300);
    }
    if (index3 === 0) {
        Object.values(child).forEach((e) => {
            e.style.display = "block";
        });

        setTimeout(() => {
            child[0].style.transform = "scale(1) translateX(0%)";
            child[1].style.transform = " scale(1) translateX(0%)";
            child[2].style.transform = "translateX(-0%) scale(1)";
        }, 300);
    }
});

//===========cr

function slide(items, prev, next, ind) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.children,
        slidesLength = items.childElementCount,
        firstSlide = items.firstElementChild,
        lastSlide = items.lastElementChild,
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;
    var index = 0;
    window.index = index;
    window.slidesLength = slidesLength;
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    const dragStart = (e) => {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;
        if (e.type == "touchstart") {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmousemove = dragAction;
            document.onmouseup = dragEnd;
        }
    };
    const dragAction = (e) => {
        e = e || window.event;
        if (e.type == "touchmove") {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = items.offsetLeft - posX2 + "px";
    };
    const dragEnd = (e) => {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1);
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1);
        } else {
            items.style.left = posInitial + "px";
        }
        e.preventDefault();
        document.onmouseup = false;
        document.onmousemove = false;
    };
    const shiftSlide = (dir) => {
        items.classList.add("shifting");
        if (allowShift) {
            if (dir == 1) {
                items.style.left = -((index + 2) * 100) + "%";
                index++;
            } else if (dir == -1) {
                items.style.left = -(index * 100) + "%";

                index--;
            }
        }
        allowShift = false;
    };
    const checkIndex = () => {
        items.classList.remove("shifting");
        //let indexli = nodes.indexOf(li)

        if (index == -1) {
            items.style.left = -(ind.children.length * 100) + "%";
            index = ind.children.length - 1;
        }
        if (index == ind.children.length) {
            items.style.left = -(1 * 100) + "%";
            index = 0;
        }
        document.querySelector(".selected").classList.remove("selected");
        ind.children[index].classList.add("selected");
        document
            .querySelectorAll(".content-animtions")
            .forEach((x) => x.classList.remove("content-animtions"));
        f[index].classList.add("content-animtions");
        allowShift = true;
    };
    // Click events
    function getEventTarget(e) {
        e = e || window.event;
        return e.target;
    }
    ind.addEventListener("click", function(event) {
        let target = getEventTarget(event);
        let li = target.closest("li"); // get reference
        if (li == null) {
            target.preventDefault;
        } else {
            let nodes = Array.from(this.children); // get array
            let index3 = nodes.indexOf(li);
            items.classList.add("shifting");
            items.style.left = -((index3 + 1) * 100) + "%";
            index = index3;
        }
    });
    /*-------------------Key events------------------ */
    document.addEventListener("keydown", function(e) {
        switch (e.code) {
            case "KeyA":
            case "ArrowLeft":
                shiftSlide(-1);
                break;
            case "KeyD":
            case "ArrowRight":
                shiftSlide(1);
                break;
        }
    });
    /*-------------------Click events----------------- */
    prev.addEventListener("click", function() {
        shiftSlide(-1);
    });
    const nextT = () => {
        shiftSlide(1);
    };
    next.addEventListener("click", nextT);
    // Mouse events
    items.onmousedown = dragStart;
    // Touch events
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);
    // Transition events
    items.addEventListener("transitionend", checkIndex);

    setInterval(nextT, 12000);
}

slide(sliderItems, prev, next, indicatots_ol);
//===============modal
const img_full = document.getElementById("img-full");
let img01 = document.getElementById("img01");
const model = document.querySelector(".img-item");
let plus = document.querySelectorAll(".plus");
let close_class = document.querySelector(".close");
model.addEventListener("click", y);
let dir;

function y() {
    let target1 = getEventTarget();
    console.log(target1);
    const iconplus = target1.closest(".plus");

    let nodes = Array.from(plus); // get array
    let index_plus = nodes.indexOf(iconplus);
    currentSlide(index_plus);
    console.log(iconplus, index_plus);
    if (iconplus != null) {
        console.log(iconplus);
        img01.src = iconplus.offsetParent.previousElementSibling.src;
        if (index_plus == 1) {
            img01.src = "../image/portfolio-3-full.webp";
        }
        document.body.style.overflow = "hidden";
        img_full.style.display = "block";
    }
}
window.addEventListener("click", function(ef) {
    var e = getEventTarget();
    console.log(e);
    if (e == img_full || e == close_class) {
        document.body.style.overflow = "auto";
        img_full.style.display = "none";
        img01.src = "";
    }
});

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);
const plusSlides = () => {
    showSlides((slideIndex += 1));
};
const tarhSlides = () => {
    showSlides((slideIndex -= 1));
};
const currentSlide = (n) => {
    showSlides((slideIndex = n));
};

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("img-f");
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    if (slideIndex == 1) {
        img01.src = "../image/portfolio-3-full.webp";
    } else {
        img01.src = slides[slideIndex].previousElementSibling.src;
    }
}
caption.firstElementChild.addEventListener("click", tarhSlides);
caption.lastElementChild.addEventListener("click", plusSlides);

//==========================

window.onload = function() {
    crear_select();
};

function isMobileDevice() {
    return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
    );
}

var li = new Array();

function crear_select() {
    var div_cont_select = document.querySelectorAll(
        "[data-mate-select='active']"
    );

    var select_ = "";
    for (var e = 0; e < div_cont_select.length; e++) {
        div_cont_select[e].setAttribute("data-indx-select", e);
        div_cont_select[e].setAttribute("data-selec-open", "false");
        var ul_cont = document.querySelectorAll(".cont_list_select_mate > ul");

        select_ = document.querySelector("[data-indx-select='" + e + "'] >select");

        if (isMobileDevice()) {
            select_.addEventListener("change", function() {
                _select_option(select_.selectedIndex, e);
            });
        }
        var select_optiones = select_.options;
        var p_selecionado_opcion = document.querySelectorAll(
            " .selecionado_opcion "
        );
        p_selecionado_opcion[e].setAttribute("data-n-select", e);
        var span_icon_select_mate = document.querySelectorAll(".icon_select_mate");
        span_icon_select_mate[e].setAttribute("data-n-select", e);

        for (var i = 0; i < select_optiones.length; i++) {
            li[i] = document.createElement("li");
            if (
                select_optiones[i].selected == true ||
                select_.value == select_optiones[i].innerHTML
            ) {
                li[i].className = "active";
                document.querySelector(
                    "[data-indx-select='" + e + "']  > .selecionado_opcion "
                ).textContent = select_optiones[i].textContent;
            }
            li[i].setAttribute("data-index", i);

            li[i].setAttribute("data-selec-index", e);
            // funcion click al selecionar

            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[e].appendChild(li[i]);
        } // Fin For select_optiones
        ul_cont[e].addEventListener("click", function() {
            let target2 = getEventTarget();
            let target_li = target2.closest("li");
            console.log(target_li, "target_li");
            if (target_li != null) {
                _select_option(
                    target_li.getAttribute("data-index"),
                    target_li.getAttribute("data-selec-index")
                );
            }
        });
    } // fin for divs_cont_select
} // End Function

var cont_slc = 0;
const idxSpan = document.querySelectorAll(
    ".icon_select_mate,.selecionado_opcion"
);

idxSpan.forEach((x) => x.addEventListener("click", open_select)); //open select

function open_select() {
    var idx1 = this.getAttribute("data-n-select");
    var ul_cont_li = document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] .cont_select_int > li"
    );
    var hg = 0;
    var slect_open = document
        .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
        .getAttribute("data-selec-open");
    var slect_element_open = document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] select"
    )[0];
    if (isMobileDevice()) {
        if (window.document.createEvent) {
            // All
            var evt = window.document.createEvent("MouseEvents");
            evt.initMouseEvent(
                "mousedown",
                false,
                true,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            slect_element_open.dispatchEvent(evt);
        } else if (slect_element_open.fireEvent) {
            // IE
            slect_element_open.fireEvent("onmousedown");
        } else {
            slect_element_open.click();
        }
    } else {
        for (var i = 0; i < ul_cont_li.length; i++) {
            //.getBoundingClientRect().top)
            hg += ul_cont_li[i].offsetHeight;
            console.log(hg);
        }
        if (slect_open == "false") {
            document
                .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
                .setAttribute("data-selec-open", "true");
            document.querySelectorAll(
                "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
            )[0].style.height = hg + "px";
            document.querySelectorAll(
                    "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
                )[0].style.maxHeight =
                window.innerHeight -
                document
                .querySelectorAll(
                    "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
                )[0]
                .getBoundingClientRect().top +
                "px";
            document.querySelectorAll(
                "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
            )[0].style.transform = "rotate(180deg)";
        } else {
            document
                .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
                .setAttribute("data-selec-open", "false");
            document.querySelectorAll(
                "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
            )[0].style.transform = "rotate(0deg)";
            document.querySelectorAll(
                "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
            )[0].style.height = "0px";
        }
    }
} // fin function open_select

function salir_select(indx) {
    var select_ = document.querySelectorAll(
        "[data-indx-select='" + indx + "'] > select"
    )[0];
    document.querySelectorAll(
        "[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul"
    )[0].style.height = "0px";
    document.querySelector(
        "[data-indx-select='" + indx + "'] > .icon_select_mate"
    ).style.transform = "rotate(0deg)";
    document
        .querySelectorAll("[data-indx-select='" + indx + "']")[0]
        .setAttribute("data-selec-open", "false");
}

function _select_option(indx, selc) {
    if (isMobileDevice()) {
        selc = selc - 1;
    }
    var select_ = document.querySelectorAll(
        "[data-indx-select='" + selc + "'] > select"
    )[0];

    var li_s = document.querySelectorAll(
        "[data-indx-select='" + selc + "'] .cont_select_int > li"
    );
    var p_act = (document.querySelectorAll(
        "[data-indx-select='" + selc + "'] > .selecionado_opcion"
    )[0].innerHTML = li_s[indx].innerHTML);
    var select_optiones = document.querySelectorAll(
        "[data-indx-select='" + selc + "'] > select > option"
    );
    for (var i = 0; i < li_s.length; i++) {
        //console.log("i = ", i, indx, li_s, selc);
        li_s[i].classList.remove("active");
        // if (li_s[i].className == "active") {
        //     console.log(li_s[i], "activ");
        //     li_s[i].className = "";
        // }
        li_s[indx].classList.add("active");
    }
    select_optiones[indx].selected = true;
    select_.selectedIndex = indx;
    select_.onchange();
    salir_select(selc);
}
//============autocomplete