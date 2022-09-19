export class AppConstants {
	
	public static get baseServidor(): string {return "http://localhost:8080/"}
	
	public static get baseLogin(): string {return this.baseServidor + "login"}
	
	public static get baseProduto(): string {return this.baseServidor + "produto/lista"}
	
	public static get baseProdutoId(): string {return this.baseServidor + "produto/busca/"}
	
	public static get CadastrarProduto(): string {return this.baseServidor + "produto/cadastrar"}
	
	public static get BaseUrlUsuario(): string{return this.baseServidor + "usuario/"}
	
	public static get baseVenda(): string {return this.baseServidor + "venda"}
	
	public static get somaVenda(): string {return this.baseVenda + "/total"}
	
	public static get qtdVenda(): string {return this.baseVenda + "/qtd"}
	
	public static get geraRelatorioVenda(): string {return this.baseVenda + "/produtos"}
	

}
