import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { SignalRService } from './services/signalr.service';

import { StoreModule } from '@ngrx/store';

// Reducers
import { reducers } from '../app/traffic-light/store/reducers';
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    })
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (signalrService: SignalRService) => () => {
      const connection$ = from(signalrService.startConnection());
      connection$.subscribe(() => {
      }, (error) => {
        console.error(`Error in SignalRService.app(): ${error}`);
        signalrService.handleConnectionClosed();
      });
    },
    deps: [SignalRService],
    multi: true,
  },SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
