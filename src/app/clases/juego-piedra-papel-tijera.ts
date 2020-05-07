import { Juego } from '../clases/juego'

export class JuegoPiedraPapelTijera extends Juego {
        
    elegidoUsuario:string;
    elegidoMaquina:string;
    numeroRandom:number;

    constructor(nombre?:string, gano?:boolean, jugador?:string){
        super("Piedra, papel o tijera", gano, jugador);

    }

    public verificar(): boolean {
        if((this.elegidoMaquina=="piedra" && this.elegidoUsuario=="papel") || (this.elegidoMaquina=="tijera" && this.elegidoUsuario=="piedra") || (this.elegidoMaquina=="papel" && this.elegidoUsuario=="tijera"))
        return true;
        else return false;
    }

    public generarMaquina():string{
        this.numeroRandom=Math.floor((Math.random()*100)+1);
        if(this.numeroRandom>66){
            return "piedra";
        }else if(this.numeroRandom>33)
        return "papel";
        else
        return "tijera";
    }
}
