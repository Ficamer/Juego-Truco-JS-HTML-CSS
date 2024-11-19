//Lógica basica para que la computadora tire cartas.

const ronda = (estadoRonda) => {

    switch (estadoRonda) {
        
        case "envido":
            if(numeroRonda == 0) {
                if(!seCantoEnvido){
                    seCantoEnvido = true;
                    estaRealizandoDialogoEnvidoTruco = true;
                    dialogo("jugador","Envidoo!")
                    //Calculo tantos de jugador
                    let hayCartasDelMismoPaloJugador = false;
                    
                    for (let indice=0; indice<mazoJugador.length;indice++) { //Recorro todas las cartas
                        for(let i = 0;i<mazoJugador.length;i++){
                            if(indice === i) {
                                continue;
                            }
                            if(mazoJugador[indice].palo === mazoJugador[i].palo) {        
                                hayCartasDelMismoPaloJugador = true;
                                tantosJugador = sumarTantos(mazoJugador[indice].numero,mazoJugador[i].numero);
                                break;
                            }
                        }
                    }
                    
                    console.log("Tantos Jugador: " + tantosJugador);
                    //Si no encontro coincidencias dejo el valor del tanto mas alto
                    if(hayCartasDelMismoPaloJugador === false){
                        let primerValor = mazoJugador[0].numero;
                        for(let k=1;k<mazoJugador.length;k++) {
                            if(primerValor < mazoJugador[k].numero ){
                                primerValor = mazoJugador[k].numero;
                            }
                        }
                        tantosJugador = primerValor;   
                    }
    
                
                    //Calculo tantos de  computadora
                    let hayCartasDelMismoPaloComputadora = false;
    
                    for (let indice=0; indice<mazoComputadora.length;indice++) { //Recorro todas las cartas
                        for(let i = 0;i<mazoComputadora.length;i++){
                            if(indice === i) {
                                continue;
                            }
                            if(mazoComputadora[indice].palo === mazoComputadora[i].palo) {     
                                hayCartasDelMismoPaloComputadora = true;   
                                tantosComputadora = sumarTantos(mazoComputadora[indice].numero,mazoComputadora[i].numero);
                                break;
                            }
                        }
                    }  
                    
                    console.log("Tantos computadora: " + tantosComputadora);
                    //Si no encontro coincidencias dejo el valor del tanto mas alto
                    if(hayCartasDelMismoPaloComputadora === false){
                        let primerValor = mazoComputadora[0].numero;
                        for(let k=1;k<mazoComputadora.length;k++) {
                            if(primerValor < mazoComputadora[k].numero ){
                                primerValor = mazoComputadora[k].numero;
                            }
                        }
                        tantosComputadora = primerValor;   
                    }
    
                    //Logica básica para aceptar o no envido
    
                    if(tantosComputadora >= 27){

                        let tantosComputadoraActual = tantosComputadora;
                        let tantosJugadorActual = tantosJugador;

                        setTimeout(()=>{dialogo("computadora","Quieroo!" + " " + tantosComputadoraActual)},1500);
                        let ganador = ganadorEnvido();
        
                        if (ganador==="computadora") {
                            
                            setTimeout(()=>{dialogo("jugador","Son buenas.")},3000);
                            setTimeout(()=>{
                                dialogo("computadora","Jaja! Que facil.")
                                estaRealizandoDialogoEnvidoTruco = false;
                            },4000);

                            //reset de tantos
                            tantosJugador = 0;
                            tantosComputadora = 0;
                            console.log("Ganador computadora")
                        }
                        if (ganador === "jugador"){
                            setTimeout(()=>{dialogo("jugador","" + tantosJugadorActual)},3000);
                            setTimeout(()=>{ 
                                dialogo("computadora","Son buenas.")
                                estaRealizandoDialogoEnvidoTruco = false;
                            },3500);
                            console.log("Ganador Jugador")

                            //FALTA LOGICA AGREGAR LOS PUNTOS ANTES DE RESETEAR

                            //reset de tantos
                            tantosJugador = 0;
                            tantosComputadora = 0;
                        }

                        }else {
                            setTimeout(()=>{
                                dialogo("computadora","No quiero.")
                                console.log("Agregar un punto a Jugador por tanto no querido")
                                estaRealizandoDialogoEnvidoTruco = false;
                            },2000);   
                        }
                        break;
                }else {
                    break;
                }
            }else {
                break;
            }

        case "normal":

            //HAY QUE COLOCAR EL COMPARADOR EN CADA RONDAAAAAAAAAAAAAA
            
            //Logica computadora para tirar cartas por ronda.
            let cartasJugadorEnMesa = centroMesaLadoJugador.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.

            if(numeroRonda == 1) {
                console.log("Numero de ronda: " + numeroRonda);
                 for(let cartaComputadora of mazoComputadora){

                    //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
                    let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[0].id);
                    console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);

                    //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
                    
                    if(cartaComputadora.numero > cartaJugador.numero) {
                        setTimeout(()=>{
                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                            cartaImg.src = `${cartaComputadora.src}`;

                        },1000);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
                    }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                        //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                        setTimeout(()=>{
                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                            cartaImg.src = `${cartaComputadora.src}`;

                        },1000);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        break;
                    }
                }
            }

            if(numeroRonda == 2) {
                console.log("Numero de ronda: 2");
               
                for(let cartaComputadora of mazoComputadora){
                    
                   //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
                   let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[1].id);
                   console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);

                   //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
                   if(cartaComputadora.numero > cartaJugador.numero) {
                       setTimeout(()=>{
                           colocarCartaComputadoraEnMesa(cartaComputadora.id)
                           let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                           let cartaImg = cartaComputadoraEnMesa[1].querySelector('img');
                           cartaImg.src = `${cartaComputadora.src}`;

                       },1000);
                       console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                       break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
                   }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                       //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                       setTimeout(()=>{
                           colocarCartaComputadoraEnMesa(cartaComputadora.id)
                           let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                           let cartaImg = cartaComputadoraEnMesa[1].querySelector('img');
                           cartaImg.src = `${cartaComputadora.src}`;

                       },1000);
                       console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                       break;
                   }
               }
           }

           if(numeroRonda == 3) {
            console.log("Numero de ronda: 3");
            for(let cartaComputadora of mazoComputadora){

               //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
               let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[2].id);
               console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);

               //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
               if(cartaComputadora.numero > cartaJugador.numero) {
                   setTimeout(()=>{
                       colocarCartaComputadoraEnMesa(cartaComputadora.id)
                       let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                       let cartaImg = cartaComputadoraEnMesa[2].querySelector('img');
                       cartaImg.src = `${cartaComputadora.src}`;

                   },1000);
                   console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                   break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
               }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                   //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                   setTimeout(()=>{
                       colocarCartaComputadoraEnMesa(cartaComputadora.id)
                       let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                       let cartaImg = cartaComputadoraEnMesa[2].querySelector('img');
                       cartaImg.src = `${cartaComputadora.src}`;

                   },1000);
                   console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                   break;
               }
           }
       }

        case "truco" :

    }
}