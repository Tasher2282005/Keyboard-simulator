function toggleText(elementId, iconId) {
    var x = document.getElementById(elementId);
    var icon = document.getElementById(iconId);
    if (x.style.maxHeight && x.style.maxHeight !== "0px") {
        x.style.maxHeight = null;
        icon.innerHTML = "&#43;";
    } else {
        x.style.maxHeight = x.scrollHeight + "px";
        icon.innerHTML = "&#8722;";
    }
}
