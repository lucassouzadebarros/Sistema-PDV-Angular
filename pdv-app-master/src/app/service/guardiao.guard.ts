import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from 'src/app/service/usuario.service';
import {Usuario} from 'src/app/model/usuario';
import {Authorities} from 'src/app/model/authorities';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardiaoGuard implements CanActivate {
  
  user: any;
  usuario = new Usuario();
  
  constructor(private userService: UsuarioService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.userService.userlogado();
  }
  
}
