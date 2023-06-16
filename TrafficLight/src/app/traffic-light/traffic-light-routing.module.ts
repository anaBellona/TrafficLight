import { Routes, RouterModule } from '@angular/router';

import * as containers from './containers';

const routes: Routes = [
  {
    path: '',
    component: containers.TrafficLightComponent    
  }
];

export const TrafficLightsRoutes = RouterModule.forChild(routes);
