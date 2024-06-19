class Storage{

    static getSearchedUsersFromStorage(){
        // Tüm kullanıcıları al

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;

    }

    static addSearchedUserToStorage(){
        // Kullanıcı Ekle
        let users = this.getSearchedUsersFromStorage();

        // indexof
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));

    }

    static clearAllSearchedUsersFromStorage(username){
        // Tüm kullanıcıları sil

        localStorage.removeItem("searched");

    }




}