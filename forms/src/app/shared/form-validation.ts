/*
import { FormControl, FormGroup } from "@angular/forms";
import { AbstractControl, FormArray } from "@angular/forms";

export class FormValidation{

    static equalsTo(otherField: string){
        const validator = (FormControl: FormControl) => {
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

    
    static requiredMinCheckbox(min = 1){
        const validator = (formArray: AbstractControl) => { //toda vez que fazermos validação passamos o tipo de campo que estamos fazendo a validação
          
          //const values = formArray.controls;
          //let totalChecked: any = 0;
          //for (let i = 0; i< values.length; i++){
            //if (values[i].value){
              //totalChecked = totalChecked + 1;
            //}
          //}
          
         
          if(formArray instanceof FormArray){
            formArray.controls
            .map((v: any) => v.value)
            .reduce((total, current) => current ? total + current : total, 0);
          }
           
           //ela vai pegar o valor e ta interessada apenas no value desse valor tendo assim um array de true ou false. Vamos utilzar o reduce que vai reduzir todos os valores em um
           
          throw new Error('formArray is not an instace of FormArray'); //se o campo tiver pelo menos um valor marcado retornamos null se não tiver nada marcado retornamos um objeto que vai falar que p campo deve ser requirido
    
        };
        return validator
    
      }

}

    static cepValidator(control: FormControl){
        
        const cep = control.value;
        if(cep && cep !== ''){
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }
        return null;
    }
}

}
*/