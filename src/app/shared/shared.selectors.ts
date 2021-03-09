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

export const selectRequestProgress = createSelector(
  selectSharedState,
  state => state.requestProgress
);

export const selectItemShared = createSelector(
  selectSharedState,
  (state, props) => state[props]
);

export const selectList = createSelector(
  selectSharedState,
  (state, props) => state[props]
);
