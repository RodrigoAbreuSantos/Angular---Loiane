import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked{
  constructor(){}

  public valor: number = 1
  public destruir: boolean = true

  public adicionar(){
    return this.valor += 1
  }

  public destruirComponent(){
    this.destruir = false
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      console.log(1)
    }, 5000);
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked(): void {
      console.log("ngAfterViewChecked");
      console.log("---------------------------------")
  }

  public addValue: number = 0

  add(){
    this.addValue ++
  }

  public getDados: {nome: string, idade: number} | undefined

  public setDados(evento: {nome: string, idade: number}){
    this.getDados = evento
  }
}
