import { Directive, HostListener, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit{

  @Input() defaultColor = 'white';
  @Input() highlightColor = 'yellow';

  @HostListener('mouseenter') onMouseOver(){
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor = ''


   ngOnInit(){
    this.backgroundColor = this.defaultColor;
   }

}
