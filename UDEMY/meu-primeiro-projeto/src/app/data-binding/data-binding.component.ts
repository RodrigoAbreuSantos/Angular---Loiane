import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss']
})
export class DataBindingComponent {
  public nome: string = "Rodrigo";
  public idade: number = 18
  public maisUM: number = 1

  public checkedDisable: boolean = true

  public imgSrc: string = "https://2.bp.blogspot.com/_KTyOqC8Sqao/S-ySYocJCYI/AAAAAAAAABw/SHevGZZE9Kc/s1600/s3.jpg"
  public imgTitle: string = "Property Binding"

  public alerta(valor: string){
    alert(valor)
  }

  public alertaInfo(valor: MouseEvent){
    console.log(valor)
  }

  public position: {x: number, y: number} = {x: 0, y: 0}

  public mouseMoveTest(valor: MouseEvent){
    this.position.x = valor.offsetX
    this.position.y = valor.offsetY

  }

}
