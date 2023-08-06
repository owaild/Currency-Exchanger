import { HttpErrorResponse, HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {


    let tokenizedRquest = request.clone({
      setParams: {
        access_key: environment.ApiKey,
      }

    });




    return next.handle(tokenizedRquest)
    // .pipe(catchError((err: any) => {

    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status === 401) {
    //       localStorage.clear()
    //       location.href = location.origin;
    //     }
    //     return throwError(err);
    //   }
    // }));
  }
}
