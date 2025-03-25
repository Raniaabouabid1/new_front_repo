import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDeleteModalComponent } from './section-delete-modal.component';

describe('SectionDeleteModalComponent', () => {
  let component: SectionDeleteModalComponent;
  let fixture: ComponentFixture<SectionDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
