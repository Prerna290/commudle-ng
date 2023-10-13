import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { ERegistationTypes } from 'apps/shared-models/enums/registration_types.enum';
import { Router } from '@angular/router';
import { EventSimpleRegistrationsService } from 'apps/commudle-admin/src/app/services/event-simple-registrations.service';
import {
  IEventSimpleRegistration,
  EEventSimpleRegistrationStatuses,
} from 'apps/shared-models/event_simple_registration.model';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
import { IUserEventRegistration } from 'apps/shared-models/user_event_registration.model';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';

@Component({
  selector: 'app-highlighted-links',
  templateUrl: './highlighted-links.component.html',
  styleUrls: ['./highlighted-links.component.scss'],
})
export class HighlightedLinksComponent implements OnInit {
  ERegistationTypes = ERegistationTypes;
  EEventSimpleRegistrationStatuses = EEventSimpleRegistrationStatuses;
  ERegistrationStatuses = ERegistrationStatuses;
  EEventStatuses = EEventStatuses;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasOpenForms = new EventEmitter();

  openForms: IEventDataFormEntityGroup[] = [];
  eventSimpleRegistration: IEventSimpleRegistration;
  userEventRegistration: IUserEventRegistration;
  currentRoute;

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private eventSimpleRegistrationsService: EventSimpleRegistrationsService,
    private userEventRegistrationsService: UserEventRegistrationsService,
    private router: Router,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit() {
    if (!this.event.custom_registration && this.event.editable) {
      this.getEventSimpleRegistration();
      this.getUserEventRegistration();
    } else {
      this.getOpenForms();
    }

    this.currentRoute = encodeURIComponent(this.router.url);
  }

  getOpenForms() {
    if (this.event.editable) {
      this.eventDataFormEntityGroupsService.pGetPublicOpenDataForms(this.event.id).subscribe((data) => {
        for (const form of data.event_data_form_entity_groups) {
          if (
            this.event.event_status.name === EEventStatuses.CANCELED ||
            this.event.event_status.name === EEventStatuses.COMPLETED
          ) {
            if (form.registration_type.name === ERegistationTypes.FEEDBACK) {
              this.openForms.push(form);
            }
            if (form.registration_type.name === ERegistationTypes.COMMUNICATION) {
              this.openForms.push(form);
            }
          }
          if (
            this.event.event_status.name === EEventStatuses.OPEN ||
            this.event.event_status.name === EEventStatuses.DRAFT
          ) {
            if (form.registration_type.name === ERegistationTypes.ATTENDEE) {
              this.openForms.push(form);
            }
            if (form.registration_type.name === ERegistationTypes.SPEAKER) {
              this.openForms.push(form);
            }
            if (form.registration_type.name === ERegistationTypes.FEEDBACK) {
              this.openForms.push(form);
            }
            if (form.registration_type.name === ERegistationTypes.COMMUNICATION) {
              this.openForms.push(form);
            }
          }
        }
        if (this.openForms.length > 0) {
          this.hasOpenForms.emit(true);
        }
      });
    }
  }

  getEventSimpleRegistration() {
    this.eventSimpleRegistrationsService.pGet(this.event.id).subscribe((data) => {
      if (data) {
        this.eventSimpleRegistration = data;
        this.hasOpenForms.emit(true);
      }
    });
  }

  toggleUserEventRegistration() {
    this.userEventRegistrationsService.pToggle(this.eventSimpleRegistration.id).subscribe((data) => {
      this.userEventRegistration = data;
      if (data.registration_status.name === ERegistrationStatuses.CANCELLED) {
        this.eventSimpleRegistration.current_user_registered = false;
      } else {
        this.eventSimpleRegistration.current_user_registered = true;
      }
    });
  }

  getUserEventRegistration() {
    this.userEventRegistrationsService.pShow(this.event.id).subscribe((data) => {
      this.userEventRegistration = data;
    });
  }

  onAcceptRoleButton() {
    if (this.eventSimpleRegistration.current_user_registered) {
      this.toggleUserEventRegistration();
      return;
    }

    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.OneClickRegistration,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.toggleUserEventRegistration();
      }
    });
  }
}
