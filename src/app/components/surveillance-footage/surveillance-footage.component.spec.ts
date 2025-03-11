import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveillanceFootageComponent } from './surveillance-footage.component';

describe('SurveillanceFootageComponent', () => {
  let component: SurveillanceFootageComponent;
  let fixture: ComponentFixture<SurveillanceFootageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveillanceFootageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveillanceFootageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
