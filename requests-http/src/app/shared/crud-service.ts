import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T> { //aqui vamos receber o tipo, então a classe que for usar essa vai ter que passar qual tipo vai ser se vai ser Curso, ALuno etc
  constructor(public http: HttpClient, private API_URL: string) {}

  list() {
    return this.http.get<T>(this.API_URL)//aqui vc ta tipando o retorno que vai ser do tipo de uma interface Curso
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  create(curso: any){
    return this.http.post(this.API_URL, curso).pipe(take(1)); //o pipe é somente para não deixar o observable inscrito

    //todos esses metodos http vão retornar um observable e ate nos inscrevermos nesse observable nada acontece, então onde no arquivo que usaremos esse create precismos do observable
  }

  loadById(id: number){
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1)) //o take 1 é que ele quer no servidor apenas 1 vez
  }

  update(curso: T | any){
    return this.http.put(`${this.API_URL}/${curso.id}`, curso).pipe(take(1))
  }

  delete(curso: T | any){
    return this.http.delete(`${this.API_URL}/${curso.id}`).pipe(take(1))
  }

}
