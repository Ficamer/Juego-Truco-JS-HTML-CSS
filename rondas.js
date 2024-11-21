//DIV Puntuacion
let htmlPuntosJugador = document.querySelector('.puntos-jugador');
let htmlPuntosComputadora = document.querySelector('.puntos-computadora');

//Numero de ronda y rondas ganadas por cada jugador.
let numeroRonda = 0;
let rondasGanadasJugador = 0;
let rondasGanadasComputadora = 0;
let termino = false;


//Verificar quien gano y agregado de puntos
const verificacionGanador = ()=>{
    if(rondasGanadasComputadora==2 && rondasGanadasJugador<2){
        setTimeout(()=>{
             termino=true;
                agregarPuntosRonda("computadora",seCantoTruco,true)},1500);
            setTimeout(()=>{resetear()},4000);         
    }
    if(rondasGanadasJugador==2 && rondasGanadasComputadora<2){
             setTimeout(()=>{
            termino=true;
            agregarPuntosRonda("jugador",seCantoTruco,true)},1500);
        setTimeout(()=>{resetear()},4000);
    }
    if(rondasGanadasComputadora==3 && rondasGanadasJugador==2){
        setTimeout(()=>{
            termino=true;
            agregarPuntosRonda("computadora",seCantoTruco,true)},1500);
        setTimeout(()=>{resetear()},4000);
    }
    if(rondasGanadasComputadora==2 && rondasGanadasJugador==3){
        setTimeout(()=>{
            termino=true;
            agregarPuntosRonda("jugador",seCantoTruco,true)},1500);
        setTimeout(()=>{resetear()},4000);
    }

}
//Lógica basica para que la computadora tire cartas.

const esUnaNegra = (cartaValor)=>{
	const cartasNegrasValores = [10,11,12];
	for(let cartaNegraValor of cartasNegrasValores){
        if(cartaValor == cartaNegraValor){
			return true;
		}
	}
	return false;
}

const agregarPuntosEnvido = (jugador,quizo,tipoEnvido)=>{
    if(quizo){

        if(tipoEnvido == "Envido") {
            if(jugador=="computadora"){
                htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                 <p>${puntosComputadora+2}</p>` 
            }else {
                htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                 <p>${puntosJugador+2}</p>` 
            }
        }

        if(tipoEnvido == "Real envido") {
            if(jugador=="computadora"){
                htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                 <p>${puntosComputadora+3}</p>` 
            }else {
                htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                 <p>${puntosJugador+3}</p>` 
            }
        }

        let puntosParaAgregarPC = 30 - puntosJugador;
        let puntosParaAgregarJugador = 30 - puntosComputadora;

        if(tipoEnvido == "Falta envido") {
            if(jugador=="computadora"){

                htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                 <p>${puntosParaAgregarPC}</p>` 
            }else {
                htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                 <p>${puntosParaAgregarJugador}</p>` 
            }
        }

    }else {
        htmlPuntosJugador.innerHTML = `<p>Jugador</p>
        <p>${puntosJugador+1}</p>` 
    }
}

const agregarPuntosRonda = (jugador,seCantoTruco,seAcepto)=>{
    if(seCantoTruco) {
        if(seAcepto) {
            if(jugador=="computadora"){
                puntosComputadora +=2;
                htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                    <p>${puntosComputadora}</p>` 
            }else {
                puntosJugador +=2;
                htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                    <p>${puntosJugador}</p>` 
            }
        }else {
            if(jugador=="computadora"){
                puntosComputadora +=1;
                htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                    <p>${puntosComputadora}</p>` 
            }else {
                puntosJugador +=1;
                htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                    <p>${puntosJugador}</p>` 
            } 
        }
        
    }

    if(seCantoTruco == false) {
        if(jugador=="computadora"){
            puntosComputadora++;
            htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
                <p>${puntosComputadora}</p>` 
        }else {
            puntosJugador++;
            htmlPuntosJugador.innerHTML = `<p>Jugador</p>
                <p>${puntosJugador}</p>` 
        }
    }

}

const colocarCartaComputadoraConDelay = (indiceCarta,cartaComputadora) => {
    setTimeout(()=>{
        colocarCartaComputadoraEnMesa(cartaComputadora.id)
        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
        let cartaImg = cartaComputadoraEnMesa[indiceCarta].querySelector('img');
        cartaImg.src = `${cartaComputadora.src}`;
    },1000);
}

const logicaRonda = (numeroRonda) =>{
    let cartasJugadorEnMesa = centroMesaLadoJugador.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.

    console.log("----Numero de ronda: " + numeroRonda +"----");
    //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
    let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[numeroRonda-1].id);
    console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);    

    let seEncontroCarta = false;

    //Recorro las cartas del mazo de la computadora
    for(let cartaComputadora of mazoComputadora){
        //Si la carta del jugador es una negra
        if(esUnaNegra(cartaJugador.numero)) {

            //Si la carta de la pc es una negra
            if(esUnaNegra(cartaComputadora.numero)){

                //Es mayor que la del jugador
                if(cartaComputadora.numero > cartaJugador.numero) {
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }

            //Si la carta de la pc es un falso
            if(cartaComputadora.numero == 1){
                if(cartaComputadora.palo == "Oro" || cartaComputadora.palo == "Copas") {
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }

            //Si la carta de la pc es un 2
            if(cartaComputadora.numero ==2 ) {
                seEncontroCarta = true;
                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                rondasGanadasComputadora++;
                break;
            }

            //Si la carta de la computadora es un 3
            if(cartaComputadora.numero == 3){
                seEncontroCarta = true;
                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                rondasGanadasComputadora++;
                break;
            }

            //Si la carta de la computadora es un 7 de espada o oro
            if(cartaComputadora.numero == 7){
                if(cartaComputadora.palo == "Espada" || cartaComputadora.palo == "Oro"){
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }

            //Si la carta de la computadora es un 1 de basto o espada
            if(cartaComputadora.numero == 1){
                if(cartaComputadora.palo == "Basto") {
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
                if(cartaComputadora.palo == "Espada") {
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }
        }

        //Si la carta del jugador no es una negra
        if(!esUnaNegra(cartaJugador.numero)) {

                //Si la carta del jugador es un 7 
                if(cartaJugador.numero == 7){

                    //Si la carta de la pc tambien es un 7
                    if(cartaComputadora.numero == 7){

                        //Si la carta del jugador es un 7 de oro y la de la pc un 7 de espada
                        if(cartaJugador.palo == "Oro" && cartaComputadora.palo == "Espada"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }

                        //Si la carta de la computadora es un 1
                        if(cartaComputadora.numero == 1){

                            //Si es un ancho de basto
                            if(cartaComputadora.palo == "Basto") {
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }
                            //Si es un ancho de espada 
                            if(cartaComputadora.palo == "Espada") {
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }                        
                        }
                    }
                }
            
                //Si la carta del jugador es un 3
                if(cartaJugador.numero == 3){

                    //Si la carta de la computadora es un 7 
                    if(cartaComputadora.numero == 7){   

                        //Un 7 de oro
                        if(cartaComputadora.palo == "Oro"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                        //Un 7 de espada
                        if(cartaComputadora.palo == "Espada"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                    }

                
                    //Si la carta de la computadora es un 1
                    if(cartaComputadora.numero == 1){

                        //Si es un ancho de basto
                        if(cartaComputadora.palo == "Basto") {
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                        //Si es un ancho de espada
                        if(cartaComputadora.palo == "Espada") {
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }


                    }
                }

                //Si la carta del jugador es un 2
                if(cartaJugador.numero == 2){

                    //Si la carta de la computadora es un 3
                    if(cartaComputadora.numero == 3){
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break;
                    }

                    //Si la carta de la computadora es un 7
                    if(cartaComputadora.numero == 7){   

                        //De oro
                        if(cartaComputadora.palo == "Oro"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }

                        //De espada
                        if(cartaComputadora.palo == "Espada"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                    }
                    
                    //Si la carta de la computadora es un 1

                    if(cartaComputadora.numero == 1){
                        if(cartaComputadora.palo == "Basto"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                        if(cartaComputadora.palo == "Espada"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                    }

                }

            //Si la carta del jugador es un 1 de basto
            if(cartaJugador.numero == 1) {

                //Si la carta del jugador es un 1 de basto
                if(cartaJugador.palo = "Basto"){

                    //Si la carta es un 1
                    if(cartaComputadora.numero == 1){

                        //De espada
                        if(cartaComputadora.palo == "Espada") {
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                    }

                }
            }
            //Si la carta de la computadora es un 1 falso
            if(cartaComputadora.numero == 1){

                //Si la carta del jugador es un falso
                 if(cartaJugador.palo=="Copas" || cartaJugador.palo=="Oro") {

                    //Si la carta de la computadora es un 2
                    if(cartaComputadora.numero  == 2){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                        }

                            //Si la carta de la computadora es un 3
                            if(cartaComputadora.numero ==3){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }

                            //Si la carta de la computadora es un 7 oro o espada
                            if(cartaComputadora == 7) {
                                if(cartaComputadora.palo=="Oro"){
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break;
                                }
                                if(cartaComputadora.palo=="Espada"){
                                        seEncontroCarta = true;
                                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                        rondasGanadasComputadora++;
                                        break;
                                    }
                            }

                            //Si la carta de la computadora es un 1 
                            if(cartaComputadora==1){

                                //Si es un 1 de basto
                                if(cartaComputadora.palo == "Basto") {
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break;
                                }

                                //Si es un 1 de espada
                                if(cartaComputadora.palo == "Espada") {
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break; 
                                }
                            }
                        }
            }


            //Si la carta del jugador es un 4
            if(cartaJugador.numero == 4) {

                        if(cartaComputadora.numero==5){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break; 
                        }

                        if(cartaComputadora.numero==6){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break; 
                        }
    
                        if(esUnaNegra(cartaComputadora.numero)){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                        //Si la carta de la computadora es un falso
                        if(cartaComputadora.numero == 1){
                            if(cartaComputadora.palo == "Copas" || cartaComputadora.palo == "Oro" )
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
        
                            //Si la carta de la computadora es un 2
                            if(cartaComputadora.numero == 2){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }
        
                            //Si la carta de la computadora es un 3
                            if(cartaComputadora.numero==3){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }
        
                            //Si la carta de la computadora es un 7 oro o espada
                            if(cartaComputadora.numero == 7) {
                                if(cartaComputadora.palo=="oro"){
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break;
                                }
                                if(cartaComputadora.palo=="Espada"){
                                        seEncontroCarta = true;
                                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                        rondasGanadasComputadora++;
                                        break;
                                    }
                            }
        
                            //Si la carta de la computadora es un 1 o
                            if(cartaComputadora.numero==1){
        
                                //Si es un 1 de basto
                                if(cartaComputadora.palo == "Basto") {
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                     break;
                                }
        
                                //Si es un 1 de espada
                                if(cartaComputadora.palo == "Espada") {
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break; 
                                }
                            }
            }
            //Si la carta del jugador es un 5
            if(cartaJugador.numero == 5) {

                    if(cartaComputadora.numero==6){
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break; 
                    }

                    if(esUnaNegra(cartaComputadora.numero)){
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break;
                    }
                    //Si la carta de la computadora es un falso
                    if(cartaComputadora.numero == 1){
                        if(cartaComputadora.palo == "Copas" || cartaComputadora.palo == "Oro" )
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break;
                    }
    
                        //Si la carta de la computadora es un 2
                        if(cartaComputadora.numero == 2){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
    
                        //Si la carta de la computadora es un 3
                        if(cartaComputadora.numero ==3){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
    
                        //Si la carta de la computadora es un 7 oro o espada
                        if(cartaComputadora.numero == 7) {
                            if(cartaComputadora.palo=="oro"){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }
                            if(cartaComputadora.palo=="Espada"){
                                    seEncontroCarta = true;
                                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                    rondasGanadasComputadora++;
                                    break;
                                }
                        }
    
                        //Si la carta de la computadora es un 1 o
                        if(cartaComputadora.numero ==1){
    
                            //Si es un 1 de basto
                            if(cartaComputadora.palo == "Basto") {
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                 break;
                            }
    
                            //Si es un 1 de espada
                            if(cartaComputadora.palo == "Espada") {
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break; 
                            }
                        }
                }
            //Si la carta del jugador es un 6
            if(cartaJugador.numero == 6) {

                if(esUnaNegra(cartaComputadora.numero)){
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
                //Si la carta de la computadora es un falso
                if(cartaComputadora.numero  == 1){
                    if(cartaComputadora.palo == "Copas" || cartaComputadora.palo == "Oro" )
                    seEncontroCarta = true;
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }

                    //Si la carta de la computadora es un 2
                    if(cartaComputadora.numero == 2){
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break;
                    }

                    //Si la carta de la computadora es un 3
                    if(cartaComputadora.numero ==3){
                        seEncontroCarta = true;
                        colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        rondasGanadasComputadora++;
                        break;
                    }

                    //Si la carta de la computadora es un 7 oro o espada
                    if(cartaComputadora.numero  == 7) {
                        if(cartaComputadora.palo=="oro"){
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break;
                        }
                        if(cartaComputadora.palo=="Espada"){
                                seEncontroCarta = true;
                                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                                console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                                rondasGanadasComputadora++;
                                break;
                            }
                    }

                    //Si la carta de la computadora es un 1
                    if(cartaComputadora==1){

                        //Si es un 1 de basto
                        if(cartaComputadora.palo == "Basto") {
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                             break;
                        }

                        //Si es un 1 de espada
                        if(cartaComputadora.palo == "Espada") {
                            seEncontroCarta = true;
                            colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                            console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            rondasGanadasComputadora++;
                            break; 
                        }
                    }
            }

        }
    }

    //Si las cartas son iguales
    if(!seEncontroCarta){
        for(let cartaComputadora of mazoComputadora){
            if(cartaJugador.numero === cartaComputadora.numero){
                colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                rondasGanadasComputadora++;
                rondasGanadasJugador++;
                seEncontroCarta = true;
            }
        }
    }
    //Luego de recorrer todo el for si no encontro carta, elijo la carta mas baja del mazo de la computadora

    if(!seEncontroCarta){
        let valorMinimo = 13;
        let cartaCompu = 0;
        for(let cartaComputadora of mazoComputadora){
            let cartaValorMasBajoID = 0;
            if(cartaComputadora.numero < valorMinimo){
                valorMinimo = cartaComputadora.numero;
                cartaValorMasBajoID  = cartaComputadora.id;
                cartaCompu = cartaComputadora;
            } 
        }
        colocarCartaComputadoraConDelay(numeroRonda-1,cartaCompu);
        rondasGanadasJugador++; 
    }

    console.log("Rondas ganadas jugador: " + rondasGanadasJugador);
    console.log("Rondas ganadas computadora: " + rondasGanadasComputadora);
    if(numeroRonda>=1){
        verificacionGanador();
    }

}

const ronda = (estadoRonda,tipoEnvido) => {
    switch (estadoRonda) {
        case "envido":
            envido(tipoEnvido);
            break;

        case "normal":
            logicaRonda(numeroRonda);
    }
}


const cantarTruco = ()=>{
    aceptarTrucoComputadora();
}