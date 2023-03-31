import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditRequestComponent } from './edit-request.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockRequestService } from 'src/testing/request.service.mock';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NewRequestComponent } from './new-request/new-request.component';
import { RequestService } from './request.service';

describe('EditRequestComponent', () => {
  let editRequestComponent: EditRequestComponent;
  let editRequestForm: FormGroup;
  let fixture: ComponentFixture<EditRequestComponent>;
  const service: MockRequestService = new MockRequestService();

  beforeEach(waitForAsync(() => {
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
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestComponent);
    editRequestComponent = fixture.componentInstance;
    fixture.detectChanges();
    editRequestForm = editRequestComponent.newRequestForm;
    expect(editRequestForm).toBeDefined();
    expect(editRequestForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(editRequestComponent).toBeTruthy();
    expect(editRequestForm).toBeTruthy();
  });

});
