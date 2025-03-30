//import {seConnecterLogIn} from "./script.js";
//seConnecterLogIn()
console.log("noah1")
function seConnecterLogIn() {
    const formulaire = document.querySelector(".boutonLogin");

    formulaire.addEventListener("click", async function(event) {
        event.preventDefault(); 
        console.log("noah")
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", TentativeLogIn.email);

        
        if(localStorage.getItem("userEmail") === "sophie.bluel@test.tld" && TentativeLogIn.password === "S0phie") {
        window.location.href = "index.html";
        
        } else {
            
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