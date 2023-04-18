import { Component } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginService ) {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    signInSuccessData.authResult.user.getIdToken().then(value => {
      this.loginService.setCookie(value).subscribe(v => {
        console.log(value); console.log(v); });
    });
  }
}
