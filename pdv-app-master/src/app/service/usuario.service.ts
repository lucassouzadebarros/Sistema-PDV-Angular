import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   constructor(private http: HttpClient,private router: Router) {
  }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.BaseUrlUsuario);
  }

  getStudant(id: number): Observable<any> {
    return this.http.get<any>(AppConstants.BaseUrlUsuario + id);
    
  }

   salvarUsuario(user: any): Observable<any> {
    return this.http.post<any>(AppConstants.BaseUrlUsuario, user );
  }

  updateUsuario(user: any): Observable<any> {
    return this.http.put<any>(AppConstants.BaseUrlUsuario, user);
  }


  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.BaseUrlUsuario + id, { responseType: 'text' });
  }


  //http://localhost:8080/cursospringrestapi/usuario/usuarioPorNome/alex
  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.BaseUrlUsuario + "usuarioPorNome/" + nome);

  }
  
  consultarRole(id: number): Observable<any> {
    return this.http.get(AppConstants.BaseUrlUsuario + "role/" + id);

  }
  
  userlogado(){
    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !==null){

      return true;
      
    }else{
      return false;
    }
  }
}
