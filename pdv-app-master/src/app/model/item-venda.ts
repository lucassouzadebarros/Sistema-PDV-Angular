export class ItemVenda {
	
	id: number;
	valorUnt: any;
	subtotal: any;
	qtde: any;
	produto: any;
	
	constructor(id: any, produto: any, valorUnt: any, subtotal: any, qtde: number) {
        this.id = id;
        this.produto = produto;
        this.valorUnt = valorUnt;
        this.subtotal = subtotal;
        this.qtde = qtde;
    }
}
