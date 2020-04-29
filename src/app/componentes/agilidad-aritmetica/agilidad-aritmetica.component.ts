import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }
  NuevoJuego() {
    this.ocultarVerificar=false;

    this.nuevoJuego.generarOperacion();
    
    this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);

  }

  verificar()
  {
    if (this.nuevoJuego.verificar()) {
      this.ocultarVerificar=false;
      clearInterval(this.repetidor);

      // this.enviarJuego.emit(this.nuevoJuego);
      // this.MostarMensaje("Sos un Genio!!!",true);
      // this.nuevoJuego.numeroSecreto=0;
    }
  }
  
  // MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
  //   this.Mensajes=mensaje;    
  //   var x = document.getElementById("snackbar");
  //   if(ganador)
  //     {
  //       x.className = "show Ganador";
  //     }else{
  //       x.className = "show Perdedor";
  //     }
  //   var modelo=this;
  //   setTimeout(function(){ 
  //     x.className = x.className.replace("show", "");
  //     modelo.ocultarVerificar=false;
  //    }, 3000);
  //   console.info("objeto",x);
  
  //  }  
}
