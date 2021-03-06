import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Produtos } from './produtos';
import { ComprasService } from './compras.service';
import { Alerta } from '../shared/models/alerta';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from '../shared/component/alerta/alerta.component';

@Component(
  {
    templateUrl: './compras-list.component.html',
    styleUrls: ['./compras-list.component.css']
  }
)
export class ComprasListComponent implements OnInit {
  filteredProdutos: Produtos[] = [];
  _produtos: Produtos[] = [];
  _filterBy: string = "";

  constructor(private comprasService: ComprasService,
    public dialog: MatDialog){}

  ngOnInit() : void {
    this.retrieveAll();
  }
  retrieveAll(): void {
    this.comprasService.retrieveAll().subscribe({
      next: produtos => { //callback function
        this._produtos = produtos;
        this.filteredProdutos = this._produtos;
      },
      error: err => console.log('Error',err) //callback function
    });
  }

  saveByProduct(produtos: Produtos): void {
    if(produtos.quantidade < 0) produtos.quantidade = 0;
    this.comprasService.save(produtos).subscribe({
      next: () => {
        console.log('Aumentou com sucesso!');
        this.retrieveAll();
      },
      error: err => console.log('Error',err)
    })
  }

  deleteById(comprasId: number): void {

    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.comprasService.deleteById(comprasId).subscribe({
          next: () => {
            console.log('Removeu com sucesso!');
            this.retrieveAll();
          },
          error: err => console.log('Error',err)
        })
      }
    });
  }

  set filter(value: string) {
    this._filterBy = value;
    this.filteredProdutos = this._produtos.filter((produtos: Produtos) => produtos.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
  }

  get filter() {
    return this._filterBy;
  }
}
