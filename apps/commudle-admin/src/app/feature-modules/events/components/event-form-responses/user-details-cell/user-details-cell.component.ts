import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { NbWindowService } from '@commudle/theme';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IRegistrationStatus } from 'apps/shared-models/registration_status.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { IUser } from 'apps/shared-models/user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  styleUrls: ['./user-details-cell.component.scss'],
})
export class UserDetailsCellComponent implements OnInit, OnChanges {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faInfo = faInfo;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Input() registrationType: IRegistrationType;
  @Input() registrationStatuses: IRegistrationStatus[];
  @Input() userResponse: IDataFormEntityResponseGroup;
  @Input() eventDataFormEntityGroupId;
  user: IUser;

  @Output() updatedRegistrationStatus = new EventEmitter();
  @Output() updateEntryPass = new EventEmitter();
  moment = moment;

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private toastLogService: LibToastLogService,
    private eventEntryPassesService: EventEntryPassesService,
    private windowService: NbWindowService,
  ) {}

  ngOnInit() {
    this.user = this.userResponse.user;
  }

  ngOnChanges() {
    this.user = this.userResponse.user;
  }

  updateRegistrationStatus(registrationStatusId) {
    this.dataFormEntityResponseGroupsService
      .updateEventRegistrationStatus(registrationStatusId, this.userResponse.id)
      .subscribe((data) => {
        this.updatedRegistrationStatus.emit(data);
        this.toastLogService.successDialog('Updated!');
      });
  }

  generateEntryPass() {
    this.eventEntryPassesService.createEntryPass(this.userResponse.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Entry Pass Added!');
    });
  }

  toggleAttendance() {
    this.eventEntryPassesService.toggleAttendance(this.userResponse.entry_pass.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Attendance Updated!');
    });
  }

  toggleUninvited() {
    this.eventEntryPassesService.toggleUninvited(this.userResponse.entry_pass.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Uninvited Status Updated!');
    });
  }

  openGeneralEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send Email To ${this.user.name}`,
      context: {
        community: this.community,
        mailType: EemailTypes.GENERAL_ALL,
        recipientUsername: this.user.username,
      },
    });
  }

  openRSVPEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send RSVP To ${this.user.name}`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
        mailType: EemailTypes.RSVP,
        recipientUsername: this.user.username,
      },
    });
  }

  openEntryPassEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send Entry Pass To ${this.user.name}`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
        mailType: EemailTypes.ENTRY_PASS,
        recipientUsername: this.user.username,
      },
    });
  }
}
