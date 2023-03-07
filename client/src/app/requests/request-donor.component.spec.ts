import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
import { MockRequestService } from 'src/testing/request.service.mock';
import { Request } from './request';
import { RequestDonorComponent } from './request-donor.component';
import { RequestService } from './request.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { request } from 'http';

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

describe('Donor Request View', () => {
  let requestDonorComponent: RequestDonorComponent;
  let fixture: ComponentFixture<RequestDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestDonorComponent],
      providers: [{ provide: RequestService, useValue: new MockRequestService() }]
    });
  });

  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestDonorComponent);
      requestDonorComponent = fixture.componentInstance;
    });
  }));

  it('contains all requests', () => {
    expect(requestDonorComponent.serverFilteredRequests.length).toBe(4);
  });
});
