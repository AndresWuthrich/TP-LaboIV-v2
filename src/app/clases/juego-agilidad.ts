import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {
    public numeroIngresado:number;
    numeroIngresado2:number;
    operador:string;
    respuestaJugador:number;
    respuesta:number;
    gano:boolean;    

    constructor(nombre?: string, gano?: boolean, jugador?: string){
      super("Agilidad Matematica", gano, jugador);
       this.respuestaJugador=0;
    }
    public verificar()
    {
      if (this.respuesta == this.respuestaJugador) {
        this.gano = true;
      }
      if (this.gano) {
        return true;
      } 
      else {
        return false;
      }
    }
  
    public generarOperacion() {
        let operadores = ['+','-','*','/'];
        this.operador = operadores[this.aleatorio(0,3)];
  
        this.numeroIngresado = this.aleatorio(0,10);
        if(this.operador === '/')
        {
          this.numeroIngresado2 = this.aleatorio(1,this.numeroIngresado);
        } 
        else if(this.operador === '*')
        {
          this.numeroIngresado2 = this.aleatorio(0,this.numeroIngresado);
        }
        else{
            this.numeroIngresado2 = this.aleatorio(0,10);
        }
        this.respuesta = eval(this.numeroIngresado + this.operador + this.numeroIngresado2);
        this.gano = false;
    }
  
    private aleatorio(a,b){
        return Math.round(Math.random()*(b-a)+a);
    }
}
