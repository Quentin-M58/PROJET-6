/* met le addEventListener sur le bouton*/
function submitbtn() {
        const loginForm = document.querySelector(".form-container");
        loginForm.addEventListener("submit", recupinfo);
}

/* recupere les info */
function recupinfo(event) {
        event.preventDefault();
        const loginForm = document.querySelector(".form-container");
        let formData = new FormData(loginForm);
        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data);;
        connexion(jsonData);

}

/* se connecte */
function connexion(jsonData) {
        fetch('http://localhost:5678/api/users/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: jsonData
        })
                .then(response => {
                        if (response.status === 200) {
                                // Enregistre le token dans le local storage
                                const jsonresponse = response.json();
                                jsonresponse.then(info => {
                                        const token = info.token;
                                        localStorage.setItem('token', token);
                                        document.location.href = "index.html";
                                })
                        } else if (response.status === 404) {
                                const errormail = document.querySelector('.mailerror')
                                const empmail = document.querySelector('.email');
                                const mailinput = document.querySelector('.input-connexion.email').value
                                errormail.classList.remove('desactive');
                                errormail.classList.add('active');
                                errormail.innerHTML =
                                        'Mauvais identifiant' +
                                        '<br>' +
                                        mailinput +
                                        '&nbspn\'existe pas';
                                empmail.classList.add('error');
                        } else if (response.status === 401) {
                                const errormdp = document.querySelector('.mdperror')
                                const empmdp = document.querySelector('.password');
                                errormdp.classList.remove('desactive');
                                errormdp.classList.add('active');
                                empmdp.classList.add('error');
                        }
                })

}

/* au chargement execute submitbtn */
window.onload = () => {
        submitbtn();
}
