import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {

  constructor(private http: HttpClient,
    private cepService: ConsultaCepService
    ){ }

  usuario: any = {
    nome: null, //"Loiane",
    email: null //"loiane@gmail.com"
  }


  onSubmit(forM: any){
    console.log(forM /*.value*/); // como esta usando o two-way-data-binding vc pode escolher submeter o form.value ou o seu proprio objteo que no caso aqui seria usuario

    //console.log(this.usuario); // como usuario é uma variavel local tem que usar o this na frente

    this.http.post('https://httpbin.org/get', JSON.stringify(forM.value))
       .pipe(map((res: any) => res))
       .subscribe((dados: any) =>{
          console.log(dados);
          forM.form.reset(); //não precisa do this, pois esta fazendo referencia ao proprio parametro e não a uma variavel da nossa classe TemplateFormComponent. O primeiro form é o form do parametro, o segundo form é o que usamos para popular os dados no metodo populaDadosForm() onde usava o patchValue
        });

      //ela vai mapear a resposta que esta vindo do servidor e vai fazer tambem um subscribe, esse subscribe é que realmente vai pedir para fazer a chamada no servidor. Ela criou uma array function criando uma variavel chamada dados e
    //esse JSON é uma API que tranforma o determinada coisa e formato json, entao aqui ele vai transforma o form em json. O post vai ser na hora de receber informações usa o post
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any){

    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any, form: any){
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
      .subscribe((dados: any) => this.populaDadosForm(dados, form));
    }

  }



  populaDadosForm(dados: any, formulario: any){
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    }); //no Angular atual, o que funciona é o patchValue, o set.value não funciona
  }

  resetaDadosForm(formulario2: any){
    formulario2.form.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
