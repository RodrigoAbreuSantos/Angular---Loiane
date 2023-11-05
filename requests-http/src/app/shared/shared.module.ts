import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModelComponent } from './alert-model/alert-model.component';




@NgModule({
  declarations: [
    AlertModelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertModelComponent]
})
export class SharedModule { }
