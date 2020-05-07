import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama'
import { LocalStorageService } from '../../servicios/localStorage.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})

export class AnagramaComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: JuegoAnagrama;

  listaPalabras:string[] = ['violeta', 'montaña', 'utensillo', 'escalera', 'guitarra', 'hola', 'control', 'universidad', 'astronauta'];
  anagrama:string;
  palabra:string;
  respuestaUsuario:string;
  resultado:string;
  empezoJuego:boolean;
  terminoJuego:boolean;
  imagen:string;
  servicio: LocalStorageService;
  jugadorLogueado: Jugador;

  constructor() {
    this.nuevoJuego = new JuegoAnagrama();
    console.info("Anagrama:");//,this.nuevoJuego);  
    this.terminoJuego = false;
    this.servicio=new LocalStorageService();
    this.jugadorLogueado=this.servicio.traerLogeado();
   }

  ngOnInit() {
  }

  generarAnagrama() {
    this.empezoJuego = true;

    this.NuevoJuego();

    //busca una palabra al azar:
    let indiceRandom  = Math.floor( Math.random() * (this.listaPalabras.length - 0) + 0);
    this.palabra = this.listaPalabras[indiceRandom];

    let auxAnagrama = Array.from(this.palabra);
    let anagramaAleatorio;

    do{
      /* Randomize array in-place using Durstenfeld shuffle algorithm */
      for (var i = auxAnagrama.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = auxAnagrama[i];
        auxAnagrama[i] = auxAnagrama[j];
        auxAnagrama[j] = temp;
      }

      anagramaAleatorio = auxAnagrama.join("");

    }while(this.palabra === anagramaAleatorio);

    console.log(this.palabra);
    this.anagrama = anagramaAleatorio;
  }

  comprobarRespuesta() {
    console.log(this.respuestaUsuario);

    if(this.respuestaUsuario === this.palabra)
    {
      this.terminoJuego = true;
      this.resultado = "Ganó";
      this.imagen = "./assets/imagenes/tildeOKadw.jpg";
      console.log("Ganó");
    } else {
      this.terminoJuego = true;
      this.resultado = "Incorrecto";
      this.imagen = "./assets/imagenes/tildeMALadw.jpg";
      console.log("Incorrecta");
    }

    // this.nuevoJuego.palabraIngresada=resp;
    // this.ganador=!this.nuevoJuego.verificar();
    // this.perdedor=!this.ganador;
    // this.verTiempo=true;

    if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado!== null))
    {
      this.nuevoJuego.jugador=this.jugadorLogueado.mail;
    }
    this.nuevoJuego.gano= this.nuevoJuego.verificar();

    this.servicio.guardarJuego(this.nuevoJuego);
  }

  NuevoJuego() {
    this.terminoJuego = false;
    this.resultado = '';
    this.respuestaUsuario= '';
  }
}
