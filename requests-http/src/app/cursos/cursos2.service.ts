import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso>{ //estamos passando o tipo que vai ser Curso que é uma interface com id e nome

  constructor(protected httpClient: HttpClient) {
    super(httpClient,`${environment.API}cursos`);
  }
}
