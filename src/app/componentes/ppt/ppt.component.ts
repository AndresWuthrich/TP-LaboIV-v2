import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera'

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: JuegoPiedraPapelTijera;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;

  elegido=true;
  rutaDeFoto:string;  
  resultado:string;
  ganar: boolean;


  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    console.info("Piedra papel o tijera:");//,this.nuevoJuego);  
    this.ocultarVerificar=false;
   }

   jugar(humanoObjeto:string){
    this.nuevoJuego.elegidoMaquina=this.nuevoJuego.generarMaquina();
    this.nuevoJuego.elegidoUsuario=humanoObjeto;
    this.elegido=false;
    

    if(this.nuevoJuego.verificar()){
      this.resultado="GANASTE";
    }else if (this.nuevoJuego.elegidoUsuario==this.nuevoJuego.elegidoMaquina)
    this.resultado="EMPATASTE... ¿Lo intentarás de nuevo?";
    else
    this.resultado="PERDISTE... ¿Lo intentarás de nuevo?";
  }

  ngOnInit(): void {
  }
  
}
