//import {seConnecterLogIn} from "./script.js";
//seConnecterLogIn()
console.log("noah")
function seConnecterLogIn() {
    const formulaire = document.querySelector(".tutu");

    formulaire.addEventListener("click", function(event) {
        event.preventDefault(); 

        console.log("noah")
        const TentativeLogIn = {
            email: document.querySelector("[name=mail]").value,
            password: document.querySelector("[name=motDePasse]").value
        };
        
        console.log(TentativeLogIn.email + " " + TentativeLogIn.password)
    const chargeUtile = JSON.stringify(TentativeLogIn);
    
    console.log("JSON envoyé :", chargeUtile);
    

fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile
});

    if(TentativeLogIn.email === "sophie.bluel@test.tld" && TentativeLogIn.password === "S0phie") {
        window.location.href = "index.html";
        localStorage.setItem("token", data.token);
    }
    else {
        msgError.style.display = "block";
        console.log ("Email ou mot de passe incorrect !");
    }

    })

}

seConnecterLogIn()