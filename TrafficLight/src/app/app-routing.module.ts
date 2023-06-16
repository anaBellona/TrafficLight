import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/containers';

const routes: Routes = [
  { path: '',
    component:TrafficLightComponent , 
    pathMatch: 'full'
  },
  {
    path: 'traffic',
    loadChildren: () => import('./traffic-light/traffic-light.module').then(m => m.TrafficLightModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
