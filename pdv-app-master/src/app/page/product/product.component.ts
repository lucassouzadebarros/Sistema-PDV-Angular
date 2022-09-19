import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Product } from './product';
import parseMoney from 'parse-money';
import {ProdutoService} from 'src/app/service/produto.service';
import {Observable} from 'rxjs';
import {Produto} from 'src/app/model/produto';
import {Estoque} from 'src/app/model/estoque';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  produtos: Observable<Produto[]>;
  produto = new Produto();
  
  formulario: FormGroup;
  //lista de products para exiboir
  products: Product[] = [];
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'name', 'precoCompra','cdgbarras', 'status', 'excluir', 'editar'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend

  constructor(
    private produtoService: ProdutoService,
    
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.produto;
    this.montarFormulario();
    this.listarProductes(this.pagina, this.tamanho);
  }

  submit() {
    //pegar os dados do formulário
    const formValues = this.formulario.value;
    // cria e adiciona no objeto
    const product: Produto = new Produto();
    const estoque: Estoque = new Estoque();
      
    product.codigo = formValues.id;
    product.descricao = formValues.name;
    product.precoCompra = formValues.priceCompra;
    product.precoVenda =  formValues.priceVenda;
    product.status = formValues.status;
    product.cdgbarras = formValues.cdgbarras;
    estoque.qtde = formValues.qtd;
    estoque.qtde_minima = 0;
    product.estoque = estoque;

 if (product.codigo !== null) {
   console.info("Meu ID é DIferente de NULL" + " " + product.codigo);
	this.produtoService.salvarProduto(product).subscribe(data =>{
    
    this.snackBar.open('Produto alterado com sucesso!', 'Sucesso', {
          duration: 2000
        })
        //limpar formulário
        this.listarProductes(this.pagina, this.tamanho);
        this.formulario.reset();
      }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
	}
	else{
    this.produtoService.salvarProduto(product).subscribe(data =>{
      this.snackBar.open('Produto salvo com sucesso!', 'Sucesso', { duration: 2000})
         
    this.listarProductes(this.pagina, this.tamanho);
    this.formulario.reset();
    
  }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {duration: 2000})
        }  
        
      )
    }
   
  }
  

  montarFormulario() {
    
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, Validators.nullValidator],
      name: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      priceCompra: [null, [Validators.minLength(1), Validators.maxLength(6)]],
      priceVenda: [null, [Validators.minLength(1), Validators.maxLength(6)]],
      status: [null, Validators.required],
      cdgbarras: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      qtd: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    })
  }

  limparFormulario() {
    this.formulario.reset();
  }

  listarProductes(pagina: number, tamanho: number) {// definir a primeira página e o tamanho inicial
  
    this.produtoService.getProdutoList().subscribe((response) => {
      
      this.produtos = response // pegar o conteudo do pag
     
      this.totalElementos = 10;// pegar o total de elementos
      this.pagina = 5;// pegar o numero de paginas
      
    });
  }

  private excluir(id: number) {
   
  }

  editar(id: number) {
    
    this.produtoService.getProdutoId(id).subscribe((response) =>{
      this.produto = response;
      console.info("Meu descricao" + this.produto.descricao);
      this.formulario.controls.id.setValue(this.produto.codigo);
      this.formulario.controls.name.setValue(this.produto.descricao);
      this.formulario.controls.priceCompra.setValue(this.produto.precoCompra);
      this.formulario.controls.priceVenda.setValue(this.produto.precoVenda);
      this.formulario.controls.status.setValue(this.produto.status);
      this.formulario.controls.cdgbarras.setValue(this.produto.cdgbarras);
      this.formulario.controls.qtd.setValue(this.produto.estoque.qtde);
      
      
    });
    
  }

  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listarProductes(this.pagina, this.tamanho);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      // se clicar em ok chama evento de excluir
      if (result) {
        this.excluir(id);
      }
    });
  }
}