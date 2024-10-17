//effectue les fonction au chargement de la pages
window.onload = () => {
        addallhtml();
        fetchcategories();
        fetchWork();
        userConnected();
}

//ajoute les div filtre et gallery dans le portfolio
function addallhtml() {
        //contient l'emplacement ou vont etre placer les elements
        const portfolio = document.querySelector("#portfolio");
        //creer une div
        const filterContainer = document.createElement('div');
        //creer une div
        const GalleryContainer = document.createElement('div');
        //ajoute la classe filtres à la div filterContainer
        filterContainer.classList.add('filtres');
        //ajoute la classe gallery à la div GalleryContainer
        GalleryContainer.classList.add('gallery');
        //ajoute filterContainer comme enfant de portfolio
        portfolio.appendChild(filterContainer);
        //ajoute GalleryContainer comme enfant de portfolio
        portfolio.appendChild(GalleryContainer);
}

//recupere la liste des categories 
function fetchcategories() {
        //recupere les donnes de l'api dans la partie categories
        fetch("http://localhost:5678/api/categories")
                //renvoie les donnees
                .then(catresponse => {
                        //si il y a des donnees recupere le json et executes la fontion
                        //sinon retourne le message d'erreur
                        if (catresponse.ok) {
                                catresponse.json().then(categories => {
                                        processcat(categories);
                                })
                        } else {
                                throw new Error('Réponse du serveur non valide');
                        };
                })

};
//recupere les travaux 
function fetchWork() {
        //recupere les donnes de l'api dans la travaux
        fetch("http://localhost:5678/api/works")
                //renvoie les donnees
                .then(Workresponse => {
                        //si il y a des donnees recupere le json et executes les fontions
                        //sinon retourne le message d'erreur
                        if (Workresponse.ok) {
                                Workresponse.json().then(works => {
                                        processwork(works);
                                })
                        } else {
                                throw new Error('Réponse du serveur non valide');
                        };
                })

};

//traite les données categories
function processcat(info) {
        //ajoute à l'emplacement 0 les info pour le bouton tous
        info.splice(0, 0, { id: 0, name: 'Tous' });
        //pour toute les entrees du tableau
        info.forEach(work => {
                displaycat(work);
                modalcat(work);
        })
        addclick();
}
//affiche les categories
function displaycat(info) {
        //selection la classe filtres
        const filtres = document.querySelector(".filtres");
        //creer un element div
        const itemfiltre = document.createElement('div');
        //ajoute toutes les classes à l'element
        itemfiltre.classList.add(`filtres`, `filtres-btn`, `btn${info.id}`);
        //ajoute toutes les id à l'element
        itemfiltre.id = `btn${info.id}`;
        //ajoute tous le text à l'element
        itemfiltre.textContent = info.name;
        //ajoute itemfiltre comme enfant de filtres
        filtres.appendChild(itemfiltre);
        //le bouton choisi par defaut
        const defaultbtn = document.querySelector("#btn0");
        //ajoute la classe a defaultbtn
        defaultbtn.classList.add(`flitre-actif`);
}

//ajoute les action au clique
//info contien la liste des categories
function addclick() {
        //selectionne la classe
        const filterclic = document.querySelector(".filtres");
        //definit les actions à executer au clique
        filterclic.addEventListener('click', (e) => {
                //le nom du bouton cliqué 
                const targetId = e.target.id;
                //si ce n'est pas vide fait
                if (targetId !== '') {
                        //le numero de l'id du clique 
                        const categoryId = parseInt(targetId.substring(3));
                        //selectionne la classes bascule la classe filtres actif
                        document.querySelectorAll('.filtres-btn').forEach(btn => {
                                btn.classList.toggle('flitre-actif', btn === e.target);
                        });
                        //selectionne la classe item
                        const items = document.querySelectorAll('.item');
                        //pour chaque item bascule la classe
                        items.forEach(item => {
                                const itemCategory = item.classList.value.search('cat-id');
                                const itemCategoryId = item.classList.value.substring(itemCategory);
                                const itemCategoryInt = parseInt(itemCategoryId.replace('cat-id', ''));
                                item.classList.toggle('flitre-none', categoryId !== 0 && itemCategoryInt !== categoryId);
                        });
                }
        });
}
//affiche les categories
//info contien la liste des categories
function modalcat(info) {
        const empoption = document.querySelector('#image-category');
        const option = document.createElement('option');
        if (info.id != 0) {
                option.setAttribute("value", info.id);
                option.innerText = info.name;
                empoption.appendChild(option);
        }
}
//traite toute les images
function processwork(info) {
        info.forEach(work => {
                displaywork(work);
                gallery(work);
        });
}

//affiche les images
//image contien la liste des images
function displaywork(info) {
        //Empgallery selectionne la classe gallery
        const Empgallery = document.querySelector(".gallery");
        const item = document.createElement('figure');
        item.classList.add('item', `item${info.id}`, `cat-id${info.categoryId}`);
        const image = document.createElement('img');
        image.src = info.imageUrl;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = info.title;
        item.appendChild(image);
        item.appendChild(figcaption);
        Empgallery.appendChild(item);
}

//affiche les images dans la gallery modal
//image contien la liste des images
function gallery(info) {
        const modalgallery = document.querySelector(".modal-gallery");
        const item = document.createElement('figure');
        item.classList.add('divGallery');
        item.classList.add(`item${info.id}`);
        const image = document.createElement('img');
        image.src = info.imageUrl;
        item.appendChild(image);
        const iconTrash = document.createElement("icon");
        iconTrash.classList.add('fa-solid', 'fa-trash-can', 'trashicon');
        let iconid = parseInt(info.id);
        iconTrash.setAttribute("id", `${iconid}`);
        item.appendChild(iconTrash);
        modalgallery.appendChild(item);
        trash(item);
}

//bouton poubelle
function trash(info) {
        const trashbtn = info.querySelector('.trashicon');
        trashbtn.addEventListener("click", (event) => {
                confirm(event.target.id);
        });
}

//pour tester si connecter
//image contien la liste des images
function userConnected() {
        const myToken = localStorage.getItem('token');
        if (myToken === localStorage.token) {
                displayeditionmode();
                nonefiltre();
                btnaddphoto();
                btnclose();
                clickclose();
                arrowreturn();
                logout();
                btnaddimage();
                imgmodal();
                checkbtn();
        }
}



//pour afficher edition mode
//à coté de mes projet 
//dans le bandeau du haut
function displayeditionmode() {
        const project = document.querySelector('.Projet');
        const modifier = document.createElement('div');
        modifier.classList.add('container-modifier');
        const imodifier = document.createElement('i');
        imodifier.classList.add('fa-regular');
        imodifier.classList.add('fa-pen-to-square');
        const pmodifier = document.createElement('p');
        pmodifier.classList.add('modify');
        pmodifier.textContent = "modifier";
        project.appendChild(modifier);
        modifier.appendChild(imodifier);
        modifier.appendChild(pmodifier);
        modifier.addEventListener("click", (e) => { togglemodal("\.modal-container") })
        const headband = document.querySelector('.headBand');
        headband.classList.toggle('active');
        headband.classList.toggle('desactive');
        const headbandbtn = document.querySelector('.editionMode')
        headbandbtn.addEventListener("click", (e) => { togglemodal("\.modal-container") })
}
//enleve filtre
function nonefiltre() {
        const empfiltre = document.querySelector('.filtres');
        empfiltre.classList.toggle('desactive');
}
//modifie le mot login en logout
function logout() {
        const logout = document.querySelector('#login');
        logout.innerText = "logout";
        logout.addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("token");
                location.reload();
        })
}

//affiche confirm modal
function confirm(info) {
        let iddel = info
        togglemodal("\.modalimg");
        togglemodal("\.modalconfirm");
        const delfigure = document.querySelector(`.item${info}`);
        const delimage = delfigure.querySelector('img').cloneNode([false]);
        const empdel = document.querySelector('.confirm-gallery');
        empdel.replaceChildren(delimage);
        const btnok = document.querySelector('.btnok');
        btnok.addEventListener("click", (eventok) => {
                oksupr(iddel);
        }, { once: true });
        const btnnon = document.querySelector('.btnnon');
        btnnon.addEventListener("click", (eventnon) => {
                iddel = null;
                closeconfirm();
        }, { once: true });
}
//pour bouton ok supprimer
function oksupr(info) {
        if (info != null) {
                closeconfirm();
                supr(info);
        }
}


//ferme confirm modal
function closeconfirm() {
        const modalconf = document.querySelector(".modalconfirm");
        const modalad = document.querySelector(".modalimg");
        modalconf.classList.remove('active');
        modalconf.classList.add('desactive');
        modalad.classList.add('active');
        modalad.classList.remove('desactive');
}


// delete image fetch 
function supr(info) {
        const workId = info;
        const token = localStorage.token;
        fetch(
                `http://localhost:5678/api/works/${workId}`, {
                method: "DELETE",
                headers: {
                        accept: "*/*",
                        Authorization: `Bearer ${token}`,
                },
        }).then(response => {
                if (response.ok) {
                        const dataId = document.querySelectorAll(`.item${workId}`);
                        dataId.forEach(del => { del.remove(); })
                } else {
                        throw new Error("Requête échouée");
                }
        })
}



//pour bouton ajouter image modal gallery
//affiche la modal add 
function btnaddphoto() {
        const btnadd = document.querySelector('.btn-modal');
        btnadd.addEventListener('click', (e) => {
                togglemodal("\.modalimg");
                togglemodal("\.modaladd");
                const fileAlert = document.querySelector(".errorMessage");
                fileAlert.innerText = "";
        });
}
//met le bouton close 
function btnclose() {
        const btnclose = document.querySelector('.close-icon');
        btnclose.addEventListener('click', (e) => {
                close();
        });
}
//close fenetre modal
function close() {
        const addmodal = document.querySelector('.modaladd');
        const confmodal = document.querySelector('.modalconfirm ');
        if (confmodal.classList.contains('active')) {
                togglemodal("\.modalimg");
                togglemodal("\.modalconfirm");
        } else if (addmodal.classList.contains('active')) {
                togglemodal("\.modalimg");
                togglemodal("\.modaladd");
                resetform();
        }
        togglemodal("\.modal-container");
}
//detecte clique en dehors
function clickclose() {
        // pour tester clique en dehors
        const modalTriggers = document.querySelectorAll(".overlay");
        modalTriggers.forEach
                (trigger => trigger.addEventListener("click", (e) => {
                        close();
                }))
}
//clique sur fleche retour
function arrowreturn() {
        const arrow = document.querySelector(".arrow-add");
        arrow.addEventListener('click', (e) => {
                togglemodal("\.modalimg");
                togglemodal("\.modaladd");
        });
}


//toggle la fenetre modal
//emp emplacement de la fenetre
function togglemodal(emp) {
        const modal = document.querySelector(`${emp}`);
        modal.classList.toggle('active');
        modal.classList.toggle('desactive');
}


//change image dans modal add
function imgmodal() {
        const image_input = document.querySelector(".addImage-btn");
        image_input.addEventListener("change", function () {
                validationFile();
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                        uploaded_image = reader.result;
                        document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
                        document.querySelector(".display-image").style.display = "flex";
                });
                reader.readAsDataURL(image_input.files[0]);
        })
}


// Test si la taille et le format du fichier sont correct    
function validationFile() {
        const imageData = document.querySelector(".addImage-btn");
        const fileAlert = document.querySelector(".errorMessage");
        const newImage = imageData.files[0];
        const allowedExtensions = /(\.jpg|\.png)$/i;
        if (newImage.size > 4e+6) {
                fileAlert.innerText = `Le fichier ${newImage.name} est trop volumineux ! \n ${newImage.size / 1000000} mo sur 4 mo maximum`;
                imageData.value = "";
        } else if (!allowedExtensions.exec(imageData.value)) {
                fileAlert.innerText = `Le fichier ${newImage.name} n'est pas au bon format ! \n seul les format jpg et png sont accepter `;
                imageData.value = "";
        } else {
                fileAlert.innerText = "";
                return false;
        }
}

// boutton ajout photo
function btnaddimage() {
        const submitmodaladd = document.querySelector(".form-add-image")
        submitmodaladd.addEventListener("submit", (e) => {
                e.preventDefault();
                ajoutimg();
        })
}

//pour ajouter les images avec fetch et aussi dans les gallerys
function ajoutimg() {
        const imageData = document.querySelector("#btn-image");
        const titleData = document.querySelector("#title-added-image").value;
        const CatData = document.querySelector("#image-category").value;
        const newDataCat = parseInt(CatData);
        const fileimage = imageData.files[0];


        const formData = new FormData();
        formData.append("image", fileimage);
        formData.append("title", titleData);
        formData.append("category", newDataCat);
        fetchadd(formData);
        close();
        resetform();
}

//fetch ajout image
function fetchadd(info) {
        const token = localStorage.token;
        fetch('http://localhost:5678/api/works', {
                method: "POST",
                headers: {
                        Authorization: `Bearer ${token}`,
                },
                body: info,
        }).then(dataform => {
                dataform.json().then(data => {
                        const newdata = [data];
                        processwork(newdata);
                })
        })
}

//verifie si le formulaire ajout photo est rempli
function checkbtn() {
        const formImage = document.querySelector('.form-add-image');
        formImage.addEventListener("change", checkInput);
}

//transforme le btn pour formulaire ajout image
function checkInput() {
        const imageData = document.querySelector(".addImage-btn");
        const titleData = document.querySelector(".inputText");
        const inputSelect = document.querySelector("#image-category");
        if (imageData.value && titleData.value && inputSelect.value !== "") {
                document.querySelector(".add-image-button").style.backgroundColor = "#1D6154";
        } else {
                document.querySelector('.add-image-button').style.backgroundColor = "#A7A7A7";
        }
}


//reset le formulaire ajout photo
function resetform() {
        const form = document.querySelector(".form-add-image");
        form.reset();
        document.querySelector(".display-image").removeAttribute("style");
        document.querySelector(".add-image-button").removeAttribute("style");
}


