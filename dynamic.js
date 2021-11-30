window.onload=function(){
    cargarDatos();

    document.getElementById("formulario").onsubmit = procesarPedido
    document.getElementById("refrescar").onclick = recargar
}

function cargarDatos(){

    let xmlHttp= new XMLHttpRequest();

    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status==200){ //si el codigo de respuesta http es OK
                mostrarDatos(this.responseText);
            }else{
                alert ("ERROR")
            }
        }
    }
    xmlHttp.open('GET', "http://127.0.0.1:5500/AE--4--AJAX/data.json", true) //se habre la petición ajax
    xmlHttp.send(null);

}

function mostrarDatos(jsonText){

    var json= JSON.parse(jsonText);
    var tamanos = json.PIZZA.TAMANOS;
    var ingredientes= json.PIZZA.INGREDIENTES;

    // TAMAÑO + PRECIO //
    for (let index = 0; index < tamanos.length ; index++) {

        let elementoTamaño = crearElementoInput("radio", tamanos[index].tamaño + index, "tamano")
        let texto = document.createTextNode(tamanos[index].tamaño + ": " + tamanos[index].precio)

        elementoTamaño.childNodes[0].value = tamanos[index].tamaño;
        let atr = document.createAttribute("precio");
        atr.value = tamanos[index].precio;
        elementoTamaño.childNodes[0].setAttributeNode(atr);
        elementoTamaño.childNodes[1].appendChild(texto)

        document.getElementById("tamaños").appendChild(elementoTamaño);
    }

    // INGREDIENTES + PRECIO//
    for (let index = 0; index < ingredientes.length ; index++) {
        
        let elementoIngrediente = crearElementoInput("checkbox", ingredientes[index].nombre + index, "ingrediente")
        let texto = document.createTextNode(ingredientes[index].nombre + ": " + ingredientes[index].precio)

        elementoIngrediente.childNodes[0].value = ingredientes[index].nombre;
        let atr = document.createAttribute("precio");
        atr.value = ingredientes[index].precio;
        elementoIngrediente.childNodes[0].setAttributeNode(atr);
        elementoIngrediente.childNodes[1].appendChild(texto);

        document.getElementById("ingredientes").appendChild(elementoIngrediente);
    }

}


function procesarPedido(){
    let request = new XMLHttpRequest();
    var precioTotal = 0;

    request.onload = function () {

        let json = JSON.parse(this.responseText)
        let tamaños = json.PIZZA.TAMANOS
        let ingredientes = json.PIZZA.INGREDIENTES

        let selectedObject;

        document.getElementsByName("tamano").forEach(tamaño => {
            if (tamaño.checked){
                tamaños.forEach(element => { //se recorre con un foreach los tamaños del json
                    if (element.tamaño == tamaño.value) {
                        precioTotal = precioTotal + parseFloat(element.precio)
                    }
                })       
            }
        })

        document.getElementsByName("ingrediente").forEach(ingrediente => {
            if (ingrediente.checked){
                selectedObject = ingredientes.find(element => element.nombre == ingrediente.value); //forma acortada con funcion find, en vez de recorrer con un bucle todos los ingredientes
                precioTotal = precioTotal + parseFloat(selectedObject.precio)
            }
        })

        alert("PRECIO TOTAL: " + precioTotal);
    }

    request.open('GET', "http://127.0.0.1:5500/Tareas/AE-2.-AJAX/data.json", true)
    request.send(null)

}


// function precio(){ //sin traer datos de AJAX
//     let precio = 0;
//     let radioTamano = document.getElementsByName("tamano")
//     radioTamano.forEach(element => {
//         if(element.checked){
//             precio += parseFloat(element.getAttribute("precio"))
//             //seleccionar el tamaño y sumar;
//         }
//     });
//     let checkIngredientes = document.getElementsByName("ingrediente")
//     checkIngredientes.forEach(element => {
//         if(element.checked){
//             precio += parseFloat(element.getAttribute("precio"))
//                 //seleccionar el ingrediente y sumar;
//         }
//     })    
//     alert("Precio total: " + precio)
//     return precio
// }


function crearElementoInput(type, id, name){ //funcion para crear los elementos que contendran input y label para los ingredientes y tamaños.

    let container=document.createElement("div")
    let label=document.createElement("label")
    let input=document.createElement("input")

    input.type = type
    input.id = id
    input.name = name

    label.setAttribute("for", id)

    container.classList.add("m-1", "col-md-8") //se añaden clases bootstrap para el estilo
    label.classList.add("ml-2")

    container.appendChild(input)
    container.appendChild(label)

    return container //retornamos el div listo con el input y el label
}

function recargar(){ //funcion recargar los datos trayendolos del servidor

    document.getElementById("ingredientes").innerHTML = "" //vaciamos los datos anteriores
    document.getElementById("tamaños").innerHTML = ""

    //Se cargan de nuevo los datos
    cargarDatos()
}
