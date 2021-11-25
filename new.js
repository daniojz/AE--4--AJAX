var precioTotal = 0;
var tabla = [];
var ingrediente = false;

function validarNombre() {
    let nombre = document.getElementsByName("nombre");
    if (nombre.value.trim().match(/^[A-Z]/)) {
        return true;
    }else {
        alert('[ERROR]--El nombre debe de empezar por mayusculas...')
        return false;
    }
}

function validarEmail(email) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return regex.test(email);
}

function verificarEmail() {
    if (validarEmail(email.value)){
        return true;
    }else {
        alert('[ERROR]--Email incorrecto');
        return false;
    }
}

function tamañoPizza() {
    const radioBtn = document.getElementsByName('tamano');
    
    for (let i = 0; i < array.length; i++) {
        if (radioBtn[i].checked) {
            for (let j = 0; j <tabla.length; j++) {
                if (radioBtn[i].value == tabla[j].type) {
                    precioTotal += parseInt(tabla[j].price);
                    return true;
                }
            }
        }
    }
}

function ingredientesPizza() {
    const checkBox = document.getElementsByName('ingrediente');
    
    for (let i = 0; i < array.length; i++) {
        if (checkBox[i].checked) {
            for (let j = 0; j <tabla.length; j++) {
                if (checkBox[i].value == tabla[j].type) {
                    precioTotal += parseInt(tabla[j].price);
                    return true;
                }
            }
        }
    }
    if (ingrediente)
    return true;
}
/*AJAX-----------------------------------------------------------------------------------*/
function precioTotalAjax() {
    let xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var text = this.responseText;
                    var textJSON = JSON.parse(text);
                    for (let i = 0; i < textJSON.PIZZA.TAMAÑO.length; i++) {
                         
                        var objetoJSON = textJSON.PIZZA.TAMAÑO[i];
                        var textNode = document.createTextNode(objetoJSON.tamaño + ": " + objetoJSON.precio);
                        
                        let tamañoContainer = document.createElement("div")
                        let tamañoInput = document.createElement("input")
                        let tamañoLabel = document.createElement("label")

                        tamañoInput.id = "tamaño"
                        tamañoInput.type = "radio" //check para ingred
                        tamañoInput.name = "tamaño"

                        tamañoLabel.for = "tamaño"

                        tamañoContainer.appendChild(tamañoInput)
                        tamañoContainer.appendChild(tamañoLabel)
                        
                        tamañoLabel.appendChild(textNode);
                        tamañoInput.value = objetoJSON.tamaño;

                        document.getElementById("tamaños").appendChild(tamañoContainer);


                    }
                    for (let i = 0; i < textJSON.PIZZA.INGREDIENTE.length; i++) {
                         
                        var objetoJSON = textJSON.PIZZA.INGREDIENTE[i];
                        var textNode = document.createTextNode(objetoJSON.nombre + ": " + objetoJSON.precio);
                        
                        let tamañoContainer = document.createElement("div")
                        let tamañoInput = document.createElement("input")
                        let tamañoLabel = document.createElement("label")

                        tamañoInput.id = "tamaño"
                        tamañoInput.type = "checkbox"
                        tamañoInput.name = "tamaño"

                        tamañoLabel.for = "tamaño"

                        tamañoContainer.appendChild(tamañoInput)
                        tamañoContainer.appendChild(tamañoLabel)
                        
                        tamañoLabel.appendChild(textNode);
                        tamañoInput.value = objetoJSON.nombre;

                        document.getElementById("ingredientes").appendChild(tamañoContainer);


                    }
                    



                }
            }
        }
        xmlHttp.open('GET', 'http://127.0.0.1:5500/json.json', true)
        xmlHttp.send(null)
}

function validarTodo() {
    if (verificarEmail() && validarNombre() && tamañoPizza() && ingredientesPizza()) {
        return true;
    }else {
        alert ('[ERROR]--Faltan campos por completar');
    }
}

window.onload = function() {
    precioTotalAjax();
    formulario.onsubmit = validarTodo;
}
