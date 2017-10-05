import { Component, OnInit } from '@angular/core';
import {NgForm, FormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Heroe} from '../../interfaces/heroe.interface';
import {HeroesService} from '../../services/heroes.service';
declare var swal:any;

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  nuevo:boolean=false; //Para saber si es nuevo o actualizar
  id:string;

  constructor(private _heroesService: HeroesService, private router:Router, private route:ActivatedRoute) {//inicializamos el servicio y el router en el constructor
    this.route.params.subscribe(parametros=>{
                    //console.log(parametros);
                    this.id= parametros['id'];//Obtenemos el id del héroe

                    if (this.id !== 'nuevo') { //Si es distinto a nuevo
                        this._heroesService.getHeroe(this.id)
                          .subscribe(heroe=> this.heroe = heroe)
                    }
                });
  }

  ngOnInit() {
  }

  heroe:Heroe = { //Objeto heroe de tipo Heroe según la interface
    nombre:"",
    bio:"",
    casa:"Marvel"
  }


  guardar(){
    //console.log(this.heroe);
    //Si es nuevo, inserta uno nuevo, else, actualiza el del id
    if (this.id == "nuevo") { //Llamamos al método nuevoHeroe() del servicio
      this._heroesService.nuevoHeroe(this.heroe) .subscribe(data=>{ //No sucederá nada hasta que nos subscribamos y regresemos la data recibida
                swal(
                  this.heroe.nombre,
                  '¡Guardado con éxito!',
                  'success'
                )
                this.router.navigate(['/heroe', data.name]) //Una vez insertado, nos manda a la página del héroe
            },
            error => console.error(error));//Nos imprime el error en caso de que exista
    }else{//Llamamos al método para actualizar
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe(data=>{ //actualizamos un heroe
                swal(
                  this.heroe.nombre,
                  '¡Actualizado con éxito!',
                  'success'
                )
              },
                error=> console.error(error)); //Atrapamos el error en consola
    }
  }

  guardarAlerta(){
    swal(
      'Oops...',
      'Something went wrong!',
      'error'
    )
  }
  agregarNuevo(form:NgForm){
    this.router.navigate(['/heroe','nuevo']);
    form.reset({
      casa:"Marvel"
    });
  }
}
