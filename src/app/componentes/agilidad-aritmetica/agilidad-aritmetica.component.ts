import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { LocalStorageService } from '../../servicios/localStorage.service';
import { Jugador } from '../../clases/jugador';

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
  servicio: LocalStorageService;
  jugadorLogueado: Jugador;
  perdio: boolean;
  ganador: boolean;
  
  ngOnInit() {
  }
  
  constructor() {
    this.ocultarVerificar=true;
    this.Tiempo=7; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  

    this.servicio = new LocalStorageService();
    this.jugadorLogueado=this.servicio.traerLogeado();  
  }
  
  NuevoJuego() {
    this.ocultarVerificar=false;
    this.ganador= false;

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
      this.ocultarVerificar=true;
      this.ganador= true;
      clearInterval(this.repetidor);

      this.perdio=!(this.nuevoJuego.verificar());
  
      if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado !== null))
      {
        this.nuevoJuego.jugador=this.jugadorLogueado.mail;
      }
      this.nuevoJuego.gano= this.nuevoJuego.verificar();
  
      this.servicio.guardarJuego(this.nuevoJuego);
  }
}
