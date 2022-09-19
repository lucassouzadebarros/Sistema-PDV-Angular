import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendaService } from 'src/app/service/venda.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Venda } from 'src/app/model/venda';

@Component({
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  sales: Venda[] = [];
  ordemColunasTabela = ['id', 'amount', 'amountPaid', 'payment', 'excluir'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend

  constructor(
    private vendaService: VendaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listSales(this.pagina, this.tamanho);
  }

  listSales(pagina: number, tamanho: number) {
    this.vendaService.buscarVenda().subscribe((response) =>{
      this.sales = response;
      this.totalElementos = 5;
      this.pagina = 1;
      
    })
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      // se clicar em ok chama evento de excluir
      
    });
  }

  
  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listSales(this.pagina, this.tamanho);
  }
}
