import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
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
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private seoService: SeoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.event = data.event;

        if (this.activatedRoute.snapshot.queryParams['page']) {
          this.page = Number(this.activatedRoute.snapshot.queryParams['page']);
        }

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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.eventsService.getAttendedMembers(this.query, this.event.id, this.page, this.count).subscribe((data) => {
        this.members = data.users;
        this.total = data.total;
        this.isLoading = false;
        this.router.navigate([], { queryParams: { page: this.page } });
      }),
    );
  }

  search(): void {
    this.page = 1;
    this.getMembers();
  }
}
