import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnChanges, OnDestroy{

  @Input() public title: string = 'Bem-Vindo'

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Foi alterado com sucesso", changes)
  }

  ngOnDestroy(): void {
      console.log('O <app-title> foi destruido no app-component')
  }

}
