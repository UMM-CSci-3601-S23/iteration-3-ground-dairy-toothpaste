import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { VolunteerForm } from './form';
import { FormService } from './form.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-form-volunteer',
  templateUrl: './form-volunteer.component.html',
  styleUrls: ['./form-volunteer.component.scss'],
  providers: []
})

export class FormVolunteerComponent implements OnInit, OnDestroy {
  public servedForms: VolunteerForm[];

  private ngUnsubscribe = new Subject<void>();

  constructor(private formService: FormService, private snackBar: MatSnackBar) {

  }
  //Gets the forms from the server with the correct filters
  getFormsFromServer(): void {
    this.formService.getAllForms().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (forms) => {
        this.servedForms = forms;
        console.log(this.servedForms);
      },

      error: (err) => {
        const message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
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
