import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { JuegoSimon } from '../../clases/juego-simon'
import { Event } from '@angular/router';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: JuegoSimon;
  nivel= 0;
  colores: {};
  secuencia: Array<any>;
  subnivel: number;
  resultado: string;

  newJuego= true;
  light= false;

  ev = new Event("elegirColor(ev)");
  
  constructor() {
    this.nuevoJuego = new JuegoSimon();
    console.info("Simon:");//,this.nuevoJuego);      
  }

  ngOnInit(): void {
  }

  empezarJuego(){
    this.newJuego= false;

    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  btnEmpezar = document.getElementById('btnEmpezar')

  rojo = document.getElementById('rojo')
  verde = document.getElementById('verde')
  azul = document.getElementById('azul')
  amarillo = document.getElementById('amarillo')
  ULTIMO_NIVEL = 5

  inicializar(){
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)//esta atado al juego

    this.nivel = 1
    this.colores = {
    rojo: this.rojo,
    verde: this.verde, //es lo mismo que celeste: celestes (referente al boton)
    azul: this.azul,
    amarillo: this.amarillo
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(this.ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
//        this.subnivel = 0
    this.iluminarSecuencia()
  }

    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'rojo'
            case 1:
                return 'verde'
            case 2:
                return 'azul'
            case 3:
                return 'amarillo'
        }
    }

    transformarColorANumero(numero){
        switch(numero){
            case 'rojo':
                return 0
            case 'verde':
                return 1
            case 'azul':
                return 2
            case 'amarillo':
                return 3
        }
    }

    iluminarSecuencia(){

        for(let i = 0; i < this.nivel; i++){

            const color = this.transformarNumeroAColor(this.secuencia[i])
//             console.log(color)
            setTimeout(() => {

//            console.log(color)
            this.iluminarColor(color)
            }, 1000 * i)//de esta manera se ilumina el color despues de un tiempo, ya que en el for los colores se iluminarian inmediatamente
        }
    }

    iluminarColor(color){
 //       console.log(color)
 
        if(color=='verde'){
//            console.log(color)
            document.getElementById(color).classList.add('verde.light');
        }
        if(color=='rojo'){
//            console.log(color)
            document.getElementById(color).classList.add('rojo.light');
        }
        if(color=='azul'){
//            console.log(color)
            document.getElementById(color).classList.add('azul.light');
        }
        if(color=='amarillo'){
//            console.log(color)
            document.getElementById(color).classList.add('amarillo.light');
        }
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
   //     this.colores[color].classList.remove('light')
    }

    elegirColor(ev){
        console.log(ev)

        // const nombreColor = ev.target.dataset.color
        // const numeroColor = this.transformarColorANumero(nombreColor)
        // this.iluminarColor(nombreColor)
        
        // if(numeroColor === this.secuencia[this.subnivel]){
        //     this.subnivel++//se incrementa

        //     if(this.subnivel === this.nivel){
        //     this.nivel++

        //     if(this.nivel === (this.ULTIMO_NIVEL + 1)){
        //             this.ganoElJuego()
        //         }
        //         else{
        //             setTimeout(this.siguienteNivel, 1500)//se utiliza bind en inicializar()
        //         }
        //     }
        // }
        // else{
        //     this.perdioElJuego()
        // }
    }

    ganoElJuego(){
        this.resultado="GANASTE !!!";

        this.inicializar();
    }

    perdioElJuego(){
        this.resultado="PERDISTE !!!";

        this.inicializar();
    }
}
