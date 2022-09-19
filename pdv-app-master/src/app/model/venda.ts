import {ItemVenda} from './item-venda';

export class Venda {
	
	id: number;
	dataVenda: any;
	total: any;
	itemVendas: ItemVenda[] = [];
	mesRef: any;
	formaPagamento: any;
	
	constructor(id: any, total:any, itemVendas: ItemVenda[] = [], formaPagamento: any){
		this.id = id;
		this.total = total;
		this.itemVendas = itemVendas;
		this.formaPagamento = formaPagamento;
	}
	
	
}
