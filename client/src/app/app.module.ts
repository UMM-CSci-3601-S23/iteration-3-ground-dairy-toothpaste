import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RequestDonorComponent } from './requests/request-donor.component';
import { RequestVolunteerComponent } from './requests/request-volunteer.component';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { EditRequestComponent } from './requests/edit-request.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { DetailedRequestComponent } from './detailed-request/detailed-request.component';
import { ClientFormComponent } from './form/form-client.component';
import { FormVolunteerComponent } from './form/form-volunteer.component';
import { NewRequestHelpComponent } from './requests/new-request/new-request-help/new-request-help.component';
import { VolunteerHelpComponent } from './volunteer-help/volunteer-help.component';



const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatRadioModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatStepperModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewRequestComponent,
    RequestDonorComponent,
    RequestVolunteerComponent,
    EditRequestComponent,
    RequestCardComponent,
    DetailedRequestComponent,
    ClientFormComponent,
    FormVolunteerComponent,
    VolunteerHelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MATERIAL_MODULES,
    LayoutModule,
    MatDialogModule,
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
