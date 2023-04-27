import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestHelpComponent } from './new-request-help.component';

describe('NewRequestHelpComponent', () => {
  let component: NewRequestHelpComponent;
  let fixture: ComponentFixture<NewRequestHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequestHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequestHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
