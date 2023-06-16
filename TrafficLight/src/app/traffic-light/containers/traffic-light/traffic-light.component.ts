import { Component, OnInit } from '@angular/core';
import { SignalRService, signalrMethods } from '../../../services/signalr.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.scss']
})
export class TrafficLightComponent implements OnInit {

  subscriber!: Subscription;  
  constructor(private signalrService: SignalRService) { }
  public lightColor: string = ''; 

 
  stopTrafficLight(): void {
    
  }

  startTrafficLight(): void {
    console.log('startTrafficLight');
    this.signalrService.stream(signalrMethods.StartTrafficLight, { Started: true })
      .subscribe(state => {
        console.log(state);
        this.lightColor = state as string;
      });
  }

  extendGreenLight(): void {
    
  }
 
  ngOnInit() {
    
  }
}
