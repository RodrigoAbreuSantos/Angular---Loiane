import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent {

  @Input() type: string = 'success'
  @Input() message!: string

  constructor(public bsModalRef: BsModalRef){}

  onClose(){
    this.bsModalRef.hide();
  }
}
