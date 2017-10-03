import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Heroe} from '../interfaces/heroe.interface';
import 'rxjs/Rx'; //Para la función map()

@Injectable()
export class HeroesService {

  heroesUrl:string= "https://heroesapp-5f2c1.firebaseio.com/heroes.json";//Para todos los heroes
  heroeUrl:string= "https://heroesapp-5f2c1.firebaseio.com/heroes/";//Para uno solo

  constructor(private http:Http) { }

  nuevoHeroe(heroe:Heroe){// Método para crear un nuevo objeto héroe

    let body = JSON.stringify(heroe); //Convierte el héroe a un JSON de tipo string
    let headers = new Headers({ //Creamos los headers para decirle que es de tipo JSON
        'Content-Type':'application/json'
    });

    return this.http.post(this.heroesUrl, body, {headers:headers}) //Hacemos el post enviando el url, el body (datos) y headers
          .map( res=>{ //Nos ayuda a transformar la data que viene
              console.log(res.json());
              return res.json();
          })

  }

  actualizarHeroe(heroe:Heroe, key$:string){// Método para crear un nuevo objeto héroe

    let body = JSON.stringify(heroe); //Convierte el héroe a un JSON de tipo string
    let headers = new Headers({ //Creamos los headers para decirle que es de tipo JSON
        'Content-Type':'application/json'
    });

    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.put(url, body, {headers:headers}) //Hacemos el put enviando el url, el body (datos) y headers
          .map( res=>{ //Nos ayuda a transformar la data que viene
              console.log(res.json());
              return res.json();
          })

  }

}
