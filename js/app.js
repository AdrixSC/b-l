//función para el boton que tiene el evento
let sendDonation = (event) => {
    let inputDonation = document.getElementById("donation").value;
    validateAmount(inputDonation)
};

//traer elemento para darle un evento
let btnInput = document.getElementById("btn-Input").addEventListener("click", sendDonation);

//función para validar input
let validateAmount = (inputDonation) => {
    //console.log(inputDonation);
    if (inputDonation >= 5) {
        alert("Gracias por tu donación");
        return true
    } else {
        alert("El monto debe ser mayor a $5");
        return false
    }
};