import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngElse]'
})
export class NgElseDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input() set ngElse(condition: boolean){
    if (!condition){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this,this.viewContainerRef.clear();
    }
  }

}
