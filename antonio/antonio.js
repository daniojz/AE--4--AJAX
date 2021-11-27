window.onload=function(){
        enviarAsincrona();
}

function enviarAsincrona (){
    let xmlHttp= new XMLHttpRequest();

    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status==200){
                procesarRespuesta(this.responseText);
            }else{
                alert ("ERROR")
            }
        }
    }
xmlHttp.open('GET', "http://127.0.0.1:5500/antonio/Json2.json", true)
xmlHttp.send(null);


}



function procesarRespuesta(json){

    var objetoJson= JSON.parse(json);
    var tamanos = objetoJson.PIZZA.TAMANO;
    var ingredientes= objetoJson.PIZZA.INGREDIENTE;

    console.log (tamanos)
     
    // TAMAÑO + PRECIO //
    
    
      for (let index = 0; index < tamanos.length ; index++) {
        let l=document.createElement("label")
        let i=document.createElement("input")
                i.setAttribute ("type", "radio")
                i.setAttribute ("id", tamanos[index].tamano+index)
                i.setAttribute ("name", "tamanos")
        let texto= document.createTextNode(tamanos[index].tamano + " : " + tamanos[index].precio)
                l.appendChild(texto)
                
                document.getElementById("Tamaños").appendChild(i)
                document.getElementById("Tamaños").appendChild(l)
          
      }
              // INGREDIENTES + PRECIO//
    

      for (let index = 0; index < ingredientes.length ; index++) {
        let l=document.createElement("label")
        let i=document.createElement("input")
                i.setAttribute ("type", "checkbox")
                i.setAttribute ("id", ingredientes[index].ingredientes+index)
                i.setAttribute ("name", "ingredientes")
        let texto= document.createTextNode(ingredientes[index].nombre + " : " + ingredientes[index].precio)
                l.appendChild(texto)
                
                document.getElementById("Ingredientes").appendChild(i)
                document.getElementById("Ingredientes").appendChild(l)
          
      }

    



    

}
