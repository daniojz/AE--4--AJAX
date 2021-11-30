$(document).ready(function(){
    cargarDatos();

    $("#refrescar").click(recargar);
    $("#pedir").click(precio);

})

function cargarDatos(){

    let xmlHttp= new XMLHttpRequest();

    $.ajax({
        'type'  : 'GET', 
        'url'   : "http://127.0.0.1:5500/AE--4--AJAX/data.json",
        'async' : true,
    }
    ).done(mostrarDatos)
    .fail()

}



function mostrarDatos(jsonText){

    var json= jsonText;
    var tamanos = json.PIZZA.TAMANOS;
    var ingredientes= json.PIZZA.INGREDIENTES;

    // TAMAÑO + PRECIO //
    for (let index = 0; index < tamanos.length ; index++) {

        let elementoTamaño = crearElementoInput("radio", tamanos[index].tamaño + index, "tamano")

        elementoTamaño.children("input").value = tamanos[index].tamaño;
        elementoTamaño.children("input").attr("precio", tamanos[index].precio);
        elementoTamaño.children("label").text(tamanos[index].tamaño + ": " + tamanos[index].precio)

        $("#tamaños").append(elementoTamaño);
    }

    // INGREDIENTES + PRECIO//
    for (let index = 0; index < ingredientes.length ; index++) {

        let elementoIngrediente = crearElementoInput("checkbox", ingredientes[index].nombre + index, "ingrediente")

        elementoIngrediente.children("input").value = ingredientes[index].nombre;
        elementoIngrediente.children("input").attr("precio", ingredientes[index].precio);
        elementoIngrediente.children("label").text(ingredientes[index].nombre + ": " + ingredientes[index].precio)

        $("#ingredientes").append(elementoIngrediente);
    }

}


function crearElementoInput(type, id, name){

    // let container=document.createElement("div")
    // let label=document.createElement("label")
    // let input=document.createElement("input")

    let container=$("<div>")
    let label=$("<label>")
    let input=$("<input>")
    

    input.attr("type", type) 
    input.attr("id", id) 
    input.attr("name", name) 

    label.attr("for", id)

    container.addClass("m-1 col-md-8")
    label.addClass("ml-2")

    container.append(input)
    container.append(label)

    return container
}



function precio(){
    let precio = 0;
    let radioTamano = $("[name='tamano']");
    let checkIngredientes =  $("[name='ingrediente']");

    for (let i = 0; i < radioTamano.length; i++) {
        if(radioTamano[i].checked){
            precio += parseFloat(radioTamano[i].getAttribute("precio"))
            //seleccionar el tamaño y sumar;
        }
    }

    for (let i = 0; i < checkIngredientes.length; i++) {
        if(checkIngredientes[i].checked){
            precio += parseFloat(checkIngredientes[i].getAttribute("precio"))
                //seleccionar el ingrediente y sumar;
        }
    }

    alert("Precio total: " + precio)
    return precio
}

function recargar(){
    
    $("#ingredientes").empty()
    $("#tamaños").empty()

    //Se cargan de nuevo los datos
    cargarDatos()
}