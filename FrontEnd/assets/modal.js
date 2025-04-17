
let modal = null

async function chargerWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const figure = await response.json();
      document.querySelector(".gallery").innerHTML = "";
      const galerieAdmin = document.querySelector(".listePhoto");
      if (galerieAdmin) { 
        galerieAdmin.innerHTML = "";
  
        listeModification(figure);
        main(figure);
      };
    }
     catch (error) {
      console.error("Erreur lors du chargement des works :", error);
    }
}


const flechebefore = document.querySelector('.flechegauche')
flechebefore.addEventListener('click', (e) => {

    e.preventDefault()
    modal = document.querySelector(".modal2")
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-hidden')
    modal.removeEventListener('click', closeModal2)
    const target = document.querySelector(".modal")
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modalBlock', "true")

    
        
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.cross').addEventListener('click', closeModal)
    modal.querySelector('.modalBlock').addEventListener('click', stopP)

    AjoutPhoto()


})

    
function AjoutPhoto() {
    
    document.querySelector('.bouttonAjoutPhoto').addEventListener('click', closeModal)
    const BoutonAjoutP = document.querySelector(".bouttonAjoutPhoto")
    BoutonAjoutP.addEventListener('click', openModal2)
}

async function listeCategories() {
    try{ 
        let response = await fetch('http://localhost:5678/api/categories')
        let data = await response.json()
        console.log (data)
        
        const listename = document.getElementById('listecategories')
        
        listename.innerHTML = ""
        data.forEach(element => {
            const option = document.createElement('option')
            option.textContent = element.name
            option.value = element.id
            listename.appendChild(option);
        });


    }

    catch (error) {
        
        console.error('Erreur:', error)

    }
}

const openModal = function (event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modalBlock', "true")

    
        
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.cross').addEventListener('click', closeModal)
    modal.querySelector('.modalBlock').addEventListener('click', stopP)

    AjoutPhoto()

}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-hidden')
    modal.removeEventListener('click', closeModal)
    
    modal.querySelector('.cross').removeEventListener('click', closeModal)
    modal.querySelector('.modalBlock').removeEventListener('click', stopP)
    modal = null
}

const openModal2 = function (event) {

    event.preventDefault()
    const target = document.querySelector(".modal2")
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.addEventListener('click', closeModal2)
    const target2 = document.querySelector(".modalBlockAjout")
    target2.setAttribute('aria-modalBlock', "true")
    modal = target2
    modal.querySelector('.cross').addEventListener('click', closeModal2)
    modal.addEventListener('click', stopP)
    listeCategories()
}

const closeModal2 = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal = document.querySelector(".modal2")
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-hidden')
    modal.removeEventListener('click', closeModal2)
    
    modal.querySelector('.cross').removeEventListener('click', closeModal2)
    modal.querySelector('.modalBlockAjout').removeEventListener('click', stopP)
    modal = null
}

const stopP = function (e) {
    e.stopPropagation()
}


document.querySelectorAll('.js-modal').forEach (a => {
    a.addEventListener ('click', openModal)
}
)


async function listeModification () {
    
    try {
        let response = await fetch('http://localhost:5678/api/works')
        let data = await response.json()
        console.log(data)
    
        const modalBlock = document.querySelector(".listePhoto");
        modalBlock.innerHTML = "";
        data.forEach(element => {
            const figure = document.createElement('figure')
            const imgApi =  document.createElement('div')
            const imgPhoto =  document.createElement('img')
            
            const overlay = document.createElement("img");
            overlay.classList.add("poubelleIcon");
            imgApi.classList.add("imgApi");
            imgPhoto.alt = element.title
            imgPhoto.src = element.imageUrl
            figure.dataset.id = element.id
            overlay.src = "./assets/icons/icons8-effacer-50.png";


            modalBlock.appendChild(figure);

            figure.appendChild(imgApi);
            imgApi.appendChild(overlay);
            imgApi.appendChild(imgPhoto);

        
            overlay.addEventListener("click", () => {
                deleteFetch(element.id, figure);
            });
        });
    

    } catch (error) {
        
        console.error('Erreur:', error)

    }

}

listeModification()




async function deleteFetch(id, figure) {

    const token = localStorage.getItem("token");
    
    if (!token) {
        console.error("Aucun token trouvé : impossible de supprimer");
        return;
      }
    console.log(token)
    
        try {
            let response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            });

            console.log(response)
    
            if (response.ok) {
                
            alert("Votre projet à bien été suprimé");
                console.log(`Work ${id} supprimé`);
                figure.remove();
                chargerWorks();
            } else {
                alert("Échec de la suppression !");
                console.error("Erreur API :", response.status);
            }
    
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur lors de la suppression");
        }
    }

    const formAjoutPhoto = document.querySelector(".formAjoutPhoto")
    
    const inputImage = document.getElementById("ajoutImage");
    
    const preview = document.getElementById("imagePreview");

    
    const ajoutimagebouton = document.querySelector(".ajoutImageStyle")
    const iconeImageAjout = document.querySelector(".iconImage")
    const boutonValider = document.querySelector(".validerPhoto")

    inputImage.addEventListener("change", () => {
        const file = inputImage.files[0];

        if (file) {

            if (file.size > 4 * 1024 * 1024) {
                alert('Too big');
                inputImage.value = '';
                return;
            }
        const reader = new FileReader();

        reader.onload = (e) => {
       preview.src = e.target.result;
       preview.style.display = "block";
       ajoutimagebouton.style.display = "none";
       iconeImageAjout.style.display = "none";
       boutonValider.classList.add("ready") ;
    };

      reader.readAsDataURL(file);
        } else {
            preview.src = "";
            preview.style.display = "none";
            }
});

    formAjoutPhoto.addEventListener('submit', async event => {
        event.preventDefault();
        
        const formDB = new FormData(formAjoutPhoto);

        formDB.set("category", parseInt(formDB.get("category")));

        const data = Object.fromEntries(formDB);
        
        const token = localStorage.getItem("token");
        
        let modalBlock= document.querySelector(".listePhoto")

        
        const tailleMax = 4 * 1024 * 1024;

        
        const file = inputImage.files[0];
        
        const msgError = document.getElementById("msgError");


        console.log(data)

        try {
            let response =  await fetch(`http://localhost:5678/api/works`, {
                method: 'POST',
                headers: {
                    
                    Authorization: `Bearer ${token}`,
    
                },
                body: formDB
    
            })
            console.log(response)

            if (file.size < tailleMax && response.ok) {
                formAjoutPhoto.reset();
                preview.src = "";
                preview.style.display = "none";
                
       ajoutimagebouton.style.display = "block";
       iconeImageAjout.style.display = "block";
       boutonValider.classList.remove("ready") ;

                chargerWorks();
                alert("Votre projet à bien été ajouté")
                
            } else {
                alert("Échec de l'ajout de l'image, verifiez la taille de votre fichier !");
            }

        }
        
        catch (error) {
           
            alert("Erreur lors de la mise en ligne d'un nouveau projet, vérifiez chaque champ saisi");
        }


    })