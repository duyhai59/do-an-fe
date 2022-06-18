import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {TokenStorage} from './token-storage.service';
import {Router} from '@angular/router';

@Injectable()
export class InterceptService implements HttpInterceptor {

  constructor(private injector: Injector,
              private authService: AuthService,
              private tokenStorage: TokenStorage,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('auth/') > -1) {
      return next.handle(request);
    }
    console.log(request);
    return next.handle(request).pipe(
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
          console.log(error);
          if (error.status === 401 /*|| 504*/) {
            this.handleAuthError();
          }
          throw error;
        }
      ),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleAuthError() {
    this.authService.logout();
    this.router.navigate(['/auth/']);
  }
}
