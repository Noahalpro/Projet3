

async function main() {
    try {
        let response = await fetch('http://localhost:5678/api/works')
        let data = await response.json()
        //let categories = ["Tous", ...new Set(data.map(item => item.category))];
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
        button.addEventListener("click", () => displayImages(data, category));
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


