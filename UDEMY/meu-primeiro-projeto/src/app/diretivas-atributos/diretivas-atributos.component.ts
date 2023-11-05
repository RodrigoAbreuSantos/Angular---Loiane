import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-atributos',
  templateUrl: './diretivas-atributos.component.html',
  styleUrls: ['./diretivas-atributos.component.scss']
})
export class DiretivasAtributosComponent implements OnInit{
  public valor: boolean = false //NgClass

  public heightPx: string = "20px" //NgStyle
  public backgroundColor: string = "red" //NgStyle

  public nome: string = '' //NgModel
  public list: Array<{nome: string}> = []
  public lista: Array<{nome: string}> = [{nome: "Rodrigo"}]

  public date: Date = new Date() //Pipes


  onClick(){ //NgClass
    if(this.valor === true) this.valor = false
    else this.valor = true
  }

  ngOnInit(): void {
      setInterval(() => { //NgStyle
        if (this.heightPx == "20px"){
          this.heightPx = "40px"
          this.backgroundColor = "blue"
        }
        else{
          this.heightPx = "20px"
          this.backgroundColor = "red"
        }
      }, 2000)
  }

  public salvar(){
    this.list.push({nome: this.nome});
    this.nome = ''
  }

  public salvar2(){
    this.lista.push({nome: this.nome});
    this.nome = ''
  }


}
