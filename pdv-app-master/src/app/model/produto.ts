import {Estoque} from "./estoque";

export class Produto {
	
	codigo: number;
	descricao: string;
	marca: string;
	referencia: string;
	cdgbarras: string;
	precoCompra: any;
	precoVenda: any;
	status: any;
	lucro: any;
	estoque: Estoque;
	
	
    constructor(){};
	
}
