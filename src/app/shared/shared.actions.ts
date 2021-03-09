import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  ShowLoading = '[Shared] Show Loading',
  HideLoading = '[Shared] Hide Loading',
  RequestProgress = '[Shared] Request Progress',
  ShowAlert = '[Shared] Show Alert',
  HideAlert = '[Shared] Hide Alert',
  AddList = '[Shared] Add List',
  SaveList = '[Shared] Save List'
}

export class ShowLoading implements Action {
  readonly type = SharedActionTypes.ShowLoading;
}

export class HideLoading implements Action {
  readonly type = SharedActionTypes.HideLoading;
}

export class RequestProgress implements Action {
  readonly type = SharedActionTypes.RequestProgress;

  constructor(public payload: number) { }
}

export class ShowAlert implements Action {
  readonly type = SharedActionTypes.ShowAlert;

  constructor(public payload: string) { }
}

export class HideAlert implements Action {
  readonly type = SharedActionTypes.HideAlert;
}

export class AddList implements Action {
  readonly type = SharedActionTypes.AddList;

  constructor(public payload: { key: string, request: any}) { }
}

export class SaveList implements Action {
  readonly type = SharedActionTypes.SaveList;

  constructor(public payload: { key: string, list: any }) { }
}
export type SharedActions = ShowLoading |
                            HideLoading |
                            RequestProgress |
                            ShowAlert |
                            HideAlert |
                            AddList |
                            SaveList;
