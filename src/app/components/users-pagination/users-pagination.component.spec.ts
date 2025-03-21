import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPaginationComponent } from './users-pagination.component';

describe('UsersPaginationComponent', () => {
  let component: UsersPaginationComponent;
  let fixture: ComponentFixture<UsersPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
