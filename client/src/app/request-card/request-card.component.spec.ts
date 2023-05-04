import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCardComponent } from './request-card.component';
import { MockRequestService } from 'src/testing/request.service.mock';
import { Request } from '../requests/request';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the delete callback', () => {
    let called = false;
    let calledWith: Request;
    component.request = MockRequestService.testRequests[0];
    component.deleteCallback = (req) => { called = true; calledWith = req; };

    expect(called).toBeFalse();
    expect(calledWith).toBeUndefined();

    component.deleteRequest();

    expect(called).toBeTrue();
    expect(calledWith).toEqual(component.request);
  });

  it('should call the post callback', () => {
    let called = false;
    let calledWith: Request;
    component.request = MockRequestService.testRequests[0];
    component.postCallback = (req) => { called = true; calledWith = req; };

    expect(called).toBeFalse();
    expect(calledWith).toBeUndefined();

    component.postRequest();

    expect(called).toBeTrue();
    expect(calledWith).toEqual(component.request);
  });
});
