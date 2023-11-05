import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  public listaComidas: Array<{comida: string, preco: number}> = [
    {comida: "X-Salada", preco: 10},
    {comida: "X-Bacon", preco: 12},
    {comida: "Coxinha", preco: 5},
  ]

  submitForm(formValue: NgForm){
    if(formValue.valid) console.log(formValue)
  }
}
