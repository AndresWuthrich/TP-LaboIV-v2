import { Component, OnInit } from '@angular/core';
//import { JugadoresService } from '../../servicios/jugadores.service';
import { LocalStorageService } from '../../servicios/localStorage.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  // listado:any
  // miJugadoresServicio:JugadoresService
  
  //   constructor(serviceJugadores:JugadoresService) {
  //     this.miJugadoresServicio = serviceJugadores;
  //   }

  // ngOnInit() {
  // }

  // TraerTodos(){
  //   //alert("totos");
  //   this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerGanadores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerPerdedores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }

  listado: Jugador[];
  servicio: LocalStorageService;
  ganados: number;
  perdidos: number;

  constructor() {
    this.servicio=new LocalStorageService();
    this.listado=this.servicio.traerJugadores();
    console.log(this.listado);
    
  }

  ngOnInit() {
    this.listado.forEach(jugador=>{
      let l=new Array();
      
      l=this.servicio.traerResultados();

      jugador.ganados=(l.filter(a=>a.jugador==jugador.mail)).filter(a=>a.gano==true).length;
      jugador.perdidos=(l.filter(a=>a.jugador==jugador.mail)).filter(a=>a.gano==false).length;
    })    
  }
}
