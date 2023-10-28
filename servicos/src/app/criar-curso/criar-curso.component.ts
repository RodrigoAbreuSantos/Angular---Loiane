import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.scss'],
  providers: [CursosService] // se vc quiser que service seja apenas para um componente vc usa o provider dentro do componente e não no modulo
})
export class CriarCursoComponent implements OnInit{

  cursos: string[] = [];

  constructor(private cursosService: CursosService){ //ela declarou o serviço
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCurso(curso: string){
    this.cursosService.AddCurso(curso);
  }
}
