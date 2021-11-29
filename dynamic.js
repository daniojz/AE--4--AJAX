window.onload=function(){
    cargarDatos();
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

    console.log(json.PIZZA.TAMANOS)
    
    // TAMAÑO + PRECIO //
    for (let index = 0; index < tamanos.length ; index++) {

        let elementoTamaño = crearElementoInput("radio", tamanos[index].tamaño + index, "tamano")
        let texto = document.createTextNode(tamanos[index].tamaño + ": " + tamanos[index].precio)

        elementoTamaño.childNodes[0].value = tamanos[index].tamaño;
        elementoTamaño.childNodes[1].appendChild(texto)

        document.getElementById("tamaños").appendChild(elementoTamaño);
    }

    // INGREDIENTES + PRECIO//
    for (let index = 0; index < ingredientes.length ; index++) {
        
        let elementoIngrediente = crearElementoInput("checkbox", ingredientes[index].nombre + index, "ingrediente")
        let texto = document.createTextNode(ingredientes[index].nombre + ": " + ingredientes[index].precio)

        elementoIngrediente.childNodes[0].value = ingredientes[index].nombre;
        elementoIngrediente.childNodes[1].appendChild(texto)

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
