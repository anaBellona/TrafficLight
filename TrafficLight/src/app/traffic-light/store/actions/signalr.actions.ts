import { createAction, props } from '@ngrx/store';

export const setConnectionStatus = createAction('[SignalR] Set Connection Status',props<{ payload: boolean }>());
