const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
const searchEl = document.getElementById("search");

// UI Objesini Üret
const ui = new UI();

// Storage Objesi Üret
const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
    searchEl.addEventListener("keyup",searchForMovie);
}

function searchForMovie(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll("#films tr");

    listItems.forEach(function(listItem) {
        const title = listItem.children[1].textContent.toLowerCase(); // Film ismi
        if (title.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.style.display = "none";
        } else {
            listItem.style.display = "table-row";
        }
    });
}


function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //Hata
        ui.displayMessages("Tüm alanları doldurun...","danger")
    }else{
        //Yeni Film
        const newFilm = new Film(title,director,url);
        ui.addFilmToUI(newFilm); // Arayüze film ekleme
        storage.addFilmToStorage(newFilm); // Storage 'a film ekleme
        ui.displayMessages("Film başarıyla eklendi...","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı...","success");
        e.preventDefault();
    }
}

function clearAllFilms(){
        if(confirm("Emin misiniz?")){
            ui.clearAllFilmsFromUI();
            storage.clearAllFilmsFromStorage();
        }
    }


