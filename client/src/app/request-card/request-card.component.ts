import { Component, Input } from '@angular/core';
import { Request } from '../requests/request';
import { RequestService } from '../requests/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent {
  @Input() request: Request;
  @Input() editable = false;
  @Input() deletable = false;
  @Input() showDetail = false;
  @Input() deleteCallback: (Request) => void;
  @Input() postCallback: (Request) => void;

  deleteRequest(): void {
    this.deleteCallback(this.request);
  };

  postRequest(): void {
    this.postCallback(this.request);
  }
}
