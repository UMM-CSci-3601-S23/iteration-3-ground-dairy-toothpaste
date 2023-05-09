import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientFormComponent } from './form-client.component';
import { FormService } from './form.service';
import { MockFormService } from 'src/testing/form.service.mock';
import { Observable } from 'rxjs';
import { forwardRef } from '@angular/core';
import { VolunteerForm } from './form';



describe('ClientFormComponent', () => {
  let testComponent: ClientFormComponent;
  let volunteerForm: VolunteerForm;
  let formGroup: FormGroup;
  let fixture: ComponentFixture<ClientFormComponent>;
  const service: MockFormService = new MockFormService();
  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  beforeEach(() => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ClientFormComponent],
      providers: [{provide: FormService, useValue: service}, {provide: MatSnackBar, useValue: snackbarModuleStub},
      {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => volunteerForm),
      multi: true,}],
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    formGroup = testComponent.shoppingForm;
    expect(formGroup).toBeDefined();
    expect(formGroup.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(testComponent).toBeTruthy();
    expect(formGroup).toBeTruthy();
  });

  it('should not get angwy when we add stuffs', () => {
    testComponent.submitForm();
    expect(service.addedFormRequests.length).toBe(1);
  });

});


describe('ClientFormComponent but it\'s bwoken', () => {
  let testComponent: ClientFormComponent;
  let formGroup: FormGroup;
  let fixture: ComponentFixture<ClientFormComponent>;
  let volunteerForm: VolunteerForm;
  // const service: MockFormService = new MockFormService();
  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let service: {
    addForm: (value) => Observable<string>;
  };

  beforeEach(() => {
    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    service = {
      addForm: (_) => new Observable(observer => {
        observer.error('addForm() Observer generates an error');
      })
    };
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ClientFormComponent],
      providers: [{provide: FormService, useValue: service}, {provide: MatSnackBar, useValue: snackbarModuleStub},
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => volunteerForm),
          multi: true,}],
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    formGroup = testComponent.shoppingForm;
    expect(formGroup).toBeDefined();
    expect(formGroup.controls).toBeDefined();
  });

  it('it should get angy', () => {
    snackbarModuleStub.called = false;
    testComponent.submitForm();
    expect(snackbarModuleStub.called).toBeTruthy();
  });

});
