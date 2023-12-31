import { Injectable } from '@angular/core';
import { AlertModelComponent } from './alert-model/alert-model.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(public modalService: BsModalService){}

  private showAlert(message: string, type: string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModelComponent);
    bsModalRef.content.type = type
    bsModalRef.content.message = message
  }

  showAlertDanger(message: string){
    this.showAlert(message, 'danger')
  }

  showAlertSucess(message: string){
    this.showAlert(message, 'success')
  }

}
