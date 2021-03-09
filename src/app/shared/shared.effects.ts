import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { SharedActionTypes, ShowAlert, HideAlert } from './shared.actions';
import { delay, map } from 'rxjs/operators';
import { defer, of } from 'rxjs';

@Injectable()
export class SharedEffects {

  @Effect()
  init$ = defer(() => {
    return of();
  });

  @Effect()
  showAlert$ = this.actions$.pipe(
    ofType<ShowAlert>(SharedActionTypes.ShowAlert),
    delay(5000),
    map(() => new HideAlert())
  );

  constructor(private actions$: Actions) { }
}
