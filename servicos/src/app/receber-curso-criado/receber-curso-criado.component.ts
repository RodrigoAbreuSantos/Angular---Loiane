import { CursosService } from './../cursos/cursos.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-receber-curso-criado',
  templateUrl: './receber-curso-criado.component.html',
  styleUrls: ['./receber-curso-criado.component.scss']
})
export class ReceberCursoCriadoComponent implements OnInit {

  curso = '';

  constructor(private cursosService: CursosService){

  }

  ngOnInit(): void {
    this.cursosService.emitirCursoCriado.subscribe(
      cursoCriado => this.curso = cursoCriado
    )
  }
}
