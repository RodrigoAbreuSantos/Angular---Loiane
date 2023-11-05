import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  constructor(private formBuilder: FormBuilder, private uploadFileService: UploadFileService){}

  public cadastroForm: FormGroup = this.formBuilder.group({
    fileToUpload: ['', [Validators.required]]
  })

  onChange(evento: any){
    const selectedFiles = <FileList>evento.srcElement.files;
    selectedFiles[0].name;
    /*
    const customFileLabel = document.getElementById('customFileLabel');

    if (customFileLabel) {
      customFileLabel.innerHTML = selectedFiles[0].name;
    }
    */ //Esse aqui é para somente um arquivo

    const fileNames =[];

    for (let i=0; i< selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      const customeFileNames = document.getElementById('customFileLabel')

      if(customeFileNames){
        customeFileNames.innerHTML = fileNames.join(', ')
      }
    }
  }

  onUpload(form: any){
    if (form){
      console.log("Arquivos enviados com sucesso");
      console.log(form)
      this.uploadFileService.upload(form, '/api/upload').subscribe(response => console.log('Upload Concluido')) //o node esta rodando na porta 8000, o /upload é a rota upload que vai fazer o post dos uploads
      /*
      app.post('/upload', multipartMiddleware, (req, res) => {
        const files = req.files;
        res.json({ message: files })
})
      */
    }

  }
}
