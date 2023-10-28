import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2

    ) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
      );
  }

 // O this.renderer é mais seguro, do que o this.elementRef

}
