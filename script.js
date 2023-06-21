let mazo =[];
let manoJugador = [];
let envidoJugador = 0;
let manoComputadora = [];
let envidoComputadora = 0;
let valorAnterior = [];
let envido = false;
let realEnvido = false;
let faltaEnvido = false;
let puntosJugador = 0;
let puntosComputadora = 0;
let ronda = 0;
let contador = 0;
let salir = true;
let salir2 = true;
//CREAR MAZO
const crearMazo = () => {
    for(let i=1;i<=12;i++){
        if (i===8 || i===9){ //Si i es 8 o 9, continuar a la siguiente iteracion y no cargar esa carta
            continue;
        }
        mazo.push({palo: "Espada",numero: i,src: `img/${i}Espada.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Basto",numero: i,src: `img/${i}Basto.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Copas",numero: i,src: `img/${i}Copas.png`,dorso: 'img/Dorso.png'});
        mazo.push({palo: "Oro",numero: i,src: `img/${i}Oro.png`,dorso: 'img/Dorso.png'});
    }
};

//MEZCLAR MAZO
const mezclarMazo = (array)=>{
    for (var i = array.length - 1; i > 0; i--) { //Recorro el arreglo
        var j = Math.floor(Math.random() * (i + 1)); //Genero un entero aleatorio
        var valorArreglo = array[i]; //Tomo un valor del arreglo con el indice i
        array[i] = array[j]; //Reemplazo el valor del arreglo el indice actual por el de uno en una posicion aleatoria
        array[j] = valorArreglo; //Reemplazo la posicion j del arrelgo pro el valor del arreglo que guarde.
    }
};

//REPARTIR CARTAS
const repartirCartas = ()=>{
    if (manoJugador.length < 3) {
        let valorDesapilar = [];
    //REPARTIR CARTAS DEL TOPE DEL MAZO
    for(let j = mazo.length-6;j<mazo.length;j++){ //Desde las 3 posiciones anteriores al tama;o del mazo
        if (j>=mazo.length-3){
            manoJugador.push(mazo[j]);  //Cargo las 3 cartas del tope
        }
        if (j>=mazo.length-6 && j<mazo.length-3) {
            manoComputadora.push(mazo[j]);
        }
        //DEBO DESAPILAR ESAS 3 CARTAS DEL MAZO
        valorDesapilar.push(j);
    }
//DESAPILAR CARTAS, QUITAR.
    for (let k = 0;k<valorDesapilar.length;k++){
        mazo.pop(valorDesapilar[k]);
    }
    console.log("Mano jugador: ")
    console.log(manoJugador);
    console.log("Mano Compu: ")
    console.log(manoComputadora);
    console.log(mazo);

    //CARGAR CARTAS AL HTML

    for(let z=0;z<3;z++){
        const carta = document.querySelector(`#carta${z}`);
        carta.innerHTML = ""; //CON ESTO BORRO TODO LO QUE SE INYECTO ANTES
        const cartaHtml = document.createElement("div");
        const imagen = document.createElement("img");
        imagen.src = manoJugador[z].src;
        imagen.style.width = "100%";
        imagen.style.height = "100%";
        cartaHtml.classList.add("cartas");
        cartaHtml.appendChild(imagen); //Inserto nodo imagen en el div de la cartaHtml
        carta.appendChild(cartaHtml); //Inserto nodo de la carta creada en el div del html
        }
    }
    //CARGAR CARTAS COMPUTADORA
    for (let x=0;x<3;x++){
            const cartaComp = document.querySelector(`#cartaC${x}`);
            cartaComp.innerHTML = ""; //CON ESTO BORRO TODO LO QUE SE INYECTO ANTES
            const cartaCompHtml = document.createElement("div");
            const imagenC = document.createElement("img");
            imagenC.src = manoComputadora[x].dorso;
            imagenC.classList.add("imagenC");
            imagenC.id =`C${x}`;
            imagenC.style.width = "100%";
            imagenC.style.height = "100%";
            cartaCompHtml.classList.add("cartasCompu");
            cartaCompHtml.appendChild(imagenC); //Inserto nodo imagen en el div de la cartaHtml
            cartaComp.appendChild(cartaCompHtml); //Inserto nodo de la carta creada en el div del html
    }
};

//CARTAS EN MESA
const colocarCartas = ()=> {
    for (let b=1;b<=3;b++){
        const limpiarMesa= document.querySelector(`#cartaJugadorN${b}`); //Limpio posiciones en las que este la carta del jugador
        limpiarMesa.innerHTML = "";
        const limpiarMesaCartasCompu = document.querySelector(`#cartaComputadora${b}`);
        limpiarMesaCartasCompu.innerHTML = "";
    }

    for (let n=0;n<3;n++) {
        let cartasEnManoJugador = document.querySelector(`#carta${n}`);
        cartasEnManoJugador.style.display="flex"; //Recupero la visibilidad de la carta al comenzar un juego nuevo.
        let cartasEnManoComputadora = document.querySelector(`#cartaC${n}`);
        cartasEnManoComputadora.style.display="flex"; //Recupero la visibilidad de la carta al comenzar un juego nuevo.
        

        cartasEnManoJugador.onclick = ()=> {
            let sound = new Audio('sonido.mp3');
            sound.play();
            ronda = 0; //RESETEO LA RONDA HASTA HACER INTELIGENCIA SEGUN LA RONDA
            contador++; //PARA IR RECORRIENDO LAS POSICIONES
            console.log(contador);
            let espacioCartaJugadorMesa = document.querySelector(`#cartaJugadorN${contador}`);
            espacioCartaJugadorMesa.innerHTML = cartasEnManoJugador.innerHTML; //COPIO LA CARTA EN LA MESA
            espacioCartaJugadorMesa.style.animation = "rotacion 1s";
            cartasEnManoJugador.style.display="none"; //Quito la visibilidad de la carta de la mano
            console.log(valorAnterior);
            //JUGANDO VS PC //CREO QUE DEBERIA HACERLO CON ARRAYS
            const espacioCartaComputadoraMesa  = document.querySelector(`#cartaComputadora${contador}`);

            for (let x=0;x<manoComputadora.length;x++){ //RECORRO LAS CARTAS DE LA COMPUTADORA

        //PRIMER RONDA
            //CARTA JUGADOR MENOR QUE ALGUNA DE LAS DE LA COMPUTADORA
                if((manoJugador[n].numero <= manoComputadora[x].numero) && (ronda==0 && x!=valorAnterior[0] && x!=valorAnterior[1])){ //COMPARO LA CARTA DEL JUGADOR QUE HIZO CLICK CON TODAS LAS DE LA COMPU
                    const id = document.querySelector(`#C${x}`); // PARA CAMBIAR EL DORSO POR LA PARTE FRONTAL
                    let cartasEnManoComputadora = document.querySelector(`#cartaC${x}`);
                    setTimeout(()=>{
                        id.src = manoComputadora[x].src;
                        cartasEnManoComputadora.style.display="none"; //Quito la visibilidad de la carta de la mano de la PC.      
                        espacioCartaComputadoraMesa.innerHTML = cartasEnManoComputadora.innerHTML;},1500); //COPIO LA CARTA EN LA MESA
                    
                    espacioCartaComputadoraMesa.style.animation = "rotacion2 1s";
                    espacioCartaComputadoraMesa.style.animationDelay = "1.5s";
                    valorAnterior.push(x);
                    ronda++; //Si se cumplio la condicion, al hacer ronda++ evito a que si otra carta la cumple, se de vuelta.
                    puntosComputadora++;
                    agregarPuntos();
                } 
                
            //CARTA JUGADOR MAYOR QUE ALGUNA DE LAS DE LA COMPUTADORA 
                if((manoJugador[n].numero > manoComputadora[x].numero) && (ronda==0 && x!=valorAnterior[0])){                     //COMPARO LA CARTA DEL JUGADOR QUE HIZO CLICK CON TODAS LAS DE LA COMPU
                    console.log("hola");
                    
                    if (manoComputadora[x].numero<=manoComputadora[0].numero && manoComputadora[x].numero<manoComputadora[1].numero && manoComputadora[x].numero<manoComputadora[2].numero) {
                        const id = document.querySelector(`#C${x}`); 
                        let cartasEnManoComputadora = document.querySelector(`#cartaC${x}`);
                        setTimeout(()=>{
                            id.src = manoComputadora[x].src;
                            cartasEnManoComputadora.style.display="none"; //Quito la visibilidad de la carta de la mano de la PC.      
                            espacioCartaComputadoraMesa.innerHTML = cartasEnManoComputadora.innerHTML;},1500); //COPIO LA CARTA EN LA MESA
                        espacioCartaComputadoraMesa.style.animation = "rotacion2 1s";
                        espacioCartaComputadoraMesa.style.animationDelay = "1.5s";
                        valorAnterior.push(x);
                        ronda++; 
                        puntosJugador++;
                        agregarPuntos();
                    }
                    if (manoComputadora[x].numero<manoComputadora[0].numero && manoComputadora[x].numero<=manoComputadora[1].numero && manoComputadora[x].numero<manoComputadora[2].numero) {
                        const id = document.querySelector(`#C${x}`); 
                        let cartasEnManoComputadora = document.querySelector(`#cartaC${x}`);
                        setTimeout(()=>{
                            id.src = manoComputadora[x].src;
                            cartasEnManoComputadora.style.display="none"; //Quito la visibilidad de la carta de la mano de la PC.      
                            espacioCartaComputadoraMesa.innerHTML = cartasEnManoComputadora.innerHTML;},1500); //COPIO LA CARTA EN LA MESA
                        
                        espacioCartaComputadoraMesa.style.animation = "rotacion2 1s";
                        espacioCartaComputadoraMesa.style.animationDelay = "1.5s"; 
                        valorAnterior.push(x);
                        ronda++; 
                        puntosJugador++;
                        agregarPuntos();
                    }
                    if (manoComputadora[x].numero<manoComputadora[0].numero && manoComputadora[x].numero<manoComputadora[1].numero && manoComputadora[x].numero<=manoComputadora[2].numero) {
                        const id = document.querySelector(`#C${x}`); 
                        let cartasEnManoComputadora = document.querySelector(`#cartaC${x}`);
                        setTimeout(()=>{
                            id.src = manoComputadora[x].src;
                            cartasEnManoComputadora.style.display="none"; //Quito la visibilidad de la carta de la mano de la PC.      
                            espacioCartaComputadoraMesa.innerHTML = cartasEnManoComputadora.innerHTML;},1500); //COPIO LA CARTA EN LA MESA
                        
                        espacioCartaComputadoraMesa.style.animation = "rotacion2 1s";
                        espacioCartaComputadoraMesa.style.animationDelay = "1.5s";
                        valorAnterior.push(x);
                        ronda++; 
                        puntosJugador++;
                        agregarPuntos();
                    }
                    if (manoComputadora[x].numero<manoComputadora[0].numero && manoComputadora[x].numero<manoComputadora[1].numero && manoComputadora[x].numero<=manoComputadora[2].numero) {
                        const id = document.querySelector(`#C${x}`); 
                        let cartasEnManoComputadora = document.querySelector(`#cartaC${x}`);
                        setTimeout(()=>{
                            id.src = manoComputadora[x].src;
                            cartasEnManoComputadora.style.display="none"; //Quito la visibilidad de la carta de la mano de la PC.      
                            espacioCartaComputadoraMesa.innerHTML = cartasEnManoComputadora.innerHTML;},1500); //COPIO LA CARTA EN LA MESA
                        
                        espacioCartaComputadoraMesa.style.animation = "rotacion2 1s";
                        espacioCartaComputadoraMesa.style.animationDelay = "1.5s";
                        valorAnterior.push(x);
                        ronda++; 
                        puntosJugador++;
                        agregarPuntos();
                    }                             
            }
        }

        
    }
}
};
const agregarPuntos = ()=>{
    const puntosPC = document.querySelector("#puntosComputadora");
    const puntosJ = document.querySelector("#puntosJugador");
    puntosPC.innerHTML = ""+puntosComputadora;
    puntosJ.innerHTML = ""+puntosJugador;
};

//INICIAR JUEGO
crearMazo();
mezclarMazo(mazo);
repartirCartas();
agregarPuntos();
colocarCartas();



//ACCIONES DE BOTONES
const clickNoQuiero = document.querySelector("#noquiero");
clickNoQuiero.onclick = () => {  
    const dialogo = document.querySelector(".texto");
    dialogo.innerHTML = "";
    dialogo.style.display="flex";
    const dialogoH1 = document.createElement("h1");
    dialogoH1.innerHTML = "No quiero...";
    dialogo.appendChild(dialogoH1);

    setTimeout(function quitarCuadroDialogo(){ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
        dialogo.innerHTML = "";
        dialogo.style.display="none";
    },2000); //2 SEGUNDOS

    mazo =[];
    manoJugador = [];
    manoComputadora = [];
    valorAnterior = [];
    contador = 0;
    ronda = 0;
    envidoComputadora = 0;
    envidoJugador = 0;

    crearMazo();
    mezclarMazo(mazo);
    repartirCartas();
    agregarPuntos();
    colocarCartas();
};

const clickEnvido= document.querySelector("#envido");
clickEnvido.onclick = () => {  
    const dialogo = document.querySelector(".texto");
    dialogo.innerHTML = "";
    dialogo.style.display="flex";
    const dialogoH1 = document.createElement("h1");
    dialogoH1.innerHTML = "Envido!!";
    dialogo.appendChild(dialogoH1);

    setTimeout(function quitarCuadroDialogo(){ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
        dialogo.innerHTML = "";
        dialogo.style.display="none";
    },2000); //2 SEGUNDOS
    envido = true;
                //SI SE CANTO ENVIDO
    if (envido) {
    //DETERMINAR TANTOS DE COMPUTADORA
    if(salir2){
    for (let u=0;u<manoComputadora.length;u++){ //Recorro las cartas 
        for (let i=0;i<manoComputadora.length;i++){ //Comparo la carta actual con las demas
            if (manoComputadora[u].palo === manoComputadora[i].palo){ //Si coincide el palo, sumarlas.
                if (manoComputadora[u].numero <=7 && manoComputadora[i].numero<=7) { //Si son menores o iguales que 7  
                    envidoComputadora = manoComputadora[u].numero + manoComputadora[u].numero + 20;
                    salir2=false;
                    continue;
                }
                if (manoComputadora[u].numero >=10 && manoComputadora[i].numero>=10) { //Si son mayores o iguales que 10
                     envidoComputadora = 20;
                     salir2=false;
                     continue;
                }
                 if (manoComputadora[u].numero >=10 && manoComputadora[i].numero<=7) { 
                    envidoComputadora = 20 + manoComputadora[i].numero;
                    salir2=false;
                    continue;
                }
                if (manoComputadora[u].numero <=7 && manoComputadora[i].numero>=10) { 
                    envidoComputadora = 20 + manoComputadora[u].numero;
                    salir2=false;
                    continue;
                }
                }
        }                      
        }
    }
    //DETERMINAR TANTOS JUGADOR
    if(salir){
     for (let f=0;f<manoJugador.length;f++){ //Recorro las cartas 
        for (let d=0;d<manoJugador.length;d++){ //Comparo la carta actual con las demas
            if (manoJugador[f].palo === manoJugador[d].palo){ //Si coincide el palo, sumarlas.
                if (manoJugador[f].numero <=7 && manoJugador[d].numero<=7) { //Si son menores o iguales que 7  
                        envidoJugador = manoJugador[f].numero + manoJugador[d].numero + 20;
                        salir=false;
                        break;
                    }
                if (manoJugador[f].numero >=10 && manoJugador[d].numero>=10) { //Si son mayores o iguales que 10
                        envidoJugador = 20;
                        salir=false;
                        break;
                    }
                 if (manoJugador[f].numero >=10 && manoJugador[d].numero<=7) { 
                        envidoJugador = 20 + manoJugador[d].numero;
                        salir=false;
                        break;
                    }
                if (manoJugador[f].numero<=7 && manoJugador[d].numero>=10) { 
                         envidoJugador = 20 + manoJugador[f].numero;
                         salir=false;
                         break;
                    }
                }
            }
                       
        } 
    }              
    };

    console.log(envidoComputadora);
    console.log(envidoJugador);

    if (envidoJugador<envidoComputadora) {
        salir=true;
        salir2=true;
        const dialogo2 = document.querySelector(".texto2");
             setTimeout(()=>{ 
                dialogo.innerHTML = "";
                dialogo.style.display="flex";
                const dialogoH2 = document.createElement("h1");
                dialogoH2.innerHTML = ""+envidoJugador;
                dialogo.appendChild(dialogoH2);
                const dialogo2 = document.querySelector(".texto2");
            },1000);

            setTimeout(()=>{ 
                dialogo2.innerHTML = "";
                dialogo2.style.display="flex";
                const dialogoH2 = document.createElement("h1");
                dialogoH2.innerHTML = ""+envidoComputadora;
                dialogo2.appendChild(dialogoH2);
            },2000);

            setTimeout(()=>{ 
                dialogo.innerHTML = "";
                dialogo.style.display="flex";
                const dialogoH3 = document.createElement("h1");
                dialogoH3.innerHTML = "Son buenas.";
                dialogo.appendChild(dialogoH3);
            },4000); 

            setTimeout(()=>{ 
                dialogo.innerHTML = "";
                dialogo.style.display="none";
                dialogo2.innerHTML = "";
                dialogo2.style.display="none";
            },5000); 
            puntosJugador+=2;
            setTimeout(()=>{ 
                agregarPuntos();
            },5500); 
    };

    if (envidoJugador>envidoComputadora) {
        salir=true;
        salir2=true;
        const dialogo = document.querySelector(".texto");
        const dialogo2 = document.querySelector(".texto2");
        setTimeout(()=>{ 
            dialogo.innerHTML = "";
            dialogo.style.display="flex";
            const dialogoH1 = document.createElement("h1");
            dialogoH1.innerHTML = ""+envidoJugador;
            dialogo.appendChild(dialogoH1);
        },2000); //2 SEGUNDOS

        setTimeout(()=>{ 
            dialogo2.innerHTML = "";
            dialogo2.style.display="flex";
            const dialogoH2 = document.createElement("h1");
            dialogoH2.innerHTML = ""+envidoComputadora;
            dialogo2.appendChild(dialogoH2);
        },3000);

        setTimeout(()=>{ 
            dialogo2.innerHTML = "";
            dialogo2.style.display="flex";
            const dialogoH5 = document.createElement("h1");
            dialogoH5.innerHTML = "Son buenas.";
            dialogo2.appendChild(dialogoH5);
        },4000);
        setTimeout(()=>{ 
            dialogo.innerHTML = "";
            dialogo.style.display="none";
            dialogo2.innerHTML = "";
            dialogo2.style.display="none";
        },6000); 
        puntosJugador+=2;
        setTimeout(()=>{ 
            agregarPuntos();
        },5500); 
    };
    
const clickRealEnvido = document.querySelector("#realEnvido");
clickRealEnvido.onclick = () => {  
    const dialogo = document.querySelector(".texto");
    dialogo.innerHTML = "";
    dialogo.style.display="flex";
    const dialogoH1 = document.createElement("h1");
    dialogoH1.innerHTML = "Real envido!!";
    dialogo.appendChild(dialogoH1);

    setTimeout(function quitarCuadroDialogo(){ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
        dialogo.innerHTML = "";
        dialogo.style.display="none";
    },2000); //2 SEGUNDOS
    };
};

const clickFaltaEnvido = document.querySelector("#faltaEnvido");
clickFaltaEnvido.onclick = () => {  
    const dialogo = document.querySelector(".texto");
    dialogo.innerHTML = "";
    dialogo.style.display="flex";
    const dialogoH1 = document.createElement("h1");
    dialogoH1.innerHTML = "Falta envido!!";
    dialogo.appendChild(dialogoH1);

    setTimeout(function quitarCuadroDialogo(){ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
        dialogo.innerHTML = "";
        dialogo.style.display="none";
    },2000); //2 SEGUNDOS
};
const clickTruco = document.querySelector("#truco");
clickTruco.onclick = () => {  
    const dialogo = document.querySelector(".texto");
    dialogo.innerHTML = "";
    dialogo.style.display="flex";
    const dialogoH1 = document.createElement("h1");
    dialogoH1.innerHTML = "Truco carajo!";
    dialogo.appendChild(dialogoH1);

    setTimeout(function quitarCuadroDialogo(){ //funcion para quitar el cuadro de dialogo segun el tiempo transcurrido
        dialogo.innerHTML = "";
        dialogo.style.display="none";
    },2000); //2 SEGUNDOS
};

//MUSICA 
const botonMusica = document.querySelector(".musica");

botonMusica.addEventListener('click',()=>{
    let sound = new Audio('sonidofondo.mp3');
    sound.loop = true;
    sound.play();
});

