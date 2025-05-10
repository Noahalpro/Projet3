
function seConnecterLogIn() {
    const formulaire = document.querySelector(".boutonLogin");

    formulaire.addEventListener("click", async function(event) {
        event.preventDefault(); 
        const TentativeLogIn = {
            email: document.querySelector("[name=mail]").value,
            password: document.querySelector("[name=motDePasse]").value
        };
        
        console.log(TentativeLogIn.email + " " + TentativeLogIn.password)
    const chargeUtile = JSON.stringify(TentativeLogIn);
    
    console.log("JSON envoyé :", chargeUtile);

    
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

        
        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", TentativeLogIn.email);
            window.location.href = "index.html";
          } 
         else {
            
        const msgError = document.getElementById("msgError")
        msgError.style.display = "block";
        console.log ("Email ou mot de passe incorrect !");
        }

        
    }
    catch (error) {
    

    }

    

});

}

seConnecterLogIn()

const links = document.querySelectorAll("li a");
const currentPage = window.location.pathname;

links.forEach(link => {
  if (link.getAttribute("href") === currentPage.split("/").pop()) {
    link.classList.add("active");
  }
});