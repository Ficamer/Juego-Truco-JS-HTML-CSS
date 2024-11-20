const colocarCartaComputadoraConDelay = (indiceCarta,cartaComputadora) => {
    setTimeout(()=>{
        colocarCartaComputadoraEnMesa(cartaComputadora.id)
        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
        let cartaImg = cartaComputadoraEnMesa[indiceCarta].querySelector('img');
        cartaImg.src = `${cartaComputadora.src}`;
        seEncontroCarta = true;
    },1000);
}

const logicaRonda = (numeroRonda) =>{
    let cartasJugadorEnMesa = centroMesaLadoJugador.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.

    console.log("----Numero de ronda: " + numeroRonda +"----");

    //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
    let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[numeroRonda-1].id);
    console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);    

    //Recorro las cartas del mazo de la computadora
    for(let cartaComputadora of copiaMazoComputadora){

        //Si la carta del jugador es una negra
        if(esUnaNegra(cartaJugador.numero)) {

            //Si la carta de la pc es una negra
            if(esUnaNegra(cartaComputadora.numero)){
                //Es mayor que la del jugador
                if(cartaComputadora.numero > cartaJugador.numero) {
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }

            //Si la carta de la pc es un falso
            if(cartaComputadora.numero == 1){
                if(cartaComputadora.palo == "Oro" || cartaComputadora.palo == "Copas") {
                    colocarCartaComputadoraConDelay(numeroRonda-1,cartaComputadora);
                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    rondasGanadasComputadora++;
                    break;
                }
            }
        }
    }
}

//Logica computadora para tirar cartas por ronda.
            let cartasJugadorEnMesa = centroMesaLadoJugador.querySelectorAll('div'); //Me traigo todos los div dentro del centro de mesa lado jugador.

            if(numeroRonda == 1) {
                console.log(copiaMazoComputadora);
                console.log("----Numero de ronda: " + numeroRonda +"----");

                //Busco la carta del mazo del jugador que coincida con el ID de la carta que esta en la mesa
                let cartaJugador = mazoJugador.find( carta => `carta${carta.id}` == cartasJugadorEnMesa[0].id);
                console.log("Carta jugador en mesa: " + cartaJugador.numero + " " + cartaJugador.palo);

                for(let cartaComputadora of copiaMazoComputadora){
                    //Comparo el valor de la carta que esta en la mesa con las del mazo de la computadora
                    if(!seEncontroCarta){
                        
                        //Si la carta de la pc es una negra
                        if(esUnaNegra(cartaComputadora.numero)) {
                        
                                //Si la carta de la pc es una negra mayor que la del jugador
                                if(cartaComputadora.numero > cartaJugador.numero) {
                                    console.log("Carta computadora es una negrra"+cartaComputadora.numero);
                                    setTimeout(()=>{
                                        colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                        let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                        cartaImg.src = `${cartaComputadora.src}`;
                                        seEncontroCarta = true;
                                    },1000);

                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                
                                    //Gano la ronda la computadora
                                    rondasGanadasComputadora++;
                                    break;
                                }

                                //Si la carta de la pc es un falso
                                if(cartaComputadora.numero == 1){
                                    if(cartaComputadora.palo == "Oro" || cartaComputadora.palo == "Copas") {
                                        setTimeout(()=>{
                                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                            cartaImg.src = `${cartaComputadora.src}`;
                                            seEncontroCarta = true;
                                        },1000);
            
                                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        
                                        //Gano la ronda la computadora
                                        rondasGanadasComputadora++;
                                        break;
                                    }
                                }

                                //Si la carta de la pc es un 2
                                if(cartaComputadora ==2) {
                                    setTimeout(()=>{
                                        colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                        let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                        cartaImg.src = `${cartaComputadora.src}`;
                                        seEncontroCarta = true;
                                    },1000);

                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                    
                                    //Gano la ronda la computadora
                                    rondasGanadasComputadora++;
                                    break;
                                }

                                //Si la carta de la computadora es un 3
                                if(cartaComputadora.numero == 3){
                                    setTimeout(()=>{
                                        colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                        let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                        cartaImg.src = `${cartaComputadora.src}`;
                                        seEncontroCarta = true;
                                    },1000);
            
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        
                                    //Gano la ronda la computadora
                                    rondasGanadasComputadora++;
                                    break;
                                }

                                //Si la carta de la computadora es un 7 de espada o oro
                                if(cartaComputadora.palo == "Espada" || cartaComputadora.palo == "Oro"){
                                    setTimeout(()=>{
                                        colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                        let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                        cartaImg.src = `${cartaComputadora.src}`;
                                        seEncontroCarta = true;
                                    },1000);
                                
                                    console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                        
                                    //Gano la ronda la computadora
                                    rondasGanadasComputadora++;
                                        break;
                                }
                                
                                //Si la carta de la computadora es un 1
                                if(cartaComputadora.numero == 1){
                                        //Si es un ancho de espada o basto
                                        if(cartaComputadora.palo == "Espada" || cartaComputadora.palo == "Basto") {
                                            setTimeout(()=>{
                                            colocarCartaComputadoraEnMesa(cartaComputadora.id)
                                            let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                                            let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                                            cartaImg.src = `${cartaComputadora.src}`;
                                            seEncontroCarta = true;
                                        },1000);
                
                                        console.log("Carta computadora en mesa: " + cartaComputadora.numero + " " + cartaComputadora.palo);
                            
                                        //Gano la ronda la computadora
                                        rondasGanadasComputadora++;
                                        break;
                                        }
                                }
                            }
                        }
            
                        

                        }
                    }   
                
                }

                if(!seEncontroCarta) {
                    let valorMinimo = 13;
                    let cartaValorMasBajoID = 0;
                    let cartaCompu = 0;
                    for(let cartaComputadora of copiaMazoComputadora){
                        if(cartaComputadora.numero < valorMinimo){
                            valorMinimo = cartaComputadora.numero;
                            cartaValorMasBajoID = cartaComputadora.id;
                            cartaCompu = cartaComputadora;
                        } 
                    }
                        
                    setTimeout(()=>{
                        colocarCartaComputadoraEnMesa(cartaValorMasBajoID);
                        let cartaComputadoraEnMesa = centroMesaLadoComputadora.querySelectorAll('div');
                        let cartaImg = cartaComputadoraEnMesa[0].querySelector('img');
                        cartaImg.src = `${cartaCompu.src}`;
        
                    },1000);
                            
                    //Gano la ronda el jugador
                    rondasGanadasJugador++;           
               }

                seEncontroCarta = false;

                console.log("Rondas ganadas computadora: " + rondasGanadasComputadora);
                console.log("Rondas ganadas Jugador: " + rondasGanadasJugador);        
}