import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { UserFollowConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-follow-consent/user-follow-consent.component';
import { JoinChannelConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/join-channel-consent/join-channel-consent.component';
import { JoinCommunityConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/join-community-consent/join-community-consent.component';
import { AcceptEventVolunteerConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/accept-event-volunteer-consent/accept-event-volunteer-consent.component';
import { AcceptCommunityOrganizerConsentComponent } from '../accept-community-organizer-consent/accept-community-organizer-consent.component';
import { AcceptCommunityAdministratorConsentComponent } from '../accept-community-administrator-consent/accept-community-administrator-consent.component';
import { AcceptBuildTeammateConsentComponent } from '../accept-build-teammate-consent/accept-build-teammate-consent.component';
import { AcceptChannelTokenConsentComponent } from '../accept-channel-token-consent/accept-channel-token-consent.component';

@Component({
  selector: 'commudle-user-consents',
  standalone: true,
  templateUrl: './user-consents.component.html',
  styleUrls: ['./user-consents.component.scss'],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    UserFollowConsentComponent,
    JoinChannelConsentComponent,
    JoinCommunityConsentComponent,
    AcceptEventVolunteerConsentComponent,
    AcceptCommunityOrganizerConsentComponent,
    AcceptCommunityAdministratorConsentComponent,
    AcceptBuildTeammateConsentComponent,
    AcceptChannelTokenConsentComponent,
  ],
})
export class UserConsentsComponent implements OnInit {
  @Input() Following: boolean;
  @Input() username: string;
  @Input() onjoinChannel: boolean;
  @Input() joinCommunity: boolean;
  @Input() communitySlug: string;
  @Input() acceptRole: boolean;
  @Input() volunteerCommunityName: string;
  @Input() volunteerEventName: string;
  @Input() component: string;
  @Input() joinBuild: boolean;
  @Input() buildName: string;
  @Input() parentName: string;
  @Input() joinChannelToken: boolean;
  @Input() communityName: string;
  @Output() consentOutput = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  accept() {
    console.log('accepted called');
    this.consentOutput.emit('accepted');
  }

  reject() {
    console.log('rejected called');
    this.consentOutput.emit('rejected');
  }
}
