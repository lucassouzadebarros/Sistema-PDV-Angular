import { Authorities } from "./authorities";

export class Usuario {
	
	id: number;
	nome: string;
	senha: string;
	email: string;
	nivel: any;
	status: any;
	authorities: Array<Authorities>;
	
	constructor(){}
	
}


