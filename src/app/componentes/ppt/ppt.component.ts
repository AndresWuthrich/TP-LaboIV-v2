import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera'

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoPiedraPapelTijera;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;

  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    console.info("numero Secreto:");//,this.nuevoJuego);  
    this.ocultarVerificar=false;
   }

  ngOnInit(): void {
  }

}
