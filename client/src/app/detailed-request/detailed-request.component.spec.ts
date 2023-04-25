import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRequestComponent } from './detailed-request.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { RequestService } from '../requests/request.service';
import { MockRequestService } from 'src/testing/request.service.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Request } from '../requests/request';

describe('DetailedRequestComponent', () => {
  let component: DetailedRequestComponent;
  let fixture: ComponentFixture<DetailedRequestComponent>;

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let routerStub: {
    navigate: (path: string[]) => void;
    routedTo: string;
  };

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    id : '1_id'
  });

  let mockRequestService = new MockRequestService();

  beforeEach(async () => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    routerStub = {
      navigate: (path) => {
        routerStub.routedTo = path.join('');
      },
      routedTo: ''
    };

    mockRequestService = new MockRequestService();

    await TestBed.configureTestingModule({
      declarations: [ DetailedRequestComponent ],
      providers: [{provide: MatSnackBar, useValue: snackbarModuleStub}, { provide: RequestService, useValue: mockRequestService },
        { provide: ActivatedRoute, useValue: activatedRoute }, { provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRequestComponent);
    component = fixture.componentInstance;
    component.setRequestValues(MockRequestService.testRequests[1]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to set requests', () => {
    component.setRequestValues(MockRequestService.testRequests[0]);
    expect(component.request).toBe(MockRequestService.testRequests[0]);
  });

  it('should properly delete requests', () => {
    component.deleteRequest(MockRequestService.testRequests[0]);
    expect(mockRequestService.deletedDonorRequests.length).toBe(1);
    expect(mockRequestService.deletedDonorRequests[0]).toBe(MockRequestService.testRequests[0]);
    expect(routerStub.routedTo).toEqual('/requests/donor');
  });
});


describe('Misbehaving request service', () => {
  let component: DetailedRequestComponent;
  let fixture: ComponentFixture<DetailedRequestComponent>;

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let routerStub: {
    navigate: (path: string[]) => void;
    routedTo: string;
  };

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    id : '1_id'
  });

  let requestServiceStub: {
    deleteDonorRequest: () => Observable<object>;
    getDonorRequestById: () => Observable<Request>;
  };
  beforeEach(async () => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    requestServiceStub = {
      getDonorRequestById: () => new Observable(observer => {
        observer.error('getDonorRequestById() Observer generates an error');
      }),
      deleteDonorRequest: () => new Observable(observer => {
        observer.error('deleteDonorRequest() Observer generates an error');
      })
    };

    routerStub = {
      navigate: (path) => {
        routerStub.routedTo = path.join('');
      },
      routedTo: ''
    };

    await TestBed.configureTestingModule({
      declarations: [ DetailedRequestComponent ],
      providers: [{provide: MatSnackBar, useValue: snackbarModuleStub}, { provide: RequestService, useValue: requestServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute }, { provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRequestComponent);
    component = fixture.componentInstance;
    component.setRequestValues(MockRequestService.testRequests[1]);
    fixture.detectChanges();
  });

  it('should open the snackbar to present an error', () => {
    expect(snackbarModuleStub.called).toBeTrue();
  });
});


describe('Partially Misbehaving request service', () => {
  let component: DetailedRequestComponent;
  let fixture: ComponentFixture<DetailedRequestComponent>;

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let routerStub: {
    navigate: (path: string[]) => void;
    routedTo: string;
  };

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    id : '1_id'
  });

  let requestServiceStub: {
    deleteDonorRequest: () => Observable<object>;
    getDonorRequestById: () => Observable<Request>;
  };
  beforeEach(async () => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    requestServiceStub = {
      getDonorRequestById: () => of(MockRequestService.testRequests[0]),
      deleteDonorRequest: () => new Observable(observer => {
        observer.error('deleteDonorRequest() Observer generates an error');
      })
    };

    routerStub = {
      navigate: (path) => {
        routerStub.routedTo = path.join('');
      },
      routedTo: ''
    };

    await TestBed.configureTestingModule({
      declarations: [ DetailedRequestComponent ],
      providers: [{provide: MatSnackBar, useValue: snackbarModuleStub}, { provide: RequestService, useValue: requestServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute }, { provide: Router, useValue: routerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRequestComponent);
    component = fixture.componentInstance;
    component.setRequestValues(MockRequestService.testRequests[1]);
    fixture.detectChanges();
  });

  it('it should not open the snackbar to present an error before deleting', () => {
    expect(snackbarModuleStub.called).toBeFalse();
  });

  it('it should open the snackbar to present an error after deleting', () => {
    component.deleteRequest(MockRequestService.testRequests[0]);
    expect(snackbarModuleStub.called).toBeTrue();
  });
});

