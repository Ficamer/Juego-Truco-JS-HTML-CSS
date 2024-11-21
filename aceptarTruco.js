//Booleano de si se canto truco
let seCantoTruco = false;

const aceptarTrucoComputadora = () =>{

    if(!seCantoTruco && !termino){
        seCantoTruco = true;
        estaRealizandoDialogoEnvidoTruco = true;
        dialogo("jugador","Trucoo!")
    
        if(rondasGanadasComputadora == 1) {
            setTimeout(()=>{
                dialogo("computadora","Quiero carajo!")
                estaRealizandoDialogoEnvidoTruco = false;
            },1500);
        }else {
            if(Math.random() < 0.50) { //Prob del 50% de que quiera si no gano una ronda
                setTimeout(()=>{
                    dialogo("computadora","Quiero carajo!")
                    estaRealizandoDialogoEnvidoTruco = false;
                },1500);
            }else {
                setTimeout(()=>{
                    dialogo("computadora","No quiero :(")
                    estaRealizandoDialogoEnvidoTruco = false;
                },1500);
                setTimeout(()=>{agregarPuntosRonda("jugador",seCantoTruco,false)},2500);
                setTimeout(()=>{resetear()},3500);     
            }
        }
    }
}
