import { SharedActions, SharedActionTypes } from './shared.actions';

export interface SharedState {
  counterPendingRequests: number;
  showAlert: boolean;
  messageAlert: string;
  requestProgress: number;
}

export const initialState: SharedState = {
  counterPendingRequests: 0,
  showAlert: false,
  messageAlert: '',
  requestProgress: null
};

export function reducer(state = initialState, action: SharedActions): SharedState {
  switch (action.type) {
    case SharedActionTypes.ShowLoading:
      return { ...state, counterPendingRequests: state.counterPendingRequests + 1 };
    case SharedActionTypes.HideLoading:
      return { ...state, counterPendingRequests: state.counterPendingRequests - 1 };
    case SharedActionTypes.ShowAlert:
      return { ...state, showAlert: true, messageAlert: action.payload };
    case SharedActionTypes.HideAlert:
      return { ...state, showAlert: false, messageAlert: null };
    case SharedActionTypes.RequestProgress:
      return { ...state, requestProgress: action.payload };
    case SharedActionTypes.SaveList:
      state[action.payload.key] = action.payload.list;
      return state;
    default:
      return state;
  }
}
