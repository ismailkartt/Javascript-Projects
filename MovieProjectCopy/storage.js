function Storage(){

}

Storage.prototype.addMoviesToStorage = function(newFilm){
    let films = this.getMoviesFromStorage();
    films.push(newFilm);
    localStorage.setItem("films",JSON.stringify(films));
}

Storage.prototype.getMoviesFromStorage = function(){
    let films;
    if(localStorage.getItem("films") === null){
        films = [];
    }else{
        films = JSON.parse(localStorage.getItem("films"));
    }
    return films;
}

Storage.prototype.deleteMovieFromStorage = function(filmTitle){
    




}

