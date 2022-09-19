import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppConstants} from '../app-constants';
import{Router} from '@angular/router';
import {UsuarioService} from 'src/app/service/usuario.service';
import {Usuario} from 'src/app/model/usuario';
import {Authorities} from 'src/app/model/authorities';
import {GuardiaoGuard} from 'src/app/service/guardiao.guard';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  	
  	user: any;
    usuario = new Usuario();
  
   constructor(private http: HttpClient, private router: Router,private userService: UsuarioService,private gard: GuardiaoGuard) { }

	

    login(usuario: any){
      
      console.log(JSON.stringify(usuario));
       
       return this.http.post(AppConstants.baseLogin ,JSON.stringify(usuario)).subscribe(data => {

          /*Retorno Http*/ 
          var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
		  console.log(token);	
          localStorage.setItem("token", token);
          localStorage.setItem("nomeUser", usuario.nome);
          
          this.user = localStorage.getItem('nomeUser');
    
          this.userService.consultarUser(this.user).subscribe((data) =>{
          this.usuario = data;
          
          	for (var item in this.usuario.authorities) {
			   
			   localStorage.setItem('nomeRole', this.usuario.authorities[item].nomeRole);

		   }
          
      
           })
           
		  
          
          this.router.navigate(['sale']);


       },
         error => {
      
          console.error("Erro ao fazer login ");
          alert('Acesso Negado!')
         }
       );
    }
    
    
    
}
