import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FoodType } from '../request';
import { ItemType } from '../request';
import { RequestService } from '../request.service';
// import { NewRequestHelpComponent } from './new-request-help/new-request-help.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {

  @Input() destination: 'client' | 'donor' = 'client';
  public type: ItemType = 'food';
  public generalNeed: boolean;

  newRequestForm = new FormGroup({
    // We want descriptions to be short and sweet, yet still required so we have at least some idea what
    // the client wants
    generalNeed: new FormControl<boolean>(false),
    description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ])),

    itemType: new FormControl<ItemType>('food', Validators.compose([
      Validators.required,
      Validators.pattern('^(food|toiletries|other)$'),
    ])),

    foodType: new FormControl<FoodType>('', Validators.compose([
      Validators.pattern('^(dairy|grain|meat|fruit|vegetable|)$'),
    ])),
  });

  readonly newRequestValidationMessages = {
    description: [
      { type: 'required', message: 'Description is required' },
      { type: 'minlength', message: 'Description must be at least 5 characters long' },
      { type: 'maxlength', message: 'Description cannot be more than 200 characters long' },
    ],
    itemType: [
      { type: 'required', message: 'Item type is required' },
      { type: 'pattern', message: 'Item type must be food, toiletries, or other' },
    ],
    foodType: [
      { type: 'pattern', message: 'Food type must be one of dairy, grain, meat, fruit, or vegetable' },
    ]
  };

    // eslint-disable-next-line max-len
    constructor(private requestService: RequestService, private snackBar: MatSnackBar, private router: Router, private dialogRef: MatDialog, public route: ActivatedRoute) {
    }

    onPage(): boolean {
      console.log(this.route.snapshot.url);
    if (this.route.snapshot.url.length < 2) {
      return false;
    }
    return this.route.snapshot.url[1].path === 'volunteer';
    }

  formControlHasError(controlName: string): boolean {
    return this.newRequestForm.get(controlName).invalid &&
      (this.newRequestForm.get(controlName).dirty || this.newRequestForm.get(controlName).touched);
  }

  getErrorMessage(name: string): string {
    for (const { type, message } of this.newRequestValidationMessages[name]) {
      if (this.newRequestForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  resetForm() {
    this.newRequestForm.patchValue({foodType: ''});
  }

  openDialog() {
    this.dialogRef.open(NewRequestHelpComponent);
  }

  submitForm() {
    if (this.destination === 'client') {
      this.requestService.addClientRequest(this.newRequestForm.value).subscribe({
        next: (newId) => {
          this.snackBar.open(
            `Request successfully submitted`,
            null,
            { duration: 2000 }
          );
        },
        error: err => {
          this.snackBar.open(
            `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`,
            'OK',
            { duration: 5000 }
          );
        },
        // complete: () => console.log('Add user completes!')
      });
    }
    //this if statement checks if destination is set to donor. Destination is set in the
    //html of the request-volunteer component.
    if (this.destination === 'donor') {
      this.requestService.addDonorRequest(this.newRequestForm.value).subscribe({
        next: (newId) => {
          this.snackBar.open(
            `Request successfully submitted`,
            null,
            { duration: 2000 }
          );
        },
        error: err => {
          this.snackBar.open(
            `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`,
            'OK',
            { duration: 5000 }
          );
        },
        // complete: () => console.log('Add user completes!')
      });
    }
  }

}

@Component({
  selector: 'app-new-request-help',
  templateUrl: 'new-request-help/new-request-help.component.html',
})
export class NewRequestHelpComponent { }
