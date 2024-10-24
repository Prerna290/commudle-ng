import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ENotificationParentTypes } from 'apps/shared-models/enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { INotificationMessage } from 'apps/shared-models/notification.model';

@Component({
  selector: 'app-notifications-list-item',
  templateUrl: './notifications-list-item.component.html',
  styleUrls: ['./notifications-list-item.component.scss'],
})
export class NotificationsListItemComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  timeout: any;
  observer: any;
  @Input() notificationMessage: INotificationMessage[] = [];
  @Input() ENotificationStatusesUnread: boolean;

  @Output() notificationClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('notification') notification: ElementRef;

  @Output() markRead: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notificationMessage) {
      this.replaceLinkValue();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      clearTimeout(this.timeout);
      this.observer.disconnect();
    }
  }

  ngAfterViewInit() {
    if (this.ENotificationStatusesUnread === true) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.timeout = setTimeout(() => {
                this.markRead.emit(); // emit the function to mark message as read
              }, 5000);
            } else {
              clearTimeout(this.timeout);
            }
          });
        },
        { threshold: 1 }, // how much % of the element is in view
      );
      this.observer.observe(this.notification.nativeElement);
    }
  }

  // handlebar replacement value using path
  getValue(path: string, content: any) {
    const value = path.split('.');
    return value.reduce((acc, curr) => acc[curr], content);
  }

  replaceLinkValue() {
    this.notificationMessage
      .filter((message) => message.value.startsWith('{{') && message.value.endsWith('}}'))
      .forEach((message) => {
        message.value = this.getValue(message.value.replace(/{{|}}/g, ''), message);
      });
  }

  redirectTo(notificationMessage: INotificationMessage) {
    const value =
      notificationMessage.sender ||
      notificationMessage.entity ||
      notificationMessage.parent ||
      notificationMessage.owner;
    const type =
      notificationMessage.sender_type ||
      notificationMessage.entity_type ||
      notificationMessage.parent_type ||
      notificationMessage.owner_type;
    const slug = value['username'] || value['slug'] || value['id'];

    switch (type) {
      case ENotificationSenderTypes.USER:
        this.router.navigate(['/users', slug]);
        break;
      case ENotificationParentTypes.COMMUNITY_BUILD:
        this.router.navigate(['/builds', slug]);
        break;
      case ENotificationParentTypes.LAB:
        this.router.navigate(['/labs', slug]);
        break;
      case ENotificationParentTypes.KOMMUNITY:
        this.router.navigate(['/communities', slug]);
        break;
      case ENotificationParentTypes.EVENT:
        this.router.navigate(['/event', slug]);
        break;
      case ENotificationParentTypes.JOB:
        this.router.navigate(['/jobs', slug]);
        break;
    }

    this.notificationClicked.emit();
  }
}
