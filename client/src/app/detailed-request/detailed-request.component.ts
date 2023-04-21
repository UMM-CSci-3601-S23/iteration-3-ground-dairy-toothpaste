import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from '../requests/request.service';
import { Request } from '../requests/request';
import { Subject, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detailed-request',
  templateUrl: './detailed-request.component.html',
  styleUrls: ['./detailed-request.component.scss']
})
export class DetailedRequestComponent implements OnInit, OnDestroy {
  request: Request;
  router: any;

  private ngUnsubscribe = new Subject<void>();

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private requestService: RequestService ) {
  }

  setRequestValues(request: Request): void {
    this.request = request;
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
      },
      error: _err => {
        this.snackBar.open('Problem loading the Request – try again', 'OK', {
          duration: 5000,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
