import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {

  @Output() public enviarDados = new EventEmitter()

  public list: Array<{nome: string, idade: number}> = [
    {nome: "Denner Troquatte", idade: 31},
    {nome: "Rodrigo Abreu", idade: 19},
    {nome: "Julia", idade: 21},
  ]

  public getDados(indice: number){
    this.enviarDados.emit(this.list[indice])
  }
}
