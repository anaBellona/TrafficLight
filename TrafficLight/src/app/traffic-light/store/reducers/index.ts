import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as fromSignalr from './signalr.reducer'


export interface State {
    signalr: fromSignalr.State;
}

export const reducers: ActionReducerMap<State> = {
    signalr: fromSignalr.reducer
};

/**
* SignalR Reducers
*/

export const selectSignalRState = createFeatureSelector<fromSignalr.State>(
    'signalr'
);

export const getSignalRConnection = createSelector(selectSignalRState, fromSignalr.getSignalRStatus);
