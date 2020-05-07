import { Juego } from '../clases/juego'

export class JuegoAnagrama extends Juego{
    
    palabraSorteada:string;
    palabraIngresada:string;
    
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Anagrama",gano,jugador);

    }

    public verificar(): boolean {        
        if(this.palabraIngresada==this.palabraSorteada)
            return true;
        else    
            return false;
    }
}