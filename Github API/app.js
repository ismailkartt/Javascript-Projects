const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched)
}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz");
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı bulunamadı");
            }else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user); 
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInput(); // input temizleme
    e.preventDefault();
}

function clearAllSearched(){
    // Tüm aramaları temizle
    if(confirm("Emin misiniz?")){
        // Silme işlemlerimizi gerçekleştireceğiz
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan temizleme
        ui.clearAllSearchedFromUI();
    }


}

function getAllSearched(){
    // Arananları Storagedan al ve UI ekle
    let users = Storage.addSearchedUserToStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    })
    lastUsers.innerHTML = result;
}   


