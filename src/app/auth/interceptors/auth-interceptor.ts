import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAuthToken } from '../auth.selectors';
import { catchError, finalize } from 'rxjs/operators';
import { Logout } from '../auth.actions';
import { SharedState } from 'src/app/shared/shared.reducer';
import { ShowLoading, HideLoading } from 'src/app/shared/shared.actions';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  authToken: string;

  constructor(private store: Store<AppState>, private sharedStore: Store<SharedState>, private alertService: AlertService) {
    store.pipe(select(selectAuthToken)).subscribe(token => {
      this.authToken = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth/')) {
      setTimeout(() => this.sharedStore.dispatch(new ShowLoading()), 0);

      let request: Observable<HttpEvent<any>>;
      if (this.authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authToken}`
          }
        });
        request = next.handle(authReq);
      } else {
        request = next.handle(req);
      }

      return request.pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          let message;

          if (errorResponse.status === 401) {
            this.store.dispatch(new Logout({ error: 'Efetue login para continuar' }));
          }

          if (errorResponse.status === 500) {
            message = 'Ocorreu um erro no servidor, por favor tente novamente mais tarde.';
          }

          if (errorResponse.status === 400) {
            message = errorResponse.error.message ? errorResponse.error.message : Object.values(errorResponse.error.errors)[0][0];
          }

          if (errorResponse.error.message) {
            message = errorResponse.error.message;
          }

          this.alertService.error(message, 5000);

          return throwError(errorResponse);
        }),
        finalize(() => {
          this.sharedStore.dispatch(new HideLoading());
        })
      );
    }

    return next.handle(req);
  }

}
