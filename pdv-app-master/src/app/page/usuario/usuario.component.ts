import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Usuario} from 'src/app/model/usuario';
import {UsuarioService} from 'src/app/service/usuario.service';
import {Observable} from 'rxjs';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


usuario = new Usuario();
usuarios: Observable<Usuario[]>;
usuarios2: Usuario[] = [];
formulario: FormGroup;
ordemColunasTabela = ['id', 'name', 'status','email', 'excluir', 'editar'];
totalElementos = 0;
pagina = 0;
tamanho = 5;
pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
mensagemErros: String[] = []; //array de strings dos erros retornados do backend


  constructor(
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UsuarioService,
  ) { }
  
  

  ngOnInit(): void {
    this.montarFormulario();
    this.listarUsuario();
    
  }
  
  
  
  
  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("chamou update");
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data =>{
        this.novo(); 
        console.info("chamou save");
      });
    }
  }

  novo (){
    this.usuario = new Usuario();
  }
  
  
  
  montarFormulario() {
    
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, Validators.nullValidator],
      name: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      senha: [null, [Validators.minLength(3), Validators.maxLength(100)]],
      status: [null, Validators.required],
      teste: [null, [Validators.minLength(1), Validators.maxLength(100)]],
      
    })
  }
  
  listarUsuario() {
  	this.userService.getStudentList().subscribe((data) =>{
      
      this.usuarios = data;
      this.usuarios2 = data;
      
      console.info(this.usuarios);
      this.totalElementos = 10;// pegar o total de elementos
      this.pagina = 5;// pegar o numero de paginas
    });
  
  }
  
  limparFormulario() {
    this.formulario.reset();
  }

 editar(id: number){
   this.userService.getStudant(id).subscribe((data) =>{
     this.usuario = data
     this.formulario.controls.id.setValue(this.usuario.id);
     this.formulario.controls.name.setValue(this.usuario.nome);
     this.formulario.controls.email.setValue(this.usuario.email);
     this.formulario.controls.senha.setValue(this.usuario.senha);
     
     
   });
 }
 
 
 
submit() {
    //pegar os dados do formulário
    const formValues = this.formulario.value;
    // cria e adiciona no objeto
    const usuario: Usuario = new Usuario();
      
    usuario.id = formValues.id;
    usuario.nome = formValues.name;
    usuario.senha = formValues.senha;
    usuario.email =  formValues.email;
    usuario.status =  formValues.status;
    usuario.nivel =   formValues.teste;
    
    this.userService.consultarRole(formValues.teste).subscribe((response) =>{
      
      usuario.authorities = response;
      
    })

 if (usuario.id !== null) {
   console.info("Meu ID é DIferente de NULL" + " " + usuario.id);
	this.userService.salvarUsuario(usuario).subscribe((data) =>{
    
     this.snackBar.open('Produto alterado com sucesso!', 'Sucesso', {
          duration: 2000
        })
        
        this.listarUsuario();
        this.limparFormulario();
    	this.formulario.reset();
  
    
   },errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
	}
	else{
        this.userService.salvarUsuario(usuario).subscribe((data) =>{
    
     this.snackBar.open('Produto cadastrado com sucesso!', 'Sucesso', {
          duration: 2000
        })
       this.listarUsuario();
       this.formulario.reset();
    
  }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {duration: 2000})
        }  
        
      )
    }
   
  }
  
 
 
 
//chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      // se clicar em ok chama evento de excluir
      if (result) {
        //this.excluir(id);
      }
    });
  }
}
