const apiKey = '23543251-808016ea158567da9d2c1c534';
var current_page = 1;
let objectArray = [];
var URL = '';
let selectedValue = '';
let selectedText = '';
let isSearch = 0;

function minPagination() {
    document.getElementById("currentPage").innerHTML = "";
    document.getElementById("currentPage").innerHTML = "Current Page: " + current_page;

    if (current_page == 1) {
        document.getElementById("btn_prev").disabled = true;
        document.getElementById("btn_prev").style.color = "red";
    } else {
        document.getElementById("btn_prev").disabled = false;
        document.getElementById("btn_prev").style.color = "green";
    }

}

function maxPagination(totalHits) {
    document.getElementById("currentPage").innerHTML = "";
    document.getElementById("currentPage").innerHTML = "Current Page: " + current_page;

    if (isSearch === 0){
        cument.getElementById("btn_next").disabled = true;
        document.getElementById("btn_next").style.color = "red";
    } else if (current_page > (totalHits / 10)) {
        document.getElementById("btn_next").disabled = true;
        document.getElementById("btn_next").style.color = "red";
    } else {
        document.getElementById("btn_next").disabled = false;
        document.getElementById("btn_next").style.color = "green";
    }
}

function prevPage() {
    if (isSearch === 1) {
    current_page--;
    minPagination();
    URL = getUrl() + "&page=" + current_page; 
    getPictures(URL);
    }
   
}

function nextPage() {
    if (isSearch === 1){
    current_page++;
    minPagination();
    URL = getUrl() + "&page=" + current_page; 
    getPictures(URL);
    }
}

function searchForPictures() {
    current_page = 1;
    isSearch = 1;
    setSearchParams()
    minPagination();
    URL = getUrl() + "&page=" + current_page; 
    getPictures(URL);
}

function setSearchParams() {
    selectedValue = document.getElementById("options").value;
    selectedText = document.getElementById("searchField").value;
}

function getUrl(){
    event.preventDefault();
    return URL = "https://pixabay.com/api/?key=" + apiKey + "&q=" + encodeURIComponent(selectedText) + "&colors=" + selectedValue + "&per_page=10";
}

function getPictures(URL) {
    let pictureDiv = document.getElementById('picturediv');
    pictureDiv.innerHTML = "";
    userAction(URL, pictureDiv);
}

const userAction = async (URL, pictureDiv) => {
    const response = await fetch(URL);
    const myJson = await response.json();

    if (parseInt(myJson.totalHits) > 0)
        for (i = 0; i < myJson.hits.length; i++) {
            objectArray.push(myJson.hits[i]);
            picutureElement = document.createElement('img');
            picutureElement.src = myJson.hits[i].webformatURL;
            pictureTags = document.createElement('h2');
            pictureTags.innerHTML = myJson.hits[i].tags;
            pictureTags.classList = 'pTags';
            takenBy = document.createElement('h2');
            takenBy.innerHTML = 'taken by: ' + myJson.hits[i].user;
            takenBy.classList = 'tkBy';
            superDiv = document.createElement('div');
            picassoDiv = document.createElement('div');
            pictureDiv.appendChild(superDiv);
            superDiv.appendChild(picutureElement);
            picassoDiv.appendChild(pictureTags);
            picassoDiv.appendChild(takenBy);
            superDiv.classList = 'superDiv';
            superDiv.appendChild(picassoDiv);
            picassoDiv.classList = 'picasso';
            picutureElement.classList = 'pics';
        }
    else {
        alert("Your search had 0 results");
    }
    maxPagination(myJson.totalHits);

}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("search").addEventListener("click", searchForPictures);
    document.getElementById("btn_next").addEventListener("click", nextPage);
    document.getElementById("btn_prev").addEventListener("click", prevPage);
    document.getElementById("currentPage").innerHTML = "Current Page: " + current_page;

    if (isSearch === 0 ) {
        document.getElementById("btn_next").disabled = true;
        document.getElementById("btn_next").style.color = "red";
        document.getElementById("btn_prev").disabled = true;
        document.getElementById("btn_prev").style.color = "red";
    } else if (current_page == 1) {
        document.getElementById("btn_prev").disabled = true;
        document.getElementById("btn_prev").style.color = "red";
    } else {
        document.getElementById("btn_prev").disabled = false;
        document.getElementById("btn_prev").style.color = "green";
    }
});


