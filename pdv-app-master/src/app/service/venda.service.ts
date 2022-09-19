import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }
  
  
  salvarVenda(venda: any): Observable<any>{
    return this.http.post<any>(AppConstants.baseVenda + "/",venda);
  }
  
  buscarVenda(): Observable<any>{
    return this.http.get<any>(AppConstants.baseVenda +"/");
  }
  
  somaVenda(): Observable<any>{
    return this.http.get<any>(AppConstants.somaVenda);
  }
  
  qtdVenda(): Observable<any>{
    return this.http.get<any>(AppConstants.qtdVenda);
  }
  
  relatorioVenda(): Observable<any>{
    return this.http.get<any>(AppConstants.geraRelatorioVenda);
  }
  
}
