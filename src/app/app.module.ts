import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ComprasModule } from './compras/compras.module';
import { CoreModule } from './core/core.module';
import { IndexComponent } from './core/component/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RodapeComponent } from './shared/component/rodape/rodape.component';
import { MaterialModule } from './shared/material/material.module';
import { AlertaComponent } from './shared/component/alerta/alerta.component';
import { ProdutosModule } from './produtos/produtos.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RodapeComponent,
    AlertaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComprasModule,
    CoreModule,
    MaterialModule,
    ProdutosModule,
    RouterModule.forRoot([
      {
        path: '', component: IndexComponent
        //path: '', redirectTo: '', pathMatch: 'full' //quando passar url em branco, irá redirecionar para a rota de cursos
      }
    ]),
    BrowserAnimationsModule
  ],
  entryComponents: [AlertaComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
