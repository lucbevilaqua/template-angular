import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  ShowLoading = '[Shared] Show Loading',
  HideLoading = '[Shared] Hide Loading',
  ShowAlert = '[Shared] Show Alert',
  HideAlert = '[Shared] Hide Alert',
}

export class ShowLoading implements Action {
  readonly type = SharedActionTypes.ShowLoading;
}

export class HideLoading implements Action {
  readonly type = SharedActionTypes.HideLoading;
}

export class ShowAlert implements Action {
  readonly type = SharedActionTypes.ShowAlert;

  constructor(public payload: string) { }
}

export class HideAlert implements Action {
  readonly type = SharedActionTypes.HideAlert;
}

export type SharedActions = ShowLoading |
                            HideLoading |
                            ShowAlert |
                            HideAlert;
