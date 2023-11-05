import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-estruturais',
  templateUrl: './diretivas-estruturais.component.html',
  styleUrls: ['./diretivas-estruturais.component.scss']
})
export class DiretivasEstruturaisComponent implements OnInit{
  public condition: boolean = true
  public conditionClick: boolean = true
  public nome: string = "Rodrigo"

  public list: any[] = [
    {nome: "Rodrigo Abreu", idade: 18},
    {nome: "Dener Troquatte", idade: 30},
    {nome: "Isabel", idade: 22}
  ]

  ngOnInit(): void {
      setInterval( () => {
        if(this.condition === true) this.condition = false
        else this.condition = true
      }, 4000)

  }

  public onClick(){
    if(this.conditionClick === true) this.conditionClick = false
    else this.conditionClick = true

  }

  public onClickAddList(){
    this.list.push({nome: "Carlos", idade: 21})
  }

  public onClickEventList(indice: number){
    this.list.splice(indice, 1)
  }
}
