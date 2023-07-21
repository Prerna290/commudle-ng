import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  volunteers: IUser[] = [];
  isLoading = true;

  viewMoreSection = true;
  footerText = 'View More';

  subscriptions: Subscription[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.footerText = `View More (${this.event.event_volunteers_count - 10})`;
    this.getVolunteers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getVolunteers() {
    this.subscriptions.push(
      this.eventsService.pGetEventVolunteers(this.event.slug).subscribe((data) => {
        this.volunteers = this.volunteers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.isLoading = false;
      }),
    );
  }

  viewMore() {
    this.viewMoreSection = !this.viewMoreSection;
    if (!this.viewMoreSection) {
      this.footerText = `View Less`;
    } else {
      this.footerText = `View More (${this.event.event_volunteers_count - 10})`;
    }
  }
}
