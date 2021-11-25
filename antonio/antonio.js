

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
}
xmlHttp.open('GET', URL_DESTINO, true)
xmlHttp.send(null);

function procesarRespuesta(){

    var objetoJson= Json.parse(Json2);

     // TAMAÑO + PRECIO //

    let f= document.createElement("form")
            f.setAttribute ("class", "pizza")
    let t= document.createElement("title")
             t.setAttribute ("class", "titulo")
    let d= document.createElement("div")
            d.setAttribute("class", "Tamaños")
    let i=document.createElement("input")
            i.setAttribute ("type", "radio")
            i.setAttribute ("id", "pequeña")
            i.setAttribute ("name", "pequeña")
            i.setAttribute ("precio", "5€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)

            d.appendChild(i)

            f.appendChild(d)
            f.appendChild(t)
    
      
    let i=document.createElement("input")
            i.setAttribute ("type", "radio")
            i.setAttribute ("id", "mediana")
            i.setAttribute ("name", "mediana")
            i.setAttribute ("precio", "9€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)

            d.appendChild(i)

            f.appendChild(d)
            f.appendChild(t)    
            
            
            
            let i=document.createElement("input")
            i.setAttribute ("type", "radio")
            i.setAttribute ("id", "grande")
            i.setAttribute ("name", "grande")
            i.setAttribute ("precio", "11€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)

            d.appendChild(i)

            f.appendChild(d)
            f.appendChild(t)  


            // INGREDIENTES + PRECIO//

    let d= document.createElement("div")
            d.setAttribute("class", "Ingredientes")
    let i=document.createElement("input")
            i.setAttribute ("type", "checkbox")
            i.setAttribute ("id", "pepperoni")
            i.setAttribute ("name", "pepperoni")
            i.setAttribute ("precio", "4€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)

            d.appendChild(i)

            f.appendChild(d)
            f.appendChild(t)


    let d= document.createElement("div")
            d.setAttribute("class", "Ingredientes")
    let i=document.createElement("input")
            i.setAttribute ("type", "checkbox")
            i.setAttribute ("id", "bacon")
            i.setAttribute ("name", "bacon")
            i.setAttribute ("precio", "4€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)

            d.appendChild(i)

            f.appendChild(d)
            f.appendChild(t)

    let d= document.createElement("div")
            d.setAttribute("class", "Ingredientes")
    let i=document.createElement("input")
            i.setAttribute ("type", "checkbox")
            i.setAttribute ("id", "piña")
            i.setAttribute ("name", "piña")
            i.setAttribute ("precio", "4€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)
            d.appendChild(i)
            f.appendChild(d)
            f.appendChild(t)


    let d= document.createElement("div")
            d.setAttribute("class", "Ingredientes")
    let i=document.createElement("input")
            i.setAttribute ("type", "checkbox")
            i.setAttribute ("id", "seisquesos")
            i.setAttribute ("name", "seisquesos")
            i.setAttribute ("precio", "4€")
    let texto = document.createTextNode(objetoJson.tamaño)
            i.appendChild(texto)
            d.appendChild(i)
            f.appendChild(d)
            f.appendChild(t)


    

}
