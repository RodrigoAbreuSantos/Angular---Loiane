import { Component } from '@angular/core';
import { FoodList } from 'src/app/module/food-list';
import { FoodListService } from 'src/app/services/food-list.service';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent {

  constructor(private foodListService: FoodListService){}

  public listAddItem(value: string){
    this.foodListService.foodListAdd(value)
  }

  public listAddItem2(value: string){
    this.foodListService.foodListAdd2(value).subscribe(
      {
        next: (res) => res

      }

    )
  }


}
