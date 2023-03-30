import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { NewRequestComponent } from './new-request/new-request.component';
import { FoodType, ItemType, Request } from './request';
import { RequestVolunteerComponent } from './request-volunteer.component';
import { RequestService } from './request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
  providers: [RequestVolunteerComponent]
})

export class EditRequestComponent implements OnInit, OnDestroy{
  request: Request;
  snackBar: any;
  router: any;
  itemType: any;

  newRequestForm = new FormGroup({
    // We want descriptions to be short and sweet, yet still required so we have at least some idea what
    // the client wants
    description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ])),

    itemType: new FormControl<ItemType>('food',Validators.compose([
      Validators.required,
      Validators.pattern('^(food|toiletries|other)$'),
    ])),

    foodType: new FormControl<FoodType>('',Validators.compose([
      Validators.pattern('^(dairy|grain|meat|fruit|vegetable|)$'),
    ])),
  });

  readonly newRequestValidationMessages = {
    description: [
      {type: 'required', message: 'Description is required'},
      {type: 'minlength', message: 'Description must be at least 5 characters long'},
      {type: 'maxlength', message: 'Description cannot be more than 200 characters long'},
    ],
    itemType: [
      { type: 'required', message: 'Item type is required' },
      { type: 'pattern', message: 'Item type must be food, toiletries, or other' },
    ],
    foodType: [
      {type: 'pattern', message: 'Food type must be one of dairy, grain, meat, fruit, or vegetable'},
    ]
  };
  private ngUnsubscribe = new Subject<void>();



  constructor(private snackbar: MatSnackBar, private route: ActivatedRoute, private requestService: RequestService ) {
  }

  formControlHasError(controlName: string): boolean {
    return this.newRequestForm.get(controlName).invalid &&
      (this.newRequestForm.get(controlName).dirty || this.newRequestForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.newRequestValidationMessages): string {
    for(const {type, message} of this.newRequestValidationMessages[name]) {
      if (this.newRequestForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
    this.requestService.addRequest(this.newRequestForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Request successfully submitted`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/requests/donor', newId]);
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

  ngOnInit(): void {
    this.route.paramMap.pipe(
      //Map the paramMap into the id
      map((paramMap: ParamMap) => paramMap.get('id')),
      //maps the id string to the Observable<Request>
      switchMap((id: string) => this.requestService.getRequestById(id)),
      //Allows the pipeline to continue until 'this.ngUnsubscribe' emits a value
      //It then destroys the pipeline
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: request => {
        this.request = request;

        this.newRequestForm.setValue({description: this.request.description,
          foodType: this.request.foodType, itemType: this.request.itemType});
      },
      error: _err => {
        /*(this.snackbar.open('Problem loading the Request – try again', 'OK', {
          duration: 5000,
        }); */
      }
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
