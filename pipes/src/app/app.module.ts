import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core'; //LOCALE_ID faz parte do angular/core assim como ngmodule
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { SettingsService } from './settings.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [ //Componentes, dieretivas e pipes, todos eles fazem parte da declaração, para que eles fiquem disponiveis para que os componentes possam utilizar eles
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    /*{
      provide: LOCALE_ID,
      useValue: 'pt-BR' //quando vc quer apenas passar um valor

    }*/
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: any) => settingsService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
