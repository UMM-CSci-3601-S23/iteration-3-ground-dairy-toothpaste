import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Form } from './form';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // The URL for the forms part of the server API
  readonly formUrl: string = `${environment.apiUrl}forms/get`;
  readonly newFormUrl: string = `${environment.apiUrl}form/add`;
  private readonly selKey = 'selections';
  constructor(private httpClient: HttpClient) {
  }

  getForms(filters?: {sortOrder?: string}): Observable<Form[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.sortOrder) {
        httpParams = httpParams.set('sortOrder', filters.sortOrder);
      }
    }
    return this.httpClient.get<Form[]>(this.formUrl, {
      params: httpParams,
    });
  }


  addForm(form: FormGroup): Observable<string> {
    // Send post form to add a new Form with the Form data as the body.
    const formJson = JSON.stringify(form);
    // return this.http.post<{id: string}>(this.addFormUrl, formJson).pipe(map(res => res.id));
    return this.httpClient.post<{id: string}>(this.newFormUrl, formJson).pipe(map(res => res.id));
  }
}

