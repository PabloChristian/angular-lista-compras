import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../compras/compras.service';
import { Produtos } from '../compras/produtos';
import { AlertaComponent } from '../shared/component/alerta/alerta.component';
import { Alerta } from '../shared/models/alerta';
import { ValidarCamposService } from '../shared/validacao/validar-campos.service';

@Component({
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {

  id: number = 0;
  cadastro: FormGroup = new FormGroup({});

  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.comprasService.retrieveById(this.id)
        .subscribe((produtos: Produtos) => this.criarFormulario(produtos));
    } else {
      this.criarFormulario(this.criarProdutoEmBranco());
    }
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const produto = this.cadastro.getRawValue() as Produtos;
    if (this.id) {
      produto.id = this.id;
      this.editar(produto);
    } else {
      this.salvar(produto);
    }
  }

  voltar(): void {
    this.router.navigateByUrl('compras');
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(produto: Produtos): void {
    this.cadastro = this.fb.group({
      nome: [produto.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [produto.imageUrl, [Validators.minLength(10)]],
      quantidade: [produto.quantidade, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  private criarProdutoEmBranco(): Produtos {
    return {
      id: 0,
      nome: '',
      imageUrl: '',
      quantidade: 0
    } as Produtos;
  }

  private salvar(produto: Produtos): void {
    this.comprasService.save(produto).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo produto',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('compras');
        } else {
          this.reiniciarForm();
        }
      });
    },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao salvar o registro!',
            descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      });
  }

  private editar(produto: Produtos): void {
    this.comprasService.save(produto).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
    },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao editar o registro!',
            descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      });
  }

}
