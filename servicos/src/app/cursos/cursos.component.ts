

import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService] // se vc quiser que service seja apenas para um componente vc usa o provider dentro do componente e não no modulo

})
export class CursosComponent implements OnInit {

  cursos: string[] = [];


  constructor(private cursosService: CursosService){ //O private no construtor faz com que o CursosServices seja um atributo da classe CursosComponent automaticamente


  }

  ngOnInit(){
    this.cursos = this.cursosService.getCursos();

    CursosService.CriouNovoCurso.subscribe( //aqui temos acesso ao CriouNovoCurso, mas não temos acesso ao emitirCursoCriado, porque o CriouNovoCurso é static

      cursoValor => this.cursos.push(cursoValor)
      //function(cursoValor){
        //console.log(cursoValor);
      //}
    )
    this.cursosService.emitirCursoCriado.subscribe(
      (curso) => {
        console.log(curso)
      }
    );
  }
}


// se vc quiser fazer a comunicação de componentes usando serviços de forma global, vc pode ter um serviço  static eventEmmiter e ai sim, vc nao precisa ser ter uma instancia: private _cursosService: CursosService, vc não precisa injetar isso na suas classe nem nada é so vc fazer o acesso via nome da classe e o nome do emissor de evento aqui no caso foi: CursosService.CriouNovoCurso
//
