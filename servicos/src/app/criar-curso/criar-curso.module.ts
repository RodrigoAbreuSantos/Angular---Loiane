import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CursosService } from '../cursos/cursos.service';
import { CriarCursoComponent } from './criar-curso.component';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [
    CriarCursoComponent,
    ReceberCursoCriadoComponent // não exportou este componente porque ele vai ser apenas utilizado internamente pelo criar-curso.componente
  ],
  imports: [
    CommonModule
  ],
  //providers: [CursosService], // O CursoService no provider significa que sua instancia vai estar disponivel para toda a aplicação
  exports: [
    CriarCursoComponent
  ]
})
export class CriarCursoModule { }
