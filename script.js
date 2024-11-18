//Elementos traidos del index
const manoJugadorHTML = document.querySelector('.mano-jugador');
const manoComputadoraHTML = document.querySelector('.mano-computadora');
const centroMesa = document.querySelector('.centro-mesa');
const centroMesaLadoComputadora = document.querySelector('.centro-mesa-lado-computadora');
const centroMesaLadoJugador = document.querySelector('.centro-mesa-lado-jugador');

// Mazos
let mazo = [];
let mazoComputadora = [];
let copiaMazoComputadora = [];
let mazoJugador = [];
let copiaMazoJugador = [];
let copiaMazo;

//Tantos
let tantosComputadora = 0;
let tantosJugador = 0;

//Envido, truco, etc.
let estaRealizandoDialogoEnvidoTruco = false;

//Numero de ronda y rondas ganadas por cada jugador.
let numeroRonda = 0;
let rondasGanadasJugador = 0;
let rondasGanadasComputadora = 0;

//Indices para IDs de cartas
let indiceJugador = 0;
let indiceComputadora = 3;

//Botones
const botonEnvido = document.getElementById("boton-envido");
const botonTruco = document.getElementById("boton-truco");
const botonReal = document.getElementById("boton-real");
const botonNoQuiero = document.getElementById("boton-noQuiero");

//Dialogos
const dialogoJugador = document.querySelector('.dialogo-jugador');
const dialogoComputadora = document.querySelector('.dialogo-computadora');

//Booleanos
let seCantoEnvido = false;
let cartaHabilitada = true;


//Armar mazo
const armarMazo = () => { 
    for(let i=1;i<=12;i++){
        if (i===8 || i===9){ //Si i es 8 o 9, continuar a la siguiente iteracion y no cargar esa carta
            continue;
        }
        mazo.push({palo: "Espada",numero: i,src: `img/${i}Espada.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Basto",numero: i,src: `img/${i}Basto.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Copas",numero: i,src: `img/${i}Copas.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Oro",numero: i,src: `img/${i}Oro.png`,dorso: 'img/Dorso.png'});
    }
}

//Mezclar mazo
const mezclarMazo = ()=>{
    for (var i = mazo.length - 1; i > 0; i--) { //Recorro el arreglo
        var j = Math.floor(Math.random() * (i + 1)); //Genero un entero aleatorio
        var valorMazo = mazo[i]; //Tomo un valor del arreglo con el indice i
        mazo[i] = mazo[j]; //Reemplazo el valor del arreglo el indice actual por el de uno en una posicion aleatoria
        mazo[j] = valorMazo; //Reemplazo la posicion j del arrelgo pro el valor del arreglo que guarde.
    }

    copiaMazo = mazo;
};

//Repartir cartas Jugador
const repartirCartasJugador = () => {
    let contador = 0;
    for(let i=39;i>=37;i--){ //Recorro las ultimas 3 cartas 
        contador++;
        mazoJugador.push({...copiaMazo[i],id: ""+contador});
        //Agregar logica para quitar cartas del mazo
        copiaMazoJugador = mazoJugador;
    }
}

//Repartir cartas computadora
const repartirCartasComputadora = () => {
    let contador = 3;
    for(let i=36;i>=34;i--){ 
        contador++;
        mazoComputadora.push({...copiaMazo[i],id: ""+contador});
        //Agregar logica para quitar cartas del mazo
        copiaMazoComputadora = mazoComputadora;
    }
}

//Renderizar cartas Jugador y Computadora

const renderizarCartas = ({src,dorso}, index, esComputadora = false)=>{
    const imagenSrc = esComputadora ? dorso : src;
    const id = esComputadora ? ++indiceComputadora : ++indiceJugador;
    const cartasDe = esComputadora ? "cartas-computadora" : "cartas-jugador";

    return `<div class="carta ${cartasDe}" data-name="${id}" id="carta${id}"><img src="${imagenSrc}"></img></div>`;
}

const manoJugador = ()=>{
    const manoJugador = copiaMazoJugador.map((carta,index)=>{return renderizarCartas(carta,index)}).join('');
    manoJugadorHTML.innerHTML = manoJugador;
}

const manoComputadora = ()=>{
    const manoComputadora = copiaMazoComputadora.map((carta,index)=>{return renderizarCartas(carta,index,true)}).join('');
    manoComputadoraHTML.innerHTML = manoComputadora;
}
const sonidoCartas = () =>{
    console.log(cartaHabilitada)
    if (!cartaHabilitada) {
        return; // Si las cartas no estan habilitadas, no reproducimos el sonido
    }
    let sound = new Audio('tirarCarta.mp3');
    sound.play();
}

const quitarListenersCartasEnMesa = ()=>{
    let cartasMesa = centroMesaLadoJugador.querySelectorAll('div');
    cartasMesa.forEach((carta)=>{
        carta.removeEventListener('click',sonidoCartas);
        carta.removeEventListener('click',colocarCartaJugadorEnMesa);}
    );
}

const colocarCartaJugadorEnMesa = (event) =>{

    if(!cartaHabilitada) return;

    cartaHabilitada = false;

    numeroRonda++;
    console.log(numeroRonda);

    const cartaDataName= event.currentTarget.getAttribute('data-name');


    if(!estaRealizandoDialogoEnvidoTruco) {
        copiaMazoJugador = mazoJugador.filter((carta) =>{
                //Agrega la carta en la mesa;
                if(carta.id==cartaDataName){
                    const elementoAMover = document.querySelector(`[data-name="${cartaDataName}"]`);
                    elementoAMover.style.animation = "moverse .5s";
         
                    centroMesaLadoJugador.appendChild(elementoAMover);
   
                    
                    return false; //Quita la carta que coincide con el id.
                }else {
                    return true; // Deja las cartas que no coincidan con el id
                }
            }
        );
        console.log(numeroRonda);
        console.log(mazoComputadora);
        ronda("normal");
    }
    //Quita la carta que coincide con el id de la carta seleccionada del array de la mano del jugador.


    //Vuelvo a asignar la funcionalidad a las cartas (ya que se pierde al usar appendChild y mover un elemento)

    setTimeout(()=>{quitarListenersCartasEnMesa()},250);

    // Habilitar los clics nuevamente después de 2 segundos
    setTimeout(() => {
        cartaHabilitada = true;
    }, 1500); // 2 segundos
}
// SOLUCIONAR PROBLEMA DE DATA-NAME E ID
const colocarCartaComputadoraEnMesa = (id) =>{
    console.log(id);

    if(!estaRealizandoDialogoEnvidoTruco) {
        mazoComputadora = mazoComputadora.filter((carta) =>{
        
                //Agrega la carta en la mesa;
                if(carta.id==id){
                    const elementoAMover = document.getElementById(`carta${id}`)
                    elementoAMover.style.animation = "moverseComputadora .5s";
                
                    centroMesaLadoComputadora.appendChild(elementoAMover); 

                    return false; //Quita la carta que coincide con el id.
                }else {
                    return true; // Deja las cartas que no coincidan con el id
                }
            }
        );
    }
    //Quita la carta que coincide con el id de la carta seleccionada del array de la mano del jugador.
}

const clickCartasJugador = ()=>{ 
    const cartasJugador = document.querySelectorAll('.cartas-jugador');
    cartasJugador.forEach( (carta) =>{ 
        carta.addEventListener('click', sonidoCartas);
        carta.addEventListener('click',colocarCartaJugadorEnMesa);
    });
}

const sumarTantos = (carta1,carta2)=>{
    if(carta1<10 && carta2<10) {
        return 20+carta1+carta2;
    }else if(carta1>=10 && carta2<10){
        return 20+carta2;
    }else if(carta1<10 && carta2>=10){
        return 20+carta1;
    }else {
        return 20;
    }
}

const ganadorEnvido = ()=>{
    if(tantosComputadora>tantosJugador) {
        return "computadora";
    }else if(tantosComputadora === tantosJugador) {
        return "jugador";
    }else {
        return "jugador";
    }
}

const dialogo = (quien,texto) =>{
    if(quien == "jugador") {
        dialogoJugador.style.display="flex";
        dialogoJugador.innerHTML = `<p>${texto}</p>`
        dialogoJugador.style.animation = "aparicion 1s forwards"; 

        setTimeout(()=>{ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
            dialogoJugador.innerHTML = "";
            dialogoJugador.style.display="none";
        },2000);
    }

    if(quien=="computadora"){
        dialogoComputadora.style.display="flex";
        dialogoComputadora.innerHTML = `<p>${texto}</p>`
        dialogoComputadora.style.animation = "aparicion 1s forwards"; 

        setTimeout(()=>{ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
            dialogoComputadora.innerHTML = "";
            dialogoComputadora.style.display="none";
        },2000);
    }
}

const ronda = (estadoRonda) => {

    switch (estadoRonda) {
        
        case "envido":
            if(numeroRonda == 0 || numeroRonda == 1) {
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

            console.log("Numero de ronda: " + numeroRonda);
            if(numeroRonda == 1) {

                 for(let cartaComputadora of mazoComputadora){

                    //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
                    let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[0].id);
                    console.log(cartasJugadorEnMesa[0].id);
                    console.log(cartaJugador);

                    //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
                    
                    if(cartaComputadora.numero > cartaJugador.numero) {
                        setTimeout(()=>{
                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                            console.log(cartaImg);
                            cartaImg.src = `${cartaComputadora.src}`;

                        },1000);
                        break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
                    }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                        //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                        setTimeout(()=>{
                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                            console.log(cartaImg);
                            cartaImg.src = `${cartaComputadora.src}`;

                        },1000);
                        break;
                    }
                }
            }

            if(numeroRonda == 2) {

                for(let cartaComputadora of mazoComputadora){

                   //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
                   let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[1].id);

                   //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
                   if(cartaComputadora.numero > cartaJugador.numero) {
                       setTimeout(()=>{
                           colocarCartaComputadoraEnMesa(cartaComputadora.id)
                           let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                           let cartaImg = cartaComputadoraEnMesa[1].querySelector('img');
                           console.log(cartaImg);
                           cartaImg.src = `${cartaComputadora.src}`;

                       },1000);
                       break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
                   }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                       //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                       setTimeout(()=>{
                           colocarCartaComputadoraEnMesa(cartaComputadora.id)
                           let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                           let cartaImg = cartaComputadoraEnMesa[1].querySelector('img');
                           console.log(cartaImg);
                           cartaImg.src = `${cartaComputadora.src}`;

                       },1000);
                       break;
                   }
               }
           }

           if(numeroRonda == 3) {

            for(let cartaComputadora of mazoComputadora){

               //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
               let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[2].id);

               //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
               if(cartaComputadora.numero > cartaJugador.numero) {
                   setTimeout(()=>{
                       colocarCartaComputadoraEnMesa(cartaComputadora.id)
                       let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                       let cartaImg = cartaComputadoraEnMesa[2].querySelector('img');
                       console.log(cartaImg);
                       cartaImg.src = `${cartaComputadora.src}`;

                   },1000);
                   break; //Para que solo coloque una (NO ESTARIA ELIGIENDO LA MAS EFICIENTE)
               }else { //ESTOY EVITANDO LA LOGICA DE QUE TENGA UNA CARTA QUE SEA IGUAL A LA DE LA MESA.

                   //Hago que tire la primera que tenga, aca deberia dar la logica para que tire la mas chiquita que tenga.
                   setTimeout(()=>{
                       colocarCartaComputadoraEnMesa(cartaComputadora.id)
                       let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                       let cartaImg = cartaComputadoraEnMesa[2].querySelector('img');
                       console.log(cartaImg);
                       cartaImg.src = `${cartaComputadora.src}`;

                   },1000);
                   break;
               }
           }
       }



        case "truco" :

    }
}

const comparadorDeCartas = ()=>{
    const cartasJugadorEnMesa = centroMesaLadoJugador.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.
    const cartasComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.

    if(numeroRonda == 1) {
        if(cartasJugadorEnMesa[0] > cartasComputadoraEnMesa[0]){

        }else if(cartasJugadorEnMesa[0] < cartasComputadoraEnMesa[0]) {

        }else { //Son iguales.

        }
    }

    if(numeroRonda == 2) {
        if(cartasJugadorEnMesa[1] > cartasComputadoraEnMesa[1]){

        }else if(cartasJugadorEnMesa[1] < cartasComputadoraEnMesa[1]) {

        }else { //Son iguales.

        }
    }

    if(numeroRonda == 3) {
        if(cartasJugadorEnMesa[2] > cartasComputadoraEnMesa[2]){

        }else if(cartasJugadorEnMesa[2] < cartasComputadoraEnMesa[2]) {

        }else { //Son iguales.

        }  
    }
}


const init = ()=> {
    armarMazo();
    mezclarMazo();
    repartirCartasJugador();
    repartirCartasComputadora();
    manoJugador();
    manoComputadora();
    clickCartasJugador();
}

init();


botonEnvido.addEventListener('click', () => ronda("envido"));