import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/service/venda.service';
import {Chart, registerables} from 'chart.js';
import { Venda } from 'src/app/model/venda';
import {Relatorio} from 'src/app/model/relatorio';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vendas: Relatorio[] =[];
  chart:any;
  chart2:any;
  totalVendas: any;
  valorVendas: number;
  produtosCadastrados: number;
  produtosAtivos: number;
  sales: Venda[] = [];
  ordemColunasTabela = ['codigo','descricao','qtd' ,'estoque','gasto','vendido','lucro'];
  mensagemErros: String[] = [];


  constructor(
    private vendaService: VendaService
   
  ) { }


  ngOnInit() {
    this.chart = document.getElementById('my_chart');
    this.chart2 = document.getElementById('my_chart2');
    Chart.register(...registerables);
    this.loadChart();
    this.somarVendas();
    this.totalDeVendas();
    this.totalProdutos();
    this.totalProdutosAtivos();
    this.listSales();
  }


 loadChart(){
   new Chart(this.chart, {
     type: 'line',
     data:{
       datasets:[{
         data:[12,34,53,51,67,86],
         label: 'Series 1',
         backgroundColor: '#007bff',
         tension: 0.2,
         borderColor: '#007bff',
       },        
       ],
       labels:["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
     },
     options:{
       
     }
   })
   
   new Chart(this.chart2, {
     type: 'bar',
     data: {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Pedidos",
        data: [25, 20, 40, 22, 17, 29],
        backgroundColor: "#f56036",
        maxBarThickness: 10
        
        
      },
      {
        label: "Entregues",
        data: [20, 10, 35, 8, 9, 14],
        backgroundColor: "#20b065",
        maxBarThickness: 10
      }   
    ]
    
   
  },
     
 
     
     
   })
 }
 
 
 geraRelatorio(){
   
   this.vendaService.relatorioVenda().subscribe((response) =>{
     
     this.vendas = response;
   })
   
 }

  somarVendas() {
		    
     
      this.vendaService.somaVenda().subscribe((response) =>{
      
      this.valorVendas = response;
      console.info("Soma Venda: " + response);
    })
    
  }
  
  

  totalDeVendas() {
    
    this.vendaService.qtdVenda().subscribe((response) =>{
      
      this.totalVendas = response;
      console.info("total Venda: " + this.totalVendas);
    })
   
    
  }

  totalProdutos() {
    
      this.produtosCadastrados = 150;
   
  }

  totalProdutosAtivos() {
    
      this.produtosAtivos = 100;
   
  }

  
  listSales() {
    this.vendaService.buscarVenda().subscribe((response) =>{
      this.sales = response;
         
    })
  }
}
