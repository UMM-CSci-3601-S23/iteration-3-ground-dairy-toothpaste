import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-new-request-help',
  templateUrl: './new-request-help.component.html',
  styleUrls: ['./new-request-help.component.scss']
})
export class NewRequestHelpComponent {
  // dialogRef: MatDialogRef <any> ;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewRequestHelpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

