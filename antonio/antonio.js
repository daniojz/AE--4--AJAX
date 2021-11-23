


function enviarPeticionAsincrona (){
    let xmlHttp = new XMLHttpRequest ();

    xmlHttp.onreadystatechange= function(){
        if (this.onreadystate ==4){
            if(this.status==200){
                procesarRespuesta (this.responsetext);
            }else{
                alert("fallo en la respuesta");
            }
        }
    }

   xmlHttp.open('GET', URL_DESTINO +RECURSO, true);
   xmlHttp.send(null);
}

function procesarRespuesta(JsonDoc){
    varobjetoJson=Json.parse(JsonDoc)

    
}