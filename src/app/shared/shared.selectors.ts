import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.reducer';

export const selectSharedState = createFeatureSelector<SharedState>('shared');

export const selectLoading = createSelector(
  selectSharedState,
  state => state.counterPendingRequests > 0
);

export const selectShowAlert = createSelector(
  selectSharedState,
  state => state.showAlert
);

export const selectMessageAlert = createSelector(
  selectSharedState,
  state => state.messageAlert
);
