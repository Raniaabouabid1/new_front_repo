import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDeleteModalComponent } from './camera-delete-modal.component';

describe('CameraDeleteModalComponent', () => {
  let component: CameraDeleteModalComponent;
  let fixture: ComponentFixture<CameraDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
