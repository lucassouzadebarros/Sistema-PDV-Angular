import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  
  constructor() { }
  
  

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

	
	
    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');
      console.info('Authorization', token);
      const tokenRequest = req.clone({
        
        headers : req.headers.set('Authorization', token)
        
      });

      return next.handle(tokenRequest);
    } else {
      return next.handle(req);
    }

  }



  
  

}
@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}