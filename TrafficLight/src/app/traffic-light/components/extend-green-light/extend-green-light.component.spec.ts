import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendGreenLightComponent } from './extend-green-light.component';

describe('ExtendGreenLightComponent', () => {
  let component: ExtendGreenLightComponent;
  let fixture: ComponentFixture<ExtendGreenLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendGreenLightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendGreenLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
