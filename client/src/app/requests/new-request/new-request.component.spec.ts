import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockRequestService } from 'src/testing/request.service.mock';;
import { RequestService } from '../request.service';
import { NewRequestComponent } from './new-request.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RequestVolunteerComponent } from '../request-volunteer.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UrlSegment } from '@angular/router';

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

describe('NewRequestComponent', () => {
  let newRequestComponent: NewRequestComponent;
  let newRequestForm: FormGroup;
  let fixture: ComponentFixture<NewRequestComponent>;
  const service: MockRequestService = new MockRequestService();
  let dialogStub: {
    open: (stuff) => void;
    calledWith: any;
  };

  beforeEach(waitForAsync(() => {
    dialogStub = {
      open: (stuff) => { dialogStub.calledWith = stuff; },
      calledWith: undefined
    };

    TestBed.overrideProvider(RequestService, { useValue: service });
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
      declarations: [NewRequestComponent],
      providers: [{ provide: RequestService, useValue: service },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [
                { path: 'some-path' },
                { path: 'volunteer' }
              ],
              paramMap: convertToParamMap({ id: '123' })
            }
          }
        },
      { provide: MatDialog, useValue: dialogStub }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestComponent);
    newRequestComponent = fixture.componentInstance;
    fixture.detectChanges();
    newRequestForm = newRequestComponent.newRequestForm;
    expect(newRequestForm).toBeDefined();
    expect(newRequestForm.controls).toBeDefined();
  });


  it('should return false if route snapshot url length is less than 2', () => {
    newRequestComponent.route.snapshot.url = [new UrlSegment ('requests', {})];
    expect(newRequestComponent.onPage()).toBe(false);
  });

  it('should return true if route snapshot url has "volunteer" as the second path', () => {

    newRequestComponent.route.snapshot.url = [ new UrlSegment('requests', {}), new UrlSegment('volunteer', {})];
    expect(newRequestComponent.onPage()).toBe(true);

  });

  // Not terribly important; if the component doesn't create
  // successfully that will probably blow up a lot of things.
  // Including it, though, does give us confidence that our
  // our component definitions don't have errors that would
  // prevent them from being successfully constructed.
  it('should create the component and form', () => {
    expect(newRequestComponent).toBeTruthy();
    expect(newRequestForm).toBeTruthy();
  });

  // Confirms that an initial, empty form is *not* valid, so
  // people can't submit an empty form.
  it('form should be invalid when empty', () => {
    expect(newRequestForm.valid).toBeFalsy();
  });

  it('should be able to open the dialog', () => {
    expect(dialogStub.calledWith).toBeUndefined();
    newRequestComponent.openDialog();
    expect(dialogStub.calledWith).toBeDefined();
  });

  describe('The description field', () => {
    let descControl: AbstractControl;

    beforeEach(() => {
      descControl = newRequestComponent.newRequestForm.controls.description;
    });

    it('should not allow empty descriptions', () => {
      descControl.setValue('');
      expect(descControl.valid).toBeFalsy();
    });

    it('should not descriptions with less than 5 chars', () => {
      descControl.setValue('tysm');
      expect(descControl.valid).toBeFalsy();
    });

    it('should be fine with "Nature valley bars"', () => {
      descControl.setValue('Nature valley bars');
      expect(descControl.valid).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long descriptions', () => {
      descControl.setValue('x'.repeat(400));
      expect(descControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(descControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the description', () => {
      descControl.setValue('Bad2Th3B0ne');
      expect(descControl.valid).toBeTruthy();
    });
  });

  describe('The itemType field', () => {
    let itemTypeControl: AbstractControl;

    beforeEach(() => {
      itemTypeControl = newRequestForm.controls.itemType;
    });

    it('should not allow empty values', () => {
      itemTypeControl.setValue('');
      expect(itemTypeControl.valid).toBeFalsy();
      expect(itemTypeControl.hasError('required')).toBeTruthy();
    });

    it('should allow "food"', () => {
      itemTypeControl.setValue('food');
      expect(itemTypeControl.valid).toBeTruthy();
    });

    it('should allow "toiletries"', () => {
      itemTypeControl.setValue('toiletries');
      expect(itemTypeControl.valid).toBeTruthy();
    });

    it('should allow "other"', () => {
      itemTypeControl.setValue('other');
      expect(itemTypeControl.valid).toBeTruthy();
    });

    it('should not allow "cars"', () => {
      itemTypeControl.setValue('cars');
      expect(itemTypeControl.valid).toBeFalsy();
    });
  });

  describe('The foodType field', () => {
    let foodTypeControl: AbstractControl;

    beforeEach(() => {
      foodTypeControl = newRequestForm.controls.foodType;
    });

    it('should allow empty values', () => {
      foodTypeControl.setValue('');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should allow "dairy"', () => {
      foodTypeControl.setValue('dairy');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should allow "grain"', () => {
      foodTypeControl.setValue('grain');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should allow "meat"', () => {
      foodTypeControl.setValue('meat');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should allow "fruit"', () => {
      foodTypeControl.setValue('fruit');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should allow "vegetable"', () => {
      foodTypeControl.setValue('vegetable');
      expect(foodTypeControl.valid).toBeTruthy();
    });

    it('should not allow "cars"', () => {
      foodTypeControl.setValue('cars');
      expect(foodTypeControl.valid).toBeFalsy();
    });

    it('should be clearable by `resetForm`', () => {
      foodTypeControl.setValue('vegetable');
      expect(foodTypeControl.value).toEqual('vegetable');
      newRequestComponent.resetForm();
      expect(foodTypeControl.value).toBeFalsy();

    });
  });
  describe('The getErrorMessage method', () => {
    let itemTypeControl: AbstractControl;

    beforeEach(() => {
      itemTypeControl = newRequestForm.controls.itemType;
    });

    it('should return "unknown error" when passed an invalid error code', () => {
      expect(newRequestComponent.getErrorMessage('foodType') === 'Unknown error');
    });

    it('should return "required" error when itemType is empty', () => {
      itemTypeControl.setValue('--');
      expect(newRequestComponent.getErrorMessage('itemType')).toBeTruthy();
    });
  });

  describe('Can we submit stuff to the client database?', () => {
    let itemTypeControl: AbstractControl;
    let foodTypeControl: AbstractControl;
    let descControl: AbstractControl;

    beforeEach(() => {
      itemTypeControl = newRequestForm.controls.itemType;
      foodTypeControl = newRequestForm.controls.foodType;
      descControl = newRequestComponent.newRequestForm.controls.description;
    });

    it('should not get angy', () => {
      foodTypeControl.setValue('dairy');
      itemTypeControl.setValue('food');
      descControl.setValue('this is a description I guess');

      newRequestComponent.submitForm();

      expect(service.addedClientRequests[0].itemType).toEqual('food');
      expect(service.addedClientRequests[0].foodType).toEqual('dairy');
      expect(service.addedClientRequests[0].description).toEqual('this is a description I guess');
    });
  });

  describe('Can we submit stuff to the donor database?', () => {
    let itemTypeControl: AbstractControl;
    let foodTypeControl: AbstractControl;
    let descControl: AbstractControl;

    beforeEach(() => {
      itemTypeControl = newRequestForm.controls.itemType;
      foodTypeControl = newRequestForm.controls.foodType;
      descControl = newRequestComponent.newRequestForm.controls.description;
    });

    it('should not get angy', () => {
      newRequestComponent.destination = 'donor';

      foodTypeControl.setValue('dairy');
      itemTypeControl.setValue('food');
      descControl.setValue('this is a description I guess');

      newRequestComponent.submitForm();

      expect(service.addedDonorRequests[0].itemType).toEqual('food');
      expect(service.addedDonorRequests[0].foodType).toEqual('dairy');
      expect(service.addedDonorRequests[0].description).toEqual('this is a description I guess');
    });
  });
});

describe('Misbehaving request service', () => {
  let itemTypeControl: AbstractControl;
  let foodTypeControl: AbstractControl;
  let descControl: AbstractControl;
  let newRequestComponent: NewRequestComponent;
  let newRequestForm: FormGroup;
  let fixture: ComponentFixture<NewRequestComponent>;

  let requestServiceStub: {
    deleteRequest: () => Observable<object>;
    addDonorRequest: () => Observable<string>;
    addClientRequest: () => Observable<string>;
    getClientRequests: () => Observable<Request[]>;
    getDonorRequests: () => Observable<Request[]>;
  };
  let dialogStub: {
    open: (stuff) => void;
    calledWith: any;
  };

  beforeEach(() => {
    requestServiceStub = {
      getClientRequests: () => new Observable(observer => {
        observer.error('getClientRequests() Observer generates an error');
      }),
      getDonorRequests: () => new Observable(observer => {
        observer.error('getDonorRequests() Observer generates an error');
      }),
      addDonorRequest: () => new Observable(observer => {
        observer.error('addDonorRequest() Observer generates an error');
      }),
      addClientRequest: () => new Observable(observer => {
        observer.error('addClientRequest() Observer generates an error');
      }),

      deleteRequest: () => new Observable(observer => {
        observer.error('deleteRequest() Observer generates an error');
      })
    };

    dialogStub = {
      open: (stuff: any) => {
        dialogStub.calledWith = stuff;
      },
      calledWith: undefined
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{provide: RequestService, useValue: requestServiceStub},
        {provide: MatDialog, useValue: dialogStub},]
    });
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
        RouterTestingModule,
      ],
      providers: [{ provide: RequestService, useValue: requestServiceStub }],
      declarations: [NewRequestComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NewRequestComponent);
      newRequestComponent = fixture.componentInstance;
      fixture.detectChanges();
      newRequestForm = newRequestComponent.newRequestForm;
      expect(newRequestForm).toBeDefined();
      expect(newRequestForm.controls).toBeDefined();

      itemTypeControl = newRequestForm.controls.itemType;
      foodTypeControl = newRequestForm.controls.foodType;
      descControl = newRequestComponent.newRequestForm.controls.description;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestComponent);
    newRequestComponent = fixture.componentInstance;
    fixture.detectChanges();
    newRequestForm = newRequestComponent.newRequestForm;
    expect(newRequestForm).toBeDefined();
    expect(newRequestForm.controls).toBeDefined();
  });

  it('should get angy when talking with the donor database', () => {
    newRequestComponent.destination = 'donor';

    foodTypeControl.setValue('dairy');
    itemTypeControl.setValue('food');
    descControl.setValue('this is a description I guess');

    newRequestComponent.submitForm();
  });

  it('should get angy when talking with the client database', () => {
    newRequestComponent.destination = 'client';

    foodTypeControl.setValue('dairy');
    itemTypeControl.setValue('food');
    descControl.setValue('this is a description I guess');

    newRequestComponent.submitForm();
  });

});


