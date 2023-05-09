
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Form, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { FormVolunteerComponent } from './form-volunteer.component';
import { FormService } from './form.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockFormService } from 'src/testing/form.service.mock';



const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];


describe('Volunteer Form View', () => {
  let formVolunteerList: FormVolunteerComponent;
  let fixture: ComponentFixture<FormVolunteerComponent>;
  const service = new MockFormService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [FormVolunteerComponent],
      providers: [{ provide: FormService, useValue: service }]
    });
  });

  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FormVolunteerComponent);
      formVolunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('doesn\'t get all angy when we ask for stuff', () => {
    formVolunteerList.getFormsFromServer();
    expect(service.wasGot).toBeTruthy();
  });
});

describe('Misbehaving Volunteer view', () => {
  let formVolunteerList: FormVolunteerComponent;
  let fixture: ComponentFixture<FormVolunteerComponent>;

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let formServiceStub: {
    getForms: () => Observable<Form[]>;
  };

  beforeEach(() => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    formServiceStub = {
      getForms: () => new Observable(observer => {
        observer.error('getForms() Observer generates an error');
      }),
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [FormVolunteerComponent],
      providers: [{ provide: FormService, useValue: formServiceStub },
                  { provide: MatSnackBar, useValue: snackbarModuleStub }]
    });
  });

  it('generates an error if we don\'t set up a FormVolunteerService', () => {
    expect(formVolunteerList).toBeUndefined();
  });
});

describe('Misbehaving Form Service', () => {
  let formVolunteerList: FormVolunteerComponent;
  let fixture: ComponentFixture<FormVolunteerComponent>;

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let formServiceStub: {
    getAllForms: () => Observable<Form[]>;
  };

  beforeEach(() => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    formServiceStub = {
      getAllForms: () => new Observable(observer => {
        observer.error('getAllForms() Observer generates an error');
      }),
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [FormVolunteerComponent],
      providers: [{ provide: FormService, useValue: formServiceStub },
                  { provide: MatSnackBar, useValue: snackbarModuleStub }]
    });
  });

  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FormVolunteerComponent);
      formVolunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should open the snackbar due to erroring out', () => {
    formVolunteerList.getFormsFromServer();
    expect(snackbarModuleStub.called).toBeTruthy();
  });
});


/*
describe('makeFormsReadable works as expected', ()=>{
  let formVolunteerList: FormVolunteerComponent;
  let fixture: ComponentFixture<FormVolunteerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [FormVolunteerComponent],
      providers: [{ provide: FormService, useValue: new MockFormService() }]
    });
  });

  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FormVolunteerComponent);
      formVolunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));
});*/
