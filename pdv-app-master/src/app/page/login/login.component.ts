import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from 'src/app/service/login-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
   constructor(private loginServiceService: LoginServiceService, private router: Router){}
  usuario ={nome:'', senha:''};


  public login(){
   
   localStorage.clear();
   this.loginServiceService.login(this.usuario);

  }

  ngOnInit(): void {
    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !==null){

      this.router.navigate(["home"]);
      
    }
  }

}
