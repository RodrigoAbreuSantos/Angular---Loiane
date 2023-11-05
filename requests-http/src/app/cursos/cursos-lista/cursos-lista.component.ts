import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, Subject, catchError, empty, of } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModelComponent } from 'src/app/shared/alert-model/alert-model.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit{

  @ViewChild('deleteModal') deleteModal: any//esse deleteModal é a refrencia do ngTemplate

  cursos: Curso[] = [];

  cursos$!: Observable<Curso[]>

  error$ =  new Subject<boolean>//objeto que consegue emitir valores

  bsModalRef!: BsModalRef

  deleteModalRef!: BsModalRef

  cursoSelecionado!: Curso

  constructor(
    private cursosService: Cursos2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.onRefresh() //precisa iniciar o onRefresh()
  }

  onRefresh(){
    this.cursos$ = this.cursosService.list().pipe(catchError(erro => {
        console.log(erro);
        this.error$.next(true) //vai emitir e vai ser captuardo no html
        this.handleError()
        return of()
      }));

      this.cursosService.list().subscribe(dados => {
        console.log(dados)
      },
      error => console.log(error),
      () => console.log('Observable completo')
      )
  }

  handleError(){
    this.alertModalService.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde')
  }

  //Para atualizar
  onEdit(cursoId: number){
    this.router.navigate([`cursos/editar`, cursoId])
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm'})
  }

  onConfirmDelete(){
    this.cursosService.delete(this.cursoSelecionado).subscribe(
      success => {
        this.alertModalService.showAlertSucess('Curso deletado com sucesso'),
        this.deleteModalRef.hide()
        this.onRefresh()
        this.router.navigate(['/cursos'])
      },
      error => this.alertModalService.showAlertDanger('Curso não foi deletado'),
      () => console.log('Request Ok')
    )
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }





}
