import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { Curso } from './curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`

  constructor(private http: HttpClient) { } //com o httpClient não precisa tranformar o json manualmente

  list() {
    return this.http.get<Curso[]>(this.API)//aqui vc ta tipando o retorno que vai ser do tipo de uma interface Curso
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  create(curso: any){
    return this.http.post(this.API, curso).pipe(take(1)); //o pipe é somente para não deixar o observable inscrito

    //todos esses metodos http vão retornar um observable e ate nos inscrevermos nesse observable nada acontece, então onde no arquivo que usaremos esse create precismos do observable
  }

  loadById(id: number){
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1)) //o take 1 é que ele quer no servidor apenas 1 vez
  }

  update(curso: Curso){
    return this.http.put<Curso>(`${this.API}/${curso.id}`, curso).pipe(take(1))
  }

  delete(curso: Curso){
    return this.http.delete(`${this.API}/${curso.id}`).pipe(take(1))
  }



}
