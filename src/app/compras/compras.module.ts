import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComprasListComponent } from "./compras-list.component";
import { CommonModule } from "@angular/common";
import { PipeModule } from "../shared/pipe/pipe.module";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    ComprasListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: 'compras', component: ComprasListComponent
      }
    ])
  ]
})
export class ComprasModule{

}
