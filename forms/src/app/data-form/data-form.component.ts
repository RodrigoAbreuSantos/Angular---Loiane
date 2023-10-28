import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit{

  formulario: any = FormGroup;

  //estados: EstadoBr[] | undefined; //nossa variavel estado vai ser um array de EstadoBr. Ela vai guardar os estados que esta sendo chamado no ngOnInit e foi transformado em json no getEstadosBR

  estados: any = Observable<EstadoBr>; // vc pode utulizar ou subscribe ou | aysinc, mas de preferencia para o pipe aysinc de informações que estão vindo de nosso template 

  cargos: any = [];

  tecnologias: any = [];

  newsletterOp: any = [];

  frameworks: any = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDown: DropdownService,// o shared module, ja esta importado no modulo data form, entao aqui vamos injetar nosso serviço DropDown
    private cepService: ConsultaCepService
    ){ }

  ngOnInit(): void { //é um evento que é disparado sempre que o componente for inicializado

    //this.estados = this.dropDown.getEstadosBR(); //não vamos fazer o subscribe aqui, o pipe aysinc automaticamente faz o subscribe para gente e assim que o componente for destruido ele tambem faz o unsubscribe, assim não precisando fazer manualmente 

    //O PIPE AYSINC da erro, então é melhor usar o subscribe 

    this.cargos = this.dropDown.getCargos()

    
    this.dropDown.getEstadosBR().subscribe((dados: any) => {
      this.estados = dados.UF
      console.log(dados.UF)
    });

    this.tecnologias = this.dropDown.getTecnologias();

    this.newsletterOp = this.dropDown.getNewsletter();

    
    //no ngOnInit vamos pegar o DropDownService e vamos obter a lista de estados br, a gente precisa ainda se inscrever, porque o http.get que temos dentro do metodo getEstadosBr no serviço DropDownService vai retornar um observable ou uma promisse. Então não é apenas fazer a chamada, no caso do observable precisamos nos inscrever 




    /*this.formulario = new FormGroup({
      nome: new FormControl(null), // se vc quiser que o valor incial tenha 'Rodrigo' vc coloca isso, mais se vc quiser que não tenha valor incial coloca null
      email: new FormControl(null)
      endereco = new FormGroup({
        cep = new FormControl(null),
        numero = new FormControl(null)
      })
    });*/ //Esse é a primeira forma de criar formularios com datadriven a outra forma é usando formBuilder

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]], //dentro de cada form control, ou seja dentro de cada campo de formulario podemos passar um segundo parametro e esses segundos sao justamente as validações
      email: [null, [Validators.required, Validators.email]],
      cofirmarEmail: [null, [Validators.required]],//this.equalsTo('email') //como o email tem 2 validações usa o array []
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.pattern(/^[0-9]{5}[0-9]{3}$/)]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],

        // temos 3 atributos aqui: o nome, email e endereco
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    console.log(this.formulario.get('endereco.cep'));

    // tem 2 jeitos de criar um formualrio reativo. O primeiro é criando uma instancia para o form e para o campo e o outro é usando formBuilder

  }

  onSubmit(){
    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value); // vamos criar uma variavel que vai fazer o submit e vamos fazer uma copia, vai copiar para uma variavel completamente vazia. Com isso vc consehue fazer uma copia do valor do formulario para essa variavel valueSubmit

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    console.log(valueSubmit); // vai mostrar o resultado depois que vc clica no submit 

    //A parte de formulario que esta dentro do valueSubmit ela quer trocar cada true ou false e mandar apenas os que são true pro servidor, mas com nome do framework. Entao no valueSubmit vai fazer outra copia e vai fazer o replace apenas no framework. Vamos iterar cada valor que ta no form framework false false false. Entao vamos acessar o valueSubmit.framwork que ja é o valor. O map pode recerber o valor que foi o que utilizamos antes, mas ele pode receber tambem o indice e nesse caso vai retornar se o valor for true vamos acessar o this.framework que é o nosso array e vamos pegar o valor dele. Senao retorna null. Mas tambem vamos utilizar o filter que é um outro metodo do array que vai filtar o valor  e vai pegar apenas os valores que são diferentes de null

    if (this.formulario.valid){
      //this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
       .pipe(map((res: any) => res)) //aqui é onde mapeamos o que esta sendo passado
       .subscribe((dados: any) =>{
         console.log(dados);
         //reseta form
         this.formulario.reset(); // quando vc faz o submit os campos vao ser resetados, ou seja não vao ter mais nenhuma informação
        },
        (error: any) => alert("Erro") // dentro do subscribe vc tambem poderia colocar um teste de erro, que se der erro vai alertar
         ); //aqui é onde recebemos a resposta do servidor usando o subscribe

       // o ideal é que quando recebemos a resposta do servidor com o subscribe, ai podemos fazer o resete
    }
    else{
      console.log('Estes campos estão Invalidos:');
      this.verificaValidacoesForm(this.formulario); //vamos passar o proprio formulario para as validações
    }
  }

  verificaValidacoesForm(formFroup: FormGroup){
    //Object.keys(this.formulario.controls).forEach((campo: any) => {
    Object.keys(formFroup.controls).forEach((campo: any) => { // ao inves de passar o formulario em si vai passar o grupo de controle
      console.log(campo);
      const controle = formFroup.get(campo); //se vc criar uma variavel recebendo o nome do campo vc vai ter o proprio objeto ou seja vai ser o nome, email e endereco
      controle?.markAsDirty(); //o markAsDirty so funciona dentro de um formGroup

      if (controle instanceof FormGroup) { // vai vereficar se o objeto controle é uma instancia de FormGroup
        this.verificaValidacoesForm(controle);

      } //O nome é um formControl, então ele nao vai chegar nesse if aqui. Mas o endereco vai entrar naquele if, então antes vai passar pelo nome e email. Vai vereficar se o endereco(controle) é uma instancia(instanceof) de FormGroup e vai chamar as validações de formulario(verificaValidacoesForm) passando o endereco(controle) como se fosse a raiz do formulario. E dentro do proprio formulario no ngOnInit vai fazer as validações

      // dirty ==> campo modificado. touched ==> campo tocado. valid ==> campo valido. !campo.valid ==> campo invalido


    }); // o object.keys é um metodo que consegue extrair cada chave que temos dentro do objeto, então se vc chamar esse object keys do formulario ele vai pegar o nome, email e endereco

    //forEach vai iterar cada item que vc tem no formulario
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: any){

   return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty); //o metodo get passando o nome do campo vai retornar a instancia do formControl que é cada campo do form

   // o return vai retornar se o campo do forumulario não for valido e tocado
  }

  aplicaCssErro(campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  verificarEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if (campoEmail.erros){
      return campoEmail.errors['email'] && campoEmail.touched;

      //Se vc colocar alguma informação no email e fazer o submite, vc vai ver que no formGroup cada controle no caso do email tem um objeto de errors, então se o errors de email for true, tambem podemos mostrar uma mensagem de email invalido na tela
    }
  }

  consultaCEP(){

    let cep: any = this.formulario.get('endereco.cep').value; // aqui criamos uma variavel chamada cep que vai receber o formulario passando o cep que esta dentro do atributo endereco e vamos pegar o valor do cep
    //Nova variável "cep" somente com dígitos.
    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
      .subscribe((dados: any) => this.populaDadosForm(dados));
    }


  }

  populaDadosForm(dados: any){

    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('Rodrigo'); // Aqui por exemplo eu vou colocar o nome de Rodrigo sempre que eu fizer uma busca no cep. Caso vc queira apenas popular 1 campo de formulario, vc pode colocar o setValue para aquele campo em especifico
  }
  resetaDadosForm(){
      this.formulario.patchValue({
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

  //Nos conseguimos resetar um formulario toda vez que ele é enviado para o servidor e retorna sucesso, ou tambem pelo botao de cancelar que esta chamando o metodo resetar()

  setarCargo(){
    const cargO = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargO);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(this.tecnologias.nome); // usou o value no template, porque vc pde linkar ele. Por exemplo vc pode linkar ele aqui se vc usasse a [value] = 'tecnologia.desc' aqui no setValue vc colocaria a desc do objeto, mas como no value eu usei o nome e a variavel nome esta recebendo o metodo que esta as informaões, então eu usei this.tecnologia.nome que é a variavel com o valor nome
  }

  buildFrameworks(){

    const values = this.frameworks.map((v: any) => new FormControl(false)); // o map vai transformar um valor em algum outro valor. Então para cada valor que existir no array de frameworks vamos ter um array novo que vai ser

    return this.formBuilder.array(values); // (values. this.frameworks.requiredMinCheckbox(1)); //nos vamos utilizar o form builder e o form builder tem o controle para cada campo, o group que é o grupo de campos que é o nosso proprio formulario e tambem um array. E cada campo desse array vai ser os valores ali em cima
    
    /*
    return 
      this.formBuilder.array([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false) // um novo form control que tem o valor de true ou falso, vai ser valor falso, porque inicalmente todos os campos vão estar desmarcados e criamos um para cada item do array de frameworks
      ]);
    */
  }

  requiredMinCheckbox(min = 1){
    const validator = (formArray: AbstractControl) => { //toda vez que fazermos validação passamos o tipo de campo que estamos fazendo a validação
      
      /*
      const values = formArray.controls;
      let totalChecked: any = 0;
      for (let i = 0; i< values.length; i++){
        if (values[i].value){
          totalChecked = totalChecked + 1;
        }
      }
      */
      
     
      if(formArray instanceof FormArray){
        const totalChecked = formArray.controls
        .map((v: any) => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      }
       
       //ela vai pegar o valor e ta interessada apenas no value desse valor tendo assim um array de true ou false. Vamos utilzar o reduce que vai reduzir todos os valores em um
       
      throw new Error('formArray is not an instace of FormArray'); //se o campo tiver pelo menos um valor marcado retornamos null se não tiver nada marcado retornamos um objeto que vai falar que p campo deve ser requirido

    };
    return validator

  }

  equalsTo(otherField: string){
    let validator = (FormControl: FormControl) => {
        if (otherField == null){
            throw new Error('É necessario informar um campo')
        }
        if (!FormControl.root || (<FormGroup>FormControl.root).controls){
            return null;
        }
        const fiedl = (<FormGroup>FormControl.root).get(otherField);

        if (!fiedl){
            throw new Error('É necessario informar um campo valido')
        }
        if (fiedl.value !== FormControl.value){
            return { equalsTo: otherField }
        }
        return null;
    }
    return validator;
}

  
  
  // todo esse codigo foi passado para uma classe validacion do tipo static ou seja vc tem apenas uma isntancia para cada chamada, é como se vc um codigo compartilhado

  
  
}
