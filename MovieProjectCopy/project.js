const titleEl = document.getElementById("title");
const directorEl = document.getElementById("director");
const urlEl = document.getElementById("url");
const cardBody = document.querySelectorAll(".card-body")[1];
const form = document.getElementById("form-id");
const clear = document.getElementById("clear-films");
const searchEl = document.getElementById("search");

// uı objesini olusturma
const ui = new UI();

// storage objesini olusturma
const storage = new Storage();

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getMoviesFromStorage();
        ui.showMovies(films);
    });
    cardBody.addEventListener("click",deleteMovie);
    clear.addEventListener("click",clearMovie);
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
    const title = titleEl.value;
    const director = directorEl.value;
    const url = urlEl.value;

    if(title == "" || director == "" || url == ""){
        ui.displayMessages("Tüm alanları doldurun...","danger");
    }else{
        const newFilm = new Film(title,director,url);
        ui.AddFilmToUI(newFilm);
        storage.addMoviesToStorage(newFilm);
        ui.displayMessages("Film eklendi...","success");
    }

    ui.clearText(titleEl,directorEl,urlEl);

    e.preventDefault();
}

function deleteMovie(e){
    if(e.target.id === "delete-film"){
        ui.deleteMovie(e.target);
        storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı...","success");
        e.preventDefault();
    }
}

function clearMovie(){
    if(confirm("Tümünü silmek istediginizden emin misiniz ?")){
        ui.clearAllMovies();
        storage.clearAllFilmsFromStorage();
    }
}



