import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import { Request } from '../requests/request';
import { RequestService } from '../requests/request.service';


@Component({
  selector: 'app-request-donor-card',
  templateUrl: './request-donor-card.component.html',
  styleUrls: ['./request-donor-card.component.scss']
})
export class RequestDonorCardComponent implements OnDestroy, OnInit{
  request: Request;

  private ngUnsubscribe = new Subject<void>();

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private requestService: RequestService) { }

  ngOnInit(): void {
      this.route.paramMap.pipe(
        map((paramMap: ParamMap) => paramMap.get('id')),
        switchMap((id: string) => this.requestService.getRequestById(id)),
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next: request => {
          this.request = request;
          return request;
        },
        error: _err => {
          this.snackBar.open('Problem loading the request, try again', 'Ok', {
            duration: 5000,
          });
        }



      });
  }

ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();

}

}
