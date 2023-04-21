import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRequestComponent } from './detailed-request.component';

describe('DetailedRequestComponent', () => {
  let component: DetailedRequestComponent;
  let fixture: ComponentFixture<DetailedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
