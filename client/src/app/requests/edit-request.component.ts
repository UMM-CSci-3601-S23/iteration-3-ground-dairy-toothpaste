import { Component, Input } from '@angular/core';
import { NewRequestComponent } from './new-request/new-request.component';
import { FoodType, ItemType, Request } from './request';
import { RequestVolunteerComponent } from './request-volunteer.component';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
  providers: [RequestVolunteerComponent]
})

export class EditRequestComponent extends NewRequestComponent{
  @Input() request: Request;

  public itemType: ItemType = 'other';
  public foodType: FoodType = 'dairy';
  public description = 'testing a lot';
}
