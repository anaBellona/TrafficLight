import { ConnectionStatus } from '../../models/connection-status';
import { createReducer, on } from '@ngrx/store';
import * as signalrActions from '../actions/signalr.actions';

export interface State {
    signalrStatus: ConnectionStatus
  }

export const initialState: State = {
    signalrStatus: { connected: true, setUpdateRequired: false } as ConnectionStatus,
};

export const reducer = createReducer(
    initialState,
    on(signalrActions.setConnectionStatus, (state, { payload }) => {
        state.signalrStatus.connected = payload;
        return { ...state };
    })
);

export const getSignalRStatus = (state: State) => state.signalrStatus.connected;