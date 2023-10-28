import { HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBR(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe();
     //vai retornar a chamada do http, como nesse caso vamos obter os valores vai ser o metodo get, nesse metodo get vamos passar o caminho desse json, so que essa chamada vai retornar um objeto do tipo response, ou seja é uma resposta do servidor ainda não é o json em si, então seguindo o mesmo passo que fizemos para obter o cep, para obter o json, vamos mapear essa informação, a variavel que criamos vai ser do tipo Resnpone que vai receber o formato json
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ];
  } 

  //ESSE RETURN PODERIA VIR DO SERVIDOR OU DE UM JSON, VC PODERIA POR EXEMPLO CRIAR UMA INTERFACE E CRIAR VARIAVEIS DE NOME, NIVEL E DESC LA DENTRO E AQUI VC RETORNARIA ELA USANDO A CHAMADA HTTP E USANDO O GET PARA TRAZER OS VALORES, VC PASSARIA O CAMINHO DA INTERFACE .PIPE() PARA TRAZER ELA NO FORMATO JSON

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ];
  }

  getNewsletter(){
    return[
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ];
  }
}
