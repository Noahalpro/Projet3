
async function main() {
    try {
        let response = await fetch('http://localhost:5678/api/works')
        let data = await response.json()
        let categories = getLstFilter(data);
        console.log(data)
        data.forEach(element => {
            const figure = document.createElement('figure')
            const img =  document.createElement('img')
            const figcaption =  document.createElement('figcaption')
            let gallery = document.querySelector('.gallery')
            img.alt = element.title
            img.src = element.imageUrl
            figcaption.textContent = element.title
            gallery.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(figcaption);
        });
        createFiltreBouton(categories,data);
        displayImages(data, "Tous");


        
    } catch (error) {
        console.error('Erreur:', error)
    }

}


function getLstFilter(data) {
    let lstCategorie = ["Tous"];
    data.forEach(element => {
        if(!lstCategorie.includes(element.category.name)) {
            lstCategorie.push(element.category.name)
        };
    });
    return lstCategorie;
}

function createFiltreBouton (categories,data) {
    const filterContainer = document.querySelector('.filters');
    filterContainer.innerHTML = "";
    categories.forEach(category => {
        let button = document.createElement("button");
        button.textContent = category;
        
        button.addEventListener("click", () => {
            const allButtons = document.querySelectorAll(".filters .button");
            allButtons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");
            displayImages(data, category)

        
        })
        filterContainer.appendChild(button);
        button.classList.add("button");
    });

 }


 function displayImages(data, selectedCategory) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";

    
    data.forEach(item => {
        let categoryName = item.category.name
        if (selectedCategory === "Tous" || categoryName === selectedCategory) {
            let figure = document.createElement ("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            img.src = item.imageUrl;
            img.alt = item.title;
            figcaption.textContent = item.title
            figure.appendChild(img);
            figure.appendChild(figcaption);

            
            gallery.appendChild(figure);
            
            
        }
    });
}

main()


function event2(){

const boutonlog = document.getElementById("idBoutonLog")
boutonlog.addEventListener('click', () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        
    } 
    else {
    
        console.log ("il n'y a pas de token")
    }})
}

event2()

    
window.addEventListener("DOMContentLoaded", function () {
    const barreAdmin = document.querySelector(".barreAdmin");
    const token = localStorage.getItem("token");
    const boutonmodif = document.querySelector(".adminicon")

    if(token) {
    authLog = document.getElementById("authLog");
    authLog.textContent = "Logout";
    const barreFiltre = document.querySelector(".filterContainer")
    barreAdmin.style.display = "block";
    boutonmodif.style.display = "flex";
    barreFiltre.style.display = "none";
    console.log("barre admin affichée !");
    }
    else {
        console.log("Élément .barreAdmin non trouvé dans le HTML !");
    }

});

const links = document.querySelectorAll("li a");
const currentPage = window.location.pathname;

links.forEach(link => {
  if (link.getAttribute("href") === currentPage.split("/").pop()) {
    link.classList.add("active");
  }
});
