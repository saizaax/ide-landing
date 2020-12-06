/* Animations initialization */
AOS.init();

/* HTML Collection of Applications */
let applications = document.getElementsByClassName("apps-item");

/* HTML Collection of Filter-bar Options */
let selectableItems = document.getElementsByClassName("select-item");

/* Search Tags HTML Container Element */
let searchTagsContainer = document.getElementById("tags-container");

/* Search Input */
let searchInput = document.getElementById("search-input");

/* "Nothing-Found" Container */
let nothingFound = document.getElementById("nothing");

/* Filter Tags */
const applyFilter = function (input) {
    let isResult = false;

    for (let i = 0; i < applications.length; i++) {
        let app = applications[i];

        const appTags = app.getAttribute("data-tags").toLowerCase().split(" ");
        const appName = app.getAttribute("data-title").toLowerCase();
        const appDevs = app.getAttribute("data-dev").toLowerCase();

        let currentFilters = document.getElementsByClassName("tag-item");
        for (let j = 0; j < currentFilters.length; j++) {
            let filter = currentFilters[j].id.slice(0, -4).toLowerCase();

            if (!appTags.includes(filter)) app.style.display = "none";
            else {
                if (j < 1) app.style.display = "block";
            }
        }

        if (!currentFilters.length && appName != "none") app.style.display = "block";

        if (!appName.startsWith(input) && !appDevs.startsWith(input)) app.style.display = "none";

        if (!isResult) isResult = app.style.display == "block" ? true : false;
    }

    if (!isResult) nothingFound.style.display = "block";
    else nothingFound.style.display = "none";
};

/* Handle Filter Events function */
const handleFilter = function (context) {
    let searchTag = context.target;
    let searchTagId = searchTag.innerHTML.replace(/\s/g, "_").toLowerCase();

    if (searchTag.className == "select-item") {
        searchTagsContainer.innerHTML += `<p class="tag-item" id="${searchTagId}_tag">${searchTag.innerHTML}</p>`;
        searchTag.className += " selected animate__animated animate__bounceIn";
    } else {
        searchTag.className = "select-item";
        document.getElementById(`${searchTagId}_tag`).remove();
    }

    applyFilter(searchInput.value.toLowerCase());
};

/* Click event for Filter-bar Options */
for (let i = 0; i < selectableItems.length; i++) {
    selectableItems.item(i).onclick = handleFilter;
}

/* Handle Search Event function */
const handleSearch = function (context) {
    let inputValue = context.target.value.toLowerCase();
    applyFilter(inputValue);
};

/* Event Listener for Search-input */
searchInput.addEventListener("input", handleSearch);
