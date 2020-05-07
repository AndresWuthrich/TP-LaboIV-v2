import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from '../../servicios/localStorage.service';

//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  servicio:LocalStorageService;
  mail:string;
  pass:string;
  pass2:string;
  yaRegistrado:boolean;

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/

  constructor(private router: Router ) { 
    this.servicio=new LocalStorageService();
    this.yaRegistrado=true;
  }

  ngOnInit() {
  }

  acepto(){
    this.yaRegistrado=true;
  }

  registrar(mail:string, pass:string, pass2:string){
    if(pass===pass2)
    {
      this.yaRegistrado=(this.servicio.registrarJugador(mail, pass2));
      if (this.yaRegistrado==true)
      this.router.navigate(['/']);
    }
  }  
}
