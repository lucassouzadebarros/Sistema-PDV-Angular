export class Estoque {
	
	id: number;
	qtde: any;
	qtde_minima: any;
	
	construvtor(id: any, qtde: any, qtde_minima: any){
		
		this.id = id;
		this.qtde = qtde;
		this.qtde_minima = qtde_minima;
	}
}
