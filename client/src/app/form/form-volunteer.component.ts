import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Form } from './form';
import { FormService } from './form.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-volunteer',
  templateUrl: './form-volunteer.component.html',
  styleUrls: ['./form-volunteer.component.scss'],
  providers: []
})

export class FormVolunteerComponent implements OnInit, OnDestroy {
  public servedForms: FormGroup[];


  private ngUnsubscribe = new Subject<void>();

  constructor(private formService: FormService, private snackBar: MatSnackBar) {
  }
  //Gets the forms from the server with the correct filters
  getFormsFromServer(): void {
    this.formService.getAllForms().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({

      error: (err) => {
        let message = '';
        if (err.error instanceof ErrorEvent) {
          message = `Problem in the client – Error: {err.error.message}`;
        } else {
          message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.snackBar.open(
          message,
          'OK',
          {duration: 5000});
      },
    });
  }

  ngOnInit(): void {
      this.getFormsFromServer();
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }
}
