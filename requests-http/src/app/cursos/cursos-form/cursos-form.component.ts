import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: Cursos2Service,
    private modalService: AlertModalService,
    private router: Router, //muda a rota
    private route: ActivatedRoute //classe que contem os parametros da rota
  ) { }

  public form!: FormGroup
  submitted: boolean = false//flag se o form ja foi submetido

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

    let registro = null


    this.route.params.subscribe((parametro: any) => {
      const id = parametro.id
      console.log(id)
      const curso$ = this.cursosService.loadById(id)
      curso$.subscribe(curso => {
        registro = curso
        this.updateForm(curso)

      })
    })



  }

  updateForm(curso: any) {

    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid) {
      console.log(this.form.value)
      if (this.form.value.id){
        this.cursosService.update(this.form.value).subscribe(
          success => {
            this.modalService.showAlertSucess('Curso atualizado com sucesso'),
              this.router.navigate(['/cursos'])
          },
          error => this.modalService.showAlertDanger('Curso não foi atualizado'),
          () => console.log('Request Ok')
        )
      }else{
        this.cursosService.create(this.form.value).subscribe(
          success => {
            this.modalService.showAlertSucess('Curso adicionado com sucesso'),
              this.router.navigate(['/cursos'])
          },
          error => this.modalService.showAlertDanger('Curso não foi adicionado'),
          () => console.log('Request Ok')
        )
      }
    }

    //todos esses metodos http vão retornar um observable e ate nos inscrevermos nesse observable nada acontece,
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }







}
