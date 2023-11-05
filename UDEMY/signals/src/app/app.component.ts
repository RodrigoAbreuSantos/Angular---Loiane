import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public firstName = signal("Rodrigo")
  public lastName = signal("Abreu")

  public fullName = computed(() => {
    return this.firstName() + ' ' + this.lastName()
  })
  public array = signal<Array<number>>([1])

  constructor(){
    effect(() => { //escuta os eventos
      console.log(this.firstName)
      if (this.array().length > 3) alert(123)
    })
  }

  public updateName(){
    //this.firstName.set('Nay')
    this.firstName.update((oldValue) => {
      console.log(oldValue)
      return 'Nay'
    })
  }

  public updateArray(){
    this.array.mutate((oldValue) => {
      console.log(oldValue)
      return oldValue.push(Number(oldValue.at(-1)) + 1)
    })
  }



}
