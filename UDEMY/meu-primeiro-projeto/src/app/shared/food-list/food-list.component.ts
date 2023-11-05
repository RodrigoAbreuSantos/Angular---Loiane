import { publishFacade } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FoodList } from 'src/app/module/food-list';

//Services
import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit{

  public foodList: Array<string> = []
  public foodList2: Array<FoodList> = []

  constructor(private foodListService: FoodListService){}

  ngOnInit(): void {
    this.foodList =  this.foodListService.foodList()

    this.foodListService.emitEvent.subscribe(
      {
        next: (res: string) => {
          alert(`Voce adicionou no GET==> ${res}`)
        }
      }
    ) //sempre que estiver ativo esta função vc vai se inscrever

    this.foodListService.foodList2().subscribe(
      {
        next: res =>  this.foodList2 = res
      }

    )

    this.foodListService.emitEvent2.subscribe(
      {
        next: (res: FoodList) => {
          alert(`Voce adicionou no POST ==> ${res}`)
          return this.foodList2.push(res)
        }
      }
    )

  }

  public foodListDelete(id: number){
    return this.foodListService.foodListDelete(id)
      .subscribe(
        {
          next: (res) => {
            this.foodList2 = this.foodList2.filter((valor) => {
              return id !== valor.id
            })
          }
        }
      )
  }

  public foodListEdit(nome: string, id: number){
this.foodListService.foodListEdit(nome, id).subscribe(
  {
    next: (res) => {
      return console.log(res)
    }
  }
)
  }


}
