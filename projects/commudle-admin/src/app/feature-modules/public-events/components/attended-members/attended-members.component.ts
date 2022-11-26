import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IUser } from 'projects/shared-models/user.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-attended-members',
  templateUrl: './attended-members.component.html',
  styleUrls: ['./attended-members.component.scss'],
})
export class AttendedMembersComponent implements OnInit, OnDestroy {
  event: IEvent;
  members: IUser[] = [];
  isLoading = false;

  page = 1;
  count = 10;
  total = 0;
  query: string = '';
  queryChanged: Subject<string> = new Subject<string>();

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private footerService: FooterService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.event = data.event;

        this.seoService.setTags(
          `Members who attended ${this.event.name}`,
          `Connect with the community members who attended ${this.event.name} by ${this.activatedRoute.snapshot.params.community_id} with you`,
          'https://commudle.com/assets/images/commudle-logo192.png',
        );

        this.getMembers();
      }),
    );

    this.subscriptions.push(
      this.queryChanged.pipe(debounceTime(800), distinctUntilChanged()).subscribe((q) => {
        this.query = q;
        this.search();
      }),
    );

    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());

    this.footerService.changeFooterStatus(true);
  }

  getMembers(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.eventsService.getAttendedMembers(this.query, this.event.id, this.page, this.count).subscribe((data) => {
        this.members = data.users;
        this.total = data.total;
        this.isLoading = false;
      }),
    );
  }

  search(): void {
    this.page = 1;
    this.getMembers();
  }
}
