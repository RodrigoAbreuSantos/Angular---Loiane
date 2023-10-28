import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient
  ) { }

  consultaCEP(cep: string){

    // aqui criamos uma variavel chamada cep que vai receber o formulario passando o cep que esta dentro do atributo endereco e vamos pegar o valor do cep
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep !== "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
        // ela criou um metodo que retonar o formulairo vazio, e chamou esse metodo aqui dentro passando o form dentro dele. Porque o conulta cep tem como paramtero tambem o form que ele esta pegando la do template com o (blur) = "consultaCep(cep.value, f") esse f é a variavel do formulario no template. Então para resetar o form com a função de reset é so passar o form dentro do resetaDados, assim os dados do form vai para essa função que vai deixar eles fazio

         // como é um metodo que esta dentro do proprio componente precisa referenciar ele com o this

      }
    }

    return of({});

    // nos temos o valor do input sendo passado aqui para a nossa função
  }
}
