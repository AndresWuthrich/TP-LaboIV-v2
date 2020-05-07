import { Injectable } from '@angular/core';
import { Jugador } from '../clases/jugador';
import { Juego } from '../clases/juego';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  listaJugadores:string;
  listaResultados:string;

  constructor() { 
    this.listaJugadores="listaJugadores";
    this.listaResultados="listaResultados";
  }

  // Jugadores
  checkListaJugadores(jugadores:Jugador[], mail:string, pass:string):boolean{
    let respuesta=false;
    jugadores.forEach(element=>{
      if(mail==element.mail && pass==element.pass)
      {
        respuesta=true;        
      }
    });
    return respuesta;
  }

  traerLogeado():Jugador{
    let j=JSON.parse(localStorage.getItem("jugadorLogeado"));
    return j;
  }

  iniciarJugador(mail:string, pass:string):boolean{
    let jugadoresDB:Jugador[];
    jugadoresDB=JSON.parse(localStorage.getItem(this.listaJugadores)); 
    
    let respuesta=this.checkListaJugadores(jugadoresDB, mail, pass);

    if(respuesta==true)
    {
      jugadoresDB.forEach(element=>{
        if(mail==element.mail && pass==element.pass)
        {
          localStorage.removeItem("jugadorLogeado");
          localStorage.setItem("jugadorLogeado", JSON.stringify(element));              
        }
      });
    }    
    
    return respuesta;
  }

  registrarJugador(mail:string, pass:string):boolean{
    
    let jugadoresDB:Jugador[];    
    let jugadorNuevo=new Jugador(mail, pass);

    jugadoresDB=JSON.parse(localStorage.getItem(this.listaJugadores));
    
    if( (typeof jugadoresDB !== 'undefined') && (jugadoresDB!== null))
    {            
      if(this.checkListaJugadores(jugadoresDB, mail, pass)==false)
      {
        localStorage.removeItem(this.listaJugadores);      
        jugadoresDB.push(jugadorNuevo);        
      }
      else{
        return false;
      }      
    }
    else{
      jugadoresDB=new Array();
      jugadoresDB.push(jugadorNuevo);      
    }
    
    localStorage.setItem(this.listaJugadores, JSON.stringify(jugadoresDB));
    return true;
  }

  traerJugadores():Jugador[]{
    let jugadoresDB:Jugador[];
    jugadoresDB=JSON.parse(localStorage.getItem(this.listaJugadores)); 
    return jugadoresDB;
  }

  // Listados
  traerResultados():Juego[]{
    let jugadoresDB:Juego[];
    jugadoresDB=JSON.parse(localStorage.getItem(this.listaResultados)); 
    return jugadoresDB;
  }

  guardarJuego(juego:Juego){
    let juegosDB=this.traerResultados();

    if( (typeof juegosDB !== 'undefined') &&  (juegosDB!== null))
    {
      localStorage.removeItem(this.listaResultados);      
        juegosDB.push(juego);  
        localStorage.setItem(this.listaResultados,JSON.stringify(juegosDB));
    }else
    {
      juegosDB=new Array();
      juegosDB.push(juego);  
        localStorage.setItem(this.listaResultados,JSON.stringify(juegosDB));
    }
  }
}