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
  secuencia: Array<any>;
  subnivel: number;
  resultado: string;

  newJuego= true;
  light= false;

  private colores: Array<string> = ["verde","rojo","amarillo","azul"];
  private userColours: Array<string> = new Array<string>();
  private machineColours: Array<string> = new Array<string>();
  private level:number = 1;
  private levelJson:object = JSON.parse('{ "rounds":[{ "level":"1", "steps":"3", "speed":"800" }, { "level":"2", "steps":"2", "speed":"750" }, {"level":"3", "steps":"2", "speed":"700" }, {"level":"4", "steps":"3", "speed":"650" }, {"level":"5", "steps":"5", "speed":"600" }] }');
  private rounds:object = this.levelJson["rounds"]; 
  private isPlaying:boolean = false;
  private currentStep:number = 0;
  private speed:number = 800
 
  constructor() {
    this.nuevoJuego = new JuegoSimon();
    console.info("Simon:");//,this.nuevoJuego);      
  }

  ngOnInit(): void {
  }

  empezarJuego(){
    this.newJuego= false;
  }

  clearVariables(){
    this.userColours = [];
    this.currentStep=0;
  }

  fillMachineColours(steps){
    for(let x:number = 0; x < steps; x++){
      let randomValue = this.colores[Math.floor(Math.random() * this.colores.length)];
      this.machineColours.push(randomValue);
    }
  }  

  showSteps() {
    let self = this;
    if(self.currentStep > self.machineColours.length-1) {
      self.currentStep = 0;
      return;
    }
    var color = self.machineColours[self.currentStep];
  }
}