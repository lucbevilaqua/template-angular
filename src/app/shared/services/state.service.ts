import { Injectable } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { selectList, selectItemShared } from '../shared.selectors';
import { SharedState } from '../shared.reducer';
import { map } from 'rxjs/operators';
import { ComboService } from './combo.service';
import { SaveList } from '../shared.actions';
import { AuthState } from 'src/app/auth/auth.reducer';
import { selectItemAuth } from 'src/app/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private state: State<SharedState>,
              private store: Store<SharedState>,
              private stateAuth: State<AuthState>,
              private comboService: ComboService
  ) { }

  getItemStoreShared(key: string) {
    return this.state.pipe(select(selectItemShared, key));
  }

  getItemStoreAuth(key: string) {
    return this.stateAuth.pipe(select(selectItemAuth, key));
  }

  getList(key: string) {
    return this.state.pipe(select(selectList, key));
  }

  requestList(payload) {
    this.comboService[payload.request]().pipe(
      map((response: any) => {
        this.store.dispatch(new SaveList({ list: response.data, key: payload.key }));
      })
    ).toPromise();
  }
}
