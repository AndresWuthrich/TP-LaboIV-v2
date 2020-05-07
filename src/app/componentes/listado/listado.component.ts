import { Component, OnInit } from '@angular/core';
//import { JuegoServiceService } from '../../servicios/juego-service.service';
import { LocalStorageService } from '../../servicios/localStorage.service';
import { Juego } from '../../clases/juego';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  //  miServicioJuego:JuegoServiceService
  servicio: LocalStorageService;
  listaR: Juego[];

  // constructor(servicioJuego:JuegoServiceService) {
  //   this.miServicioJuego = servicioJuego;
    
  // }
  constructor() {
    this.servicio= new LocalStorageService();
    this.listaR= new Array();
    this.listaR= this.servicio.traerResultados();
  }

  ngOnInit() {    
  }

  // llamaService(){
  //   console.log("llamaService");
  //   this.listadoParaCompartir= this.miServicioJuego.listar();
  // }

  // llamaServicePromesa(){
  //   console.log("llamaServicePromesa");
  //   this.miServicioJuego.listarPromesa().then((listado) => {
  //       this.listadoParaCompartir = listado;
  //   });
  // }

  perdedores(){
    let lista:Juego[];    
    lista=this.servicio.traerResultados();
    
    this.listaR=lista.filter(Juego=> Juego.gano==false);
    
    

    console.log(this.listaR);
  }

  ganadores(){
    let lista:Juego[];    
    lista=this.servicio.traerResultados();
    
    this.listaR=lista.filter(Juego=> Juego.gano==true);

    

    console.log(this.listaR);
  }

  todos(){
    let lista:Juego[];    
    lista=this.servicio.traerResultados();
    this.listaR=lista;
  }
}
