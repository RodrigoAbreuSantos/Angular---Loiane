import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CursosService } from '../cursos/cursos.service';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule
  ],
  //providers: [CursosService], // O CursoService no provider significa que sua instancia vai estar disponivel para toda a aplicação
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
