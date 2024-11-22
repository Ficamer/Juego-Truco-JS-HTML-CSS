//Elementos traidos del index
const manoJugadorHTML = document.querySelector('.mano-jugador');
const manoComputadoraHTML = document.querySelector('.mano-computadora');
const centroMesa = document.querySelector('.centro-mesa');
const centroMesaLadoComputadora = document.querySelector('.centro-mesa-lado-computadora');
const centroMesaLadoJugador = document.querySelector('.centro-mesa-lado-jugador');

// Mazos
let mazo = [];
let mazoComputadora = [];
let mazoJugador = [];
let copiaMazoJugador = [];
let copiaMazo;

//ganador ronda
let ganador = "";

//Booleano para reconocer si se estan procesando los dialogos de envido, truco, etc.
let estaRealizandoDialogoEnvidoTruco = false;

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

//Booleano para permitir el click en las cartas
let permitirClickCartas = true;

//Puntos
let puntosJugador = 0;
let puntosComputadora = 0;

//Bandera para hacer visibles los botones de envido
let botonesEnvidoVisibles = false;


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

const mezclarMazo = ()=>{
    for (var i = mazo.length - 1; i > 0; i--) { //Recorro el arreglo
        var j = Math.floor(Math.random() * (i + 1)); //Genero un entero aleatorio
        var valorMazo = mazo[i]; //Tomo un valor del arreglo con el indice i
        mazo[i] = mazo[j]; //Reemplazo el valor del arreglo el indice actual por el de uno en una posicion aleatoria
        mazo[j] = valorMazo; //Reemplazo la posicion j del arrelgo pro el valor del arreglo que guarde.
    }

    copiaMazo = mazo;
};

const repartirCartasJugador = () => {
    let contador = 0;
    for(let i=39;i>=37;i--){ //Recorro las ultimas 3 cartas 
        contador++;
        mazoJugador.push({...copiaMazo[i],id: ""+contador});
        //Agregar logica para quitar cartas del mazo
        copiaMazoJugador = mazoJugador;
    }
}

const repartirCartasComputadora = () => {
    let contador = 3;
    for(let i=36;i>=34;i--){ 
        contador++;
        mazoComputadora.push({...copiaMazo[i],id: ""+contador});
    }
}

const renderizarCartas = ({src,dorso}, index, esComputadora = false)=>{
    const imagenSrc = esComputadora ? dorso : src;
    const id = esComputadora ? ++indiceComputadora : ++indiceJugador;
    const cartasDe = esComputadora ? "cartas-computadora" : "cartas-jugador";

    return `<div class="carta ${cartasDe}" data-name="${id}" id="carta${id}"><img src="${imagenSrc}"></img></div>`;
}

const manoJugador = ()=>{
    const manoJugador = mazoJugador.map((carta,index)=>{return renderizarCartas(carta,index)}).join('');
    manoJugadorHTML.innerHTML = manoJugador;
}

const manoComputadora = ()=>{
    const manoComputadora = mazoComputadora.map((carta,index)=>{return renderizarCartas(carta,index,true)}).join('');
    manoComputadoraHTML.innerHTML = manoComputadora;
}

const sonidoCartas = () =>{
    if (!permitirClickCartas) {
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

    if(!permitirClickCartas) return;

    permitirClickCartas = false;

    if(!volvioaTirar){
        numeroRonda++;     
    }

    const cartaDataName= event.currentTarget.getAttribute('data-name');


    if(!estaRealizandoDialogoEnvidoTruco && !termino) {
        copiaMazoJugador = mazoJugador.filter((carta) =>{

                //Agrega la carta en la mesa;
                if(carta.id==cartaDataName){
                    cartaJugadorEnMesa = carta;
                    const elementoAMover = document.querySelector(`[data-name="${cartaDataName}"]`);
                    elementoAMover.style.animation = "moverse .5s";
         
                    centroMesaLadoJugador.appendChild(elementoAMover);
   
                    
                    return false; //Quita la carta que coincide con el id.
                }else {
                    return true; // Deja las cartas que no coincidan con el id
                }
            }
        );

        //Verificar ganador ronda
        if(volvioaTirar){
            ganador = ganadorRonda();

            if(ganador == "jugador"){
                rondasGanadasJugador++;
                ronda("normal",""); 
                // Habilitar los clics nuevamente después de 2 segundos
                setTimeout(() => {
                     permitirClickCartas = true;
                }, 1500); // 1.5 segundos
            }else {
                rondasGanadasComputadora++;
                ronda("normal",""); 
                setTimeout(() => {
                    permitirClickCartas = true;
               }, 1500); // 1.5 segundos
            }  
        }else {
            ronda("normal","");
        }

        
    }

    //Vuelvo a asignar la funcionalidad a las cartas (ya que se pierde al usar appendChild y mover un elemento)
    setTimeout(()=>{quitarListenersCartasEnMesa()},250);
}

const colocarCartaComputadoraEnMesa = (id) =>{
    
    if(volvioaTirar){
        numeroRonda++;
    }
    
    console.log(numeroRonda);
    if(!estaRealizandoDialogoEnvidoTruco || !termino) {
     
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
        console.log("Mazo actualizado:", mazoComputadora);
    }
};

const clickCartasJugador = ()=>{ 
    const cartasJugador = document.querySelectorAll('.cartas-jugador');
    cartasJugador.forEach( (carta) =>{ 
        carta.addEventListener('click', sonidoCartas);
        carta.addEventListener('click',colocarCartaJugadorEnMesa);
    });
}

const dialogo = (quien,texto) =>{
    if(quien == "jugador") {
        dialogoJugador.style.display="flex";
        dialogoJugador.innerHTML = `<p>${texto}</p>`
        dialogoJugador.style.animation = "aparicion .5s forwards"; 

        setTimeout(()=>{ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
            dialogoJugador.innerHTML = "";
            dialogoJugador.style.display="none";
        },2000);
    }

    if(quien=="computadora"){
        dialogoComputadora.style.display="flex";
        dialogoComputadora.innerHTML = `<p>${texto}</p>`
        dialogoComputadora.style.animation = "aparicion .5s forwards"; 

        setTimeout(()=>{ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
            dialogoComputadora.innerHTML = "";
            dialogoComputadora.style.display="none";
        },2000);
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

const resetear = ()=> {
    centroMesaLadoComputadora.innerHTML = "";
    centroMesaLadoJugador.innerHTML = "";
    manoJugadorHTML.innerHTML = "";
    manoComputadoraHTML.innerHTML = "";
    numeroRonda = 0;
    rondasGanadasJugador = 0;
    rondasGanadasComputadora = 0;
    termino = false;
    mazoComputadora = [];
    mazoJugador = [];
    indiceJugador = 0;
    indiceComputadora = 3;
    seCantoEnvido = false;
    seCantoTruco = false;
    permitirClickCartas = true;
    mezclarMazo();
    repartirCartasJugador();
    repartirCartasComputadora();
    manoJugador();
    manoComputadora();
    clickCartasJugador();
}

init();

//Logica boton envido
let contenedorBotonEnvido = document.querySelector('.contenedor-boton-envido');
let contenedorBotonRealFalta = document.querySelector('.botones-real-falta');

botonEnvido.addEventListener('click', () =>{

    if(botonesEnvidoVisibles===false){

        //Creo el boton real, appendchild no acepta backticks para crear html
        const botonReal = document.createElement("button");
        botonReal.textContent =  "Real envido";
        botonReal.id = "boton-real";

        const botonFalta = document.createElement("button");
        botonFalta.textContent =  "Falta envido";
        botonFalta.id = "boton-falta";

        contenedorBotonRealFalta.appendChild(botonReal);
        contenedorBotonRealFalta.appendChild(botonFalta);
        
        contenedorBotonRealFalta.style.display = "flex";
        
        const cambiarEstilosBotones = contenedorBotonEnvido.querySelectorAll('button');
        cambiarEstilosBotones.forEach((boton)=> {boton.classList.add('boton-envido-activo')});
        botonEnvido.classList.remove('boton-envido-activo');
   
        botonesEnvidoVisibles = true;

        botonReal.addEventListener('click',()=>{
            ronda("envido", "Real envido");
            //Quito los otros botones.
            contenedorBotonRealFalta.removeChild(document.getElementById('boton-falta'));
            contenedorBotonRealFalta.removeChild(document.getElementById('boton-real'));
            contenedorBotonRealFalta.style.display = "none";
            botonEnvido.classList.remove('boton-envido-activo');
            botonesEnvidoVisibles = false;
        });
        
        botonFalta.addEventListener('click',()=>{
            ronda("envido", "Falta envido");
            //Quito los otros botones.
            contenedorBotonRealFalta.removeChild(document.getElementById('boton-falta'));
            contenedorBotonRealFalta.removeChild(document.getElementById('boton-real'));
            contenedorBotonRealFalta.style.display = "none";
            botonEnvido.classList.remove('boton-envido-activo');
            botonesEnvidoVisibles = false;
        });
        
    }else { //Si ya se agregaron los botones;
        ronda("envido", "Envido");

        //Quito los otros botones.
        contenedorBotonRealFalta.removeChild(document.getElementById('boton-falta'));
        contenedorBotonRealFalta.removeChild(document.getElementById('boton-real'));
        contenedorBotonRealFalta.style.display = "none";
        botonEnvido.classList.remove('boton-envido-activo');
        botonesEnvidoVisibles = false;
    }
});


botonTruco.addEventListener('click',()=>{
    cantarTruco();
})

botonNoQuiero.addEventListener('click',()=>{

    dialogo("jugador", "No quiero..");
    puntosComputadora +=1;
    htmlPuntosComputadora.innerHTML = `<p>Computadora</p>
        <p>${puntosComputadora}</p>` 
    resetear();
})