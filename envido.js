//Booleano de si se canto envido
let seCantoEnvido = false;

// Booleanos de si hay cartas del mismo palo en el mazo de jugador/computadora
let hayCartasDelMismoPaloJugador = false;
let hayCartasDelMismoPaloComputadora = false;

const envido = (tipoEnvido) =>{
    if(numeroRonda == 0) {
        if(!seCantoEnvido){
            seCantoEnvido = true;
            estaRealizandoDialogoEnvidoTruco = true;
            dialogo("jugador",`${tipoEnvido}!!`)


            //-----Calcular tantos de jugador-----
            obtenerTantos("jugador");
            
            //Si no encontro coincidencias dejo el valor del tanto mas alto
            obtenerValorMasAlto("jugador");
            
            console.log("Tantos Jugador: " + tantosJugador);
        
            //-----Calcular tantos de  computadora---------
            obtenerTantos("computadora")
            
            //Si no encontro coincidencias dejo el valor del tanto mas alto
            obtenerValorMasAlto("computadora");
            
            console.log("Tantos computadora: " + tantosComputadora);


            //-------Logica básica  de computadora para aceptar o no envido--------------
            aceptarEnvidoLogicaComputadora();
        }
    }
}

const obtenerTantos = (jugador)=>{

    if(jugador == "jugador") {
        for (let indice=0; indice<mazoJugador.length;indice++) { 
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
    }

    if(jugador == "computadora"){
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
    } 
}

const obtenerValorMasAlto = (jugador)=>{
    
    if(jugador=="jugador"){
        if(hayCartasDelMismoPaloJugador === false){
            let primerValor = 0;
            for(let k=0;k<mazoJugador.length;k++) {
                if(!esUnaNegra(mazoJugador[k].numero)){
                    if(primerValor < mazoJugador[k].numero ){
                        primerValor = mazoJugador[k].numero;
                    }
                }
            }
            tantosJugador = primerValor;   
        }  
    }

    if(jugador=="computadora"){
        if(hayCartasDelMismoPaloComputadora === false){
            let primerValor = 0;
            for(let k=0;k<mazoComputadora.length;k++) {
                if(!esUnaNegra(mazoComputadora[k].numero)){
                    if(primerValor < mazoComputadora[k].numero ){
                        primerValor = mazoComputadora[k].numero;
                    }
                }
            }
            tantosComputadora = primerValor;   
        }
    }
}

const aceptarEnvidoLogicaComputadora = () =>{

    if(tantosComputadora >= 27 || Math.random() < .22) {  //22% DE QUE ACEPTE
    
        let tantosComputadoraActual = tantosComputadora;
        let tantosJugadorActual = tantosJugador;

        setTimeout(()=>{dialogo("computadora","Quieroo!" + " " + tantosComputadoraActual)},1500);
        let ganador = ganadorEnvido();

        if (ganador==="computadora") {
            setTimeout(()=>{dialogo("jugador","Son buenas.")},3000);
            setTimeout(()=>{
                dialogo("computadora","Jaja! Que facil.")
                estaRealizandoDialogoEnvidoTruco = false;
                agregarPuntosEnvido(ganador,true,tipoEnvido);
            },4000);

            //reset de tantos
            resetearTantos();
            console.log("Ganador computadora")
        }

        if (ganador === "jugador"){
            setTimeout(()=>{dialogo("jugador","" + tantosJugadorActual)},3000);
            setTimeout(()=>{ 
                dialogo("computadora","Son buenas.")
                estaRealizandoDialogoEnvidoTruco = false;
                agregarPuntosEnvido(ganador,true,tipoEnvido);
            },3500);
            console.log("Ganador Jugador")

            //reset de tantos
            resetearTantos();
        }else {
            setTimeout(()=>{
                let ganador = ganadorEnvido();
                dialogo("computadora","No quiero.")
                console.log("Agregar un punto a Jugador por tanto no querido")
                estaRealizandoDialogoEnvidoTruco = false;
                agregarPuntosEnvido(ganador,false,tipoEnvido);
            },2000);     
        }
    }
}

const resetearTantos = ()=>{
    tantosJugador = 0;
    tantosComputadora = 0;
}
