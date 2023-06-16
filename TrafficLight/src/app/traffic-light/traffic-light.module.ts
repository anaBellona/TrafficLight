import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLightsRoutes } from './traffic-light-routing.module';
import { containers } from './containers';
import { components } from './components';

@NgModule({
  declarations: [
    ...containers,
    ...components
  ],
  imports: [
    CommonModule,
    TrafficLightsRoutes
  ]
})
export class TrafficLightModule { }
