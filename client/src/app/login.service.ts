import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // The URL for the requests part of the server API
  readonly authUrl: string = `${environment.apiUrl}auth`;

  constructor(private httpClient: HttpClient) {
  }


  setCookie(token: string): Observable<string> {
    // Send post request to add a new Request with the Request data as the body.
    return this.httpClient.post(this.authUrl, token).pipe(map(res => 'ok'));
  }
}
