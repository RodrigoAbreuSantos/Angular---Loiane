import { Pipe, PipeTransform, untracked } from '@angular/core';

@Pipe({
  name: 'camelCaseGeneratePipe'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let values = value.split(' '); // vai fazer a palavar ser separada por espaço, então cada palavra teria 1 espaço
    let result = '';

    for (let valores of values){
      result += this.capitalize(valores) + ' ';
    }

    return result;
  }

  capitalize(value: string){
    return value.substring(0,1).toUpperCase() + value.substring(1).toLowerCase();
// vai pegar a palavra e a primeira letra, por isso o 0 vai transformar em letra maiscula, mas apenas a primeira letra por isso o 1
  }

}
