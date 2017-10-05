import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure:false //Para que está pendiente del ciclo de cambios de angular
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {

    let keys=[];

    for(let key in value){ //Haremos un arreglo de llaves
      keys.push(key);
    }

    return keys;
  }

}
