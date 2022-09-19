import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }
  
  getProdutoList(): Observable<any>{
    return this.http.get<any>(AppConstants.baseProduto);
  }
  
  getProdutoId(id: any): Observable<any>{
    return this.http.get<any>(AppConstants.baseProdutoId + id);
  }
  
  salvarProduto(usuario: any): Observable<any>{
    return this.http.post<any>(AppConstants.CadastrarProduto,usuario);
  }
  
}
