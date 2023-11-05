import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodList } from '../module/food-list';

@Injectable({
  providedIn: 'root' //qualquer um pode utilizar na injeção de dependencia, Antigamente tinha que registrar no provider do app module
})
export class FoodListService { //esta registrado para todos os componentes

  private list: Array<string> = [
    "X Bacon",
    "Feijão",
    "Ovo"
  ];

  constructor(private http: HttpClient) { }

  public foodList(){
    return this.list
  }

  public foodListAdd(value: string){
    this.foodListAlert(value)
    return this.list.push(value)
  }

  public emitEvent = new EventEmitter();

  public foodListAlert(valor: string){
    return this.emitEvent.emit(valor)
  }

  //GET
  private url: string = "http://localhost:3000/" //list-food

  public foodList2(): Observable<Array<FoodList>> {
    return this.http.get<Array<FoodList>>(`${this.url}list-food`).pipe(res => res, erro => erro)
  }

  //POST
  public foodListAdd2(value: string): Observable<FoodList>{
    this.foodListAlert(value)
    return this.http.post<FoodList>(`${this.url}list-food`, {nome: value}).pipe(res => res, erro => erro)
  }

  public emitEvent2 = new EventEmitter();

  public foodListAlert2(valor: FoodList){
    return this.emitEvent2.emit(valor)
  }


  //POST
  public foodListEdit(value: string, id: number): Observable<FoodList>{
    this.foodListAlert(value)
    return this.http.put<FoodList>(`${this.url}list-food/${id}`, {nome: value}).pipe(res => res, erro => erro)
  }

  //DELETE
  public foodListDelete(id: number): Observable<FoodList>{
    return this.http.delete<FoodList>(`${this.url}list-food/${id}`).pipe(res => res, erro => erro)
  }

}
