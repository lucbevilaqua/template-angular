import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { SharedState } from './shared/shared.reducer';
import { State, select } from '@ngrx/store';
import { selectLoading, selectShowAlert } from './shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showLoading$ = this.state.pipe(select(selectLoading));

  constructor(private config: NgSelectConfig, private state: State<SharedState>) {
    this.config.notFoundText = 'Nenhum dado encontrado';
    this.config.disableVirtualScroll = false;
  }
}
