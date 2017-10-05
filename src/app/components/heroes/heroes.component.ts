import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
declare var swal:any;
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[]=[];
  loading:boolean=true;

  constructor(private _heroesService:HeroesService) {

    this._heroesService.getHeroes() //Llamamos a la funcion en el servicio
      .subscribe(heroes =>{ //Nos suscribimos para poder ver lo que suceder

        setTimeout(()=>{//Tarda 3 segundos
          this.heroes=heroes; // con la función de flecha asignamos lo recibido a nuestra variable heroes[]
          this.loading=false; // loading tomará el valor de false una vez que se termine de cargar los datos de heroes
        },1000);
      })
   }

  ngOnInit() {
  }

  eliminar(key$:string){
    this._heroesService.borrarHeroe(key$)
        .subscribe(respuesta=>{//Si todo sale bien regresa null
          if (respuesta) {
              //Mal
              console.error(respuesta);
          }else{
            //todo bien
            delete this.heroes[key$];
          }
        })

  }

  eliminarAlerta(key$:string){
    swal({
      title: '¿Estás Seguro?',
      text: "¡No podrás revertir esta acción!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then( ()=> {
      this.eliminar(key$);
      swal(
        '¡Eliminado!',
          this.heroes[key$].nombre + ' ha sido borrado',
        'success'
      )
    })
  }

}
