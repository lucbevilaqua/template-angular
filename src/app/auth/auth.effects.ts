import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes, LoginError, LoginRequested, LoginSucceed, Logout } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { defer, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from './auth.reducer';
import { TokenService } from '../shared/services/token.service';
import { UtilsService } from '../shared/services/utils.service';

@Injectable()
export class AuthEffects {

  @Effect()
  init$ = defer(() => {
    const token = localStorage.getItem('auth.token');
    const user = localStorage.getItem('auth.user');

    if (token && user) {
      return of(new LoginSucceed({
        token,
        user: JSON.parse(user)
      }));
    }

    return of(new Logout({ error: '' }));
  });

  @Effect()
  loginRequested$ = this.actions$.pipe(
    ofType<LoginRequested>(AuthActionTypes.LoginRequestedAction),
    tap((action) => {
        const user = this.utilsService.encrypt({
          email: action.payload.email,
          password: action.payload.password,
          remember: action.payload.remember
        });
        localStorage.setItem('login.user', user);
    }),
    switchMap(action => this.authService.login(action.payload.email, action.payload.password).pipe(
      catchError(data => {
        return of({ error: data.message });
      })
    )),
    map((response: any) => {
      if (!response.error) {
        const token = response.data;

        this.router.navigateByUrl('/');

        return new LoginSucceed({
          token,
          user: this.tokenService.decodePayloadJWT(token)
        });
      } else {
        return new LoginError({
          error: response.error
        });
      }
    })
  );

  @Effect({ dispatch: false })
  loginSucceed$ = this.actions$.pipe(
    ofType<LoginSucceed>(AuthActionTypes.LoginSucceedAction),
    tap(action => {
      localStorage.setItem('auth.token', action.payload.token);
      localStorage.setItem('auth.user', JSON.stringify(action.payload.user));
    })
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType<LoginError>(AuthActionTypes.LoginErrorAction),
    tap(action => {
      alert(action.payload.error);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.clear();

      if (action.payload.error) {
        alert(action.payload.error);
      }

      this.router.navigateByUrl('/login');
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private utilsService: UtilsService) {}
}
