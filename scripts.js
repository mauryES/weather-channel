// declaro las vvariables que voy a utilizar:
let buttonEnviar = document.querySelector("button");
let input = document.querySelector("input")
let ciudad = input.value;
let temperatura = document.getElementById("temperatura");
let icon = document.querySelector("img");
let iconoTiempo
icon.src = "https://openweathermap.org/img/wn/01d@2x.png"

//Creo la funcion que va a ejecutarse cuando se busque una ciudad en el input:
function cargarCiudad() {
    //si no no se escribe nada en el input no se muestra el container:
    if (input.value == "") {
        ocultarContainer()
    } else {
        document.querySelector(".container").style.visibility = "visible";
    }
    //Consumimos la Api y usamos los elementos del json para concatenar segun necesitemos:
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es",  function (data) {
            document.getElementById("ciudad").textContent = data.name;
            temperatura.textContent = Math.round(data.main.temp);
            document.getElementById("grados").innerHTML = "<sup>°C</sup>";
            document.getElementById("wicon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            document.getElementById("descripcion").textContent = data.weather[0].description
            console.log(data)
            input.value = ""
        })
        // utilizamos el .fail() para reconocer el error en este caso el 404:
        .fail(function (jqxhr, textStatus, error) {
            if (jqxhr.status == 404) {
                ocultarContainer()
                alert('La ciudad ingresada no existe. Por favor, ingresa una ciudad válida.');
                alert("Ingresar una ciudad valida");
                input.value = ""

            } else {
                ocultarContainer()
                console.error('Error de solicitud:', error);
                alert('Se produjo un error al obtener los datos de la ciudad.');
                alert("Ingresar una ciudad valida");
                document.querySelector(".container").style.visibility = "hidden";
                input.value = ""
            }
        });
}

//Agregamos el evento al boton para ejecutar con click el cargarCiudad():
buttonEnviar.addEventListener("click", cargarCiudad);

// una funcion para ocultar el container de ser necesario
function ocultarContainer() {
    document.querySelector(".container").style.visibility = "hidden";
}

//Le damos la opcion al usuario de inicior la funcion cargarCiudad() usando la key ENTER:
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        cargarCiudad();
    }
});