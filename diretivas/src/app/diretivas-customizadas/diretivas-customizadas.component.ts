import { Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.scss'],
})
export class DiretivasCustomizadasComponent {

  mostrarCursos = false;

  onMostrarCurso(){
    this.mostrarCursos = !this.mostrarCursos;
  }


  @HostBinding('style.backgroundColor') get setColor(){
    return this.backgroundColor;
  }

  private backgroundColor = '';

  onMouseOver(){
    this.backgroundColor = 'yellow';
  }
  onMouseLeave(){
    this.backgroundColor = 'white';
  }
}
