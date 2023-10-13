import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IUser } from 'apps/shared-models/user.model';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'app-attending-members',
  templateUrl: './attending-members.component.html',
  styleUrls: ['./attending-members.component.scss'],
})
export class AttendingMembersComponent implements OnInit {
  EEventStatuses = EEventStatuses;
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Output() hasInterestedMembers = new EventEmitter();

  users: IUser[] = [];
  totalCount = 0;

  constructor(
    private userEventRegistrationsService: UserEventRegistrationsService,
    private eventsService: EventsService,
  ) {}

  ngOnInit() {
    if (this.event.custom_registration) {
      this.getInterestedMembers();
    } else {
      this.getUserEventRegistrations();
    }
  }

  getInterestedMembers() {
    this.eventsService.pGetEventsInterestedMembers(this.event.id).subscribe((data) => {
      this.users = data.users;
      this.totalCount = data.total_count;
      if (this.users.length > 0) {
        this.hasInterestedMembers.emit(true);
      }
    });
  }

  getUserEventRegistrations() {
    this.userEventRegistrationsService.pEventInterestedUsers(this.event.id).subscribe((data) => {
      this.users = data.users;
      this.totalCount = data.total;

      if (this.users.length > 0) {
        this.hasInterestedMembers.emit(true);
      }
    });
  }
}
