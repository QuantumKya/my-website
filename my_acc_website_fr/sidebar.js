
function openSidebar() {
    document.getElementById("stack-menu").style.width = "350px";
}

function closeSidebar() {
    document.getElementById("stack-menu").style.width = "0";
}


let proxyIDs = ["mh1, mh2, mh3"];
let sectionIDs = ["m1", "m2", "m3"];

function toggleSection(index) {
    document.getElementById(proxyIDs[index]).classList.replace("fa-arrow-down", "fa-arrow-up");
    document.getElementById(sectionIDs[index]).style.height = (document.getElementById(sectionIDs[index]).style.height === "0px") ? "fit-content" : "0px";
}



document.documentElement.dataset.scroll = 0;
document.addEventListener('scroll', () => {
    document.documentElement.dataset.scroll = window.scrollY;
});