
let modal = null
console.log("noah")



const openModal = function (event) {
    event.preventDefault()
    console.log("noah")
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modalBlock', "true")
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.cross').addEventListener('click', closeModal)
    modal.querySelector('.modalBlock').addEventListener('click', stopP)
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

const stopP = function (e) {
    e.stopPropagation()
}


document.querySelectorAll('.js-modal').forEach (a => {
    a.addEventListener ('click', openModal)
    console.log("noah")
}
)


async function listeModification () {
    
    try {
        let response = await fetch('http://localhost:5678/api/works')
        let data = await response.json()
        //let categories = ["Tous", ...new Set(data.map(item => item.category))];
        console.log(data)
        data.forEach(element => {
            const figure = document.createElement('figure')
            const imgApi =  document.createElement('div')
            const imgPhoto =  document.createElement('img')
            
            const overlay = document.createElement("img");
            overlay.classList.add("poubelleIcon");
            imgApi.classList.add("imgApi");
            let modalBlock= document.querySelector(".listePhoto")
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
    
    const confirmation = confirm("Es-tu sûr de vouloir supprimer cette photo ?");

    if (!confirmation) {
        return;
    }
    const token = localStorage.getItem("token");
    
        try {
            let response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                
            alert("êtes vous sûr de supprimer");
                console.log(`Work ${id} supprimé`);
                figure.remove(); // ✅ suppression du DOM
            } else {
                alert("Échec de la suppression !");
                console.error("Erreur API :", response.status);
            }
    
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur lors de la suppression");
        }
    }

const AjoutPhoto = function AjoutPhoto() {
    const BoutonAjoutP = document.querySelector(".bouttonAjoutPhoto")
    BoutonAjoutP.addEventListener('click, OpenModal2')

}