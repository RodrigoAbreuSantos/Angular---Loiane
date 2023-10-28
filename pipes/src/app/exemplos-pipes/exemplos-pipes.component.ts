import { Component } from '@angular/core';
import {interval } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ['Java', 'Angular2'];

  filtro: any;

  addCurso(valor: any){
    this.livros.push(valor);
  }
  obterCurso(){
    if (this.livros.length === 0 || this.filtro === null || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
        return true;
      }
      return false;
    }

    )
  }

  valorAsync = new Promise ((resolve, reject) => {
    setTimeout(() => resolve('Valor assincrono'), 2000)  //Ela chamou a função setTimeout() que é uma função que faz demorar um pouco

    }); // Esse codigo vai atribuir o valor assincrono a variavel valorAsync depois de 2 segundos

  valorAsync2 = interval(2000).pipe(map((valor: any) => 'Valor assincrono 2'));
  
}


