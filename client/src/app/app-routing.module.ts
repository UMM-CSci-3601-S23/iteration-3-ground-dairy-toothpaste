import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditRequestComponent } from './requests/edit-request.component';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { RequestDonorComponent } from './requests/request-donor.component';
import { RequestVolunteerComponent } from './requests/request-volunteer.component';
import { RequestDonorCardComponent } from './request-donor-card/request-donor-card.component';

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'requests/donor', component: RequestDonorComponent, title: 'Donor View'},
  {path: 'requests/donor/:id', component: RequestDonorCardComponent, title: 'Detailed Request View'},
  {path: 'requests/volunteer', component: RequestVolunteerComponent, title: 'Volunteer View'},
  {path: 'requests/client', component: NewRequestComponent, title: 'New Request'},
  {path: 'requests/donor', component: RequestDonorComponent, title: 'Donor View'},
  {path: 'requests/volunteer/:id', component: EditRequestComponent, title: 'Edit Request'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
