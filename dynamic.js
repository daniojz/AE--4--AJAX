window.onload=function(){
    cargarDatos();

    document.getElementById("formulario").onsubmit = precio
    document.getElementById("refrescar").onclick = recargar
}

function cargarDatos(){

    let xmlHttp= new XMLHttpRequest();

    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status==200){
                mostrarDatos(this.responseText);
            }else{
                alert ("ERROR")
            }
        }
    }
    xmlHttp.open('GET', "http://127.0.0.1:5500/AE--4--AJAX/data.json", true)
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


function crearElementoInput(type, id, name){ //funcion para crear los elementos que contendran input y label para los ingredientes y tamaños.

    let container=document.createElement("div")
    let label=document.createElement("label")
    let input=document.createElement("input")

    input.type = type
    input.id = id
    input.name = name

    label.setAttribute("for", id)

    container.classList.add("m-1", "col-md-8")
    label.classList.add("ml-2")

    container.appendChild(input)
    container.appendChild(label)

    return container
}

function precio(){
    let precio = 0;
    let radioTamano = document.getElementsByName("tamano")
    console.log(radioTamano)
    radioTamano.forEach(element => {
        if(element.checked){
            precio += parseFloat(element.getAttribute("precio"))
            //seleccionar el tamaño y sumar;
        }
    });
    let checkIngredientes = document.getElementsByName("ingrediente")
    checkIngredientes.forEach(element => {
        if(element.checked){
            precio += parseFloat(element.getAttribute("precio"))
                //seleccionar el ingrediente y sumar;
        }
    })    
    alert("Precio total: " + precio)
    return precio
}

function recargar(){

    console.log("hey")

    document.getElementById("ingredientes").innerHTML = ""
    document.getElementById("tamaños").innerHTML = ""

    //Se cargan de nuevo los datos
    cargarDatos()
}
