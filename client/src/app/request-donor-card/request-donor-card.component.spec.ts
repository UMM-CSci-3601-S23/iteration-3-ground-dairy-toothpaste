import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDonorCardComponent } from './request-donor-card.component';

describe('RequestDonorCardComponent', () => {
  let component: RequestDonorCardComponent;
  let fixture: ComponentFixture<RequestDonorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDonorCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDonorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
