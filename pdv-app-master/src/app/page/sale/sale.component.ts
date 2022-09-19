import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { SaleDialogComponent } from '../sale-dialog/sale-dialog.component';
import { ProductSold } from './productSold';
import { Sale } from './sale';
import {ProdutoService} from 'src/app/service/produto.service';
import {VendaService} from 'src/app/service/venda.service';
import {Produto} from 'src/app/model/produto';
import {Venda} from 'src/app/model/venda';
import {ItemVenda} from 'src/app/model/item-venda';
import {Total} from 'src/app/model/total';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  produto = new Produto();
  productsSolds: ProductSold[] = [];
  itemVendas: ItemVenda[] = [];
  valores = new Total();
  formAddItem: FormGroup;
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'quantity', 'name', 'price', 'priceTotal'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend
  statusCaixa = "Caixa Livre";
  data: any;
  pagar: any;

 

  constructor(
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private saleService: SaleService,
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.montarFormulario();
    
    
  }

  montarFormulario() {
    this.formAddItem = this.formBilder.group({
      //validando os dados do formulário
      id: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(1)]],
      quantidade: [null, [Validators.required, Validators.maxLength(50)]],
    })
  }

  limparFormulario() {
    this.formAddItem.reset();
    this.productsSolds = [];
    this.statusCaixa = "Caixa Livre";
    this.pagar =0;
  }

  openDialog(): void {
    //verificar se existe itens na tabela
    if (this.productsSolds.length <= 0) {
      this.snackBar.open('É necessário inserir ao menos um item para realizar a venda venda!', 'Atenção', {
        duration: 3000
      })
    } else {
      //abrir dialog
      let dialogRef = this.dialog.open(SaleDialogComponent, {
        width: '300px',
        data: {
          //itens que serão levados do pdv para o dialog
          pagar: this.pagar
        }
      });
      //confirmar venda
      dialogRef.afterClosed().subscribe(result => {
        // this.data = result;
        const venda = new Sale(
          null,
          result.pagar,
          parseFloat(String(result.pago).replace(",", ".")),
          parseFloat(String(result.troco).replace(",", ".")),
          result.payment,
          this.productsSolds
        );
        
        const vendaa = new Venda(
          null,
          result.pagar,
          this.itemVendas,
          result.payment
        );
        
        this.vendaService.salvarVenda(vendaa).subscribe(resposta =>{
          
          this.snackBar.open('Venda realizada com sucesso!', 'Sucesso', {
            duration: 2000
          })
          //limpar formulário
          this.load();
          
        })

        // salvar venda
        this.saleService.save(venda).subscribe(resposta => {
          this.snackBar.open('Venda realizada com sucesso!', 'Sucesso', {
            duration: 2000
          })
          //limpar formulário
          this.load();
        }, errorResponse => {
          // exibir mensagem snackbar
          this.snackBar.open(errorResponse.error.message, 'ERRO', {
            duration: 2000
          })
        })
      });
    }
  }

  load() {
    //Session storage salva os dados como string
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh) && location.reload();
    sessionStorage.refresh = true;
  }

  adicionarItem() {
    const formValues = this.formAddItem.value;
    
    
    this.produtoService.getProdutoId(formValues.id).subscribe((response) =>{
      this.produto = response;
      const total = response.precoVenda * formValues.quantidade;
      
      
      const productSold = new ProductSold(
        null,
        response,
        response.precoVenda,
        total,
        formValues.quantidade
        );
        
        const itemVenda = new ItemVenda(
          null,
          this.produto,
          response.precoVenda,
          total,
          formValues.quantidade
        )
        
         this.itemVendas = this.itemVendas.concat(itemVenda);
         this.productsSolds = this.productsSolds.concat(productSold);
         this.formAddItem.reset();
         
         this.statusCaixa = "Venda em Aberto";
         
      }, errorResponse => {
      // exibir mensagem snackbar
      this.snackBar.open(errorResponse.error.message, 'ERRO', {
        duration: 3000
      })
    })
  }
  
  

  pegaTotal() {
    this.pagar = this.productsSolds.map(t => t.priceTotal).reduce((acc, value) => acc + value,0)
	
    return this.pagar;
  }
  
  
}