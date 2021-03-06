import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosCadastroComponent } from './produtos-cadastro.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipe/pipe.module';

@NgModule({
  declarations: [ProdutosCadastroComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: 'produtos', component: ProdutosCadastroComponent
      }
    ])
  ]
})
export class ProdutosModule { }
