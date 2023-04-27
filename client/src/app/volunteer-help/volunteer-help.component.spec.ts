import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerHelpComponent } from './volunteer-help.component';

describe('VolunteerHelpComponent', () => {
  let component: VolunteerHelpComponent;
  let fixture: ComponentFixture<VolunteerHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
