import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VolunteerForm } from './form';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // The URL for the forms part of the server API
  readonly formUrl: string = `${environment.apiUrl}forms/get`;
  readonly newFormUrl: string = `${environment.apiUrl}form/add`;

  constructor(private httpClient: HttpClient) {
  }

  getAllForms(): Observable<VolunteerForm[]> {
    return this.httpClient.get<VolunteerForm[]>(this.formUrl);
  }


  addForm(form: any): Observable<string> {
    const formJson = JSON.stringify(form);
    return this.httpClient.post<{id: string}>(this.newFormUrl, formJson).pipe(map(res => res.id));
  }
}

