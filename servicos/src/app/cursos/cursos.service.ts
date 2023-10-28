//export class CursosService{

  //getCursos(){
  //  return ['Angular2', 'Java', 'Phonegap'];

//  }
//}

import { Injectable, EventEmitter } from "@angular/core";

import { LogService } from "../shared/log.service";
import { STRING_TYPE } from "@angular/compiler";

@Injectable()

export class CursosService{

  emitirCursoCriado = new EventEmitter(); //aqui queremos passar apenas o nome do curso que foi criado, no caso aqui é uma string

  static CriouNovoCurso = new EventEmitter(); // o static significa que não precisamos da instancia da classe para acessar o mesmo, ou seja aqui não precisamos da instancia da classe curso service para acessar o nome do curso e emitir o evento. Então não precisamos instanciar o CursosService em outra classe como por exemplo a classe Cursos.component

  private cursos: string[] = ['Angular2', 'Java', 'Phonegap'];

  constructor(private logService: LogService){

    console.log('CursosServices');
  }

  getCursos(){
    //this.logService.consoleLog('Obtendo Lista de cursos');
    return this.cursos;

  }

  AddCurso(curso: string){
    //this.logService.consoleLog(`Criando um novo curso ${curso}`);
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.CriouNovoCurso.emit(curso)
  }
}

