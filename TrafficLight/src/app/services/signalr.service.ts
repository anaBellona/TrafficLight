import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State } from '../traffic-light/store/reducers'

import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import * as signalrActions from '../traffic-light/store/actions/signalr.actions';
import { from, fromEvent, Observable, Subject, throwError, timer } from 'rxjs';
import { catchError, switchMap, takeUntil, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: HubConnection;
  private stopChecking$ = new Subject<void>();

  constructor(public store: Store<State>) { }

  public startConnection(): Observable<void> {
    this.initializeHubConnection();
    return this.startObservingHubConnection().pipe(
      tap(() => {
        this.hubConnection.onclose((error) => {
          this.handleConnectionClosed();
        });
      })
    );
  }
  public stream(methodName: string, args?: any): Observable<any> {
    if (!this.hubConnection) {
      return throwError('Hub connection not established');
    }

    return new Observable(observer => {
      this.hubConnection.stream(methodName, args)
        .subscribe({
          next: (item: any) => {
            observer.next(item);
          },
          complete: () => {
            observer.complete();
          },
          error: (error: any) => {
            observer.error(error);
          }
        });

      return () => {
        // Clean up the stream if needed
        // Unsubscribe from the stream
      };
    });
  }

 

  public on<T>(methodName: string): Observable<T> {
    if (!this.hubConnection) {
      return throwError('Hub connection not established');
    }

    return fromEvent<T>(this.hubConnection, methodName).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      takeUntil(fromEvent(this.hubConnection, 'close')),
      finalize(() => {
        console.log(`SignalR event '${methodName}' completed`);
      }));
  }

  public invoke<T>(methodName: string, args?: T): Observable<T> {
    if (!this.hubConnection) {
      return throwError('Hub connection not established');
    }

    return from(this.hubConnection.invoke(methodName, ...(args ? [args] : []))).pipe(
      catchError((error) => {
        return throwError(error);
      }));
  }

  private initializeHubConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubEndpoint, {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: false,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  public handleConnectionClosed(): void {
    this.store.dispatch(
      signalrActions.setConnectionStatus({
        payload: false,
      })
    );
    this.tryReconnecting().subscribe(() => { });
  }

  private tryReconnecting(): Observable<void> {
    return timer(environment.hubReconnectingTime).pipe(
      takeUntil(this.stopChecking$),
      switchMap(() => this.startObservingHubConnection())
    );
  }

  private startObservingHubConnection(): Observable<void> {
    return from(this.hubConnection.start()).pipe(
      tap(() => {
        this.store.dispatch(
          signalrActions.setConnectionStatus({
            payload: true,
          }),
        );
        this.stopChecking$.next();
      }),
      catchError((error) => {
        this.store.dispatch(
          signalrActions.setConnectionStatus({
            payload: false,
          }),
        );
        return this.tryReconnecting();
      }),
    );
  }
}

export const signalrMethods = {
  StartTrafficLight: 'StartTrafficLight',
  ReceiveLightChange: 'ReceiveLightChange',
  PushButtonEvent: 'PushButtonEvent'
}