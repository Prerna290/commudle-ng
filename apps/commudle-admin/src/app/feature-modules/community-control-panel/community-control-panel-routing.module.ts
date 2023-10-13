import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityAdminNotificationsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-control-panel/components/community-admin-notifications/community-admin-notifications.component';
import { CommunityMembersListComponent } from 'apps/commudle-admin/src/app/feature-modules/community-control-panel/components/community-members-list/community-members-list.component';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { CommunityBlockedUsersComponent } from './components/community-blocked-users/community-blocked-users.component';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityCreateComponent } from './components/community-create/community-create.component';
import { CommunityEditDetailsComponent } from './components/community-edit-details/community-edit-details.component';
import { CommunityEventsListComponent } from './components/community-events-list/community-events-list.component';
import { CommunityFormsListComponent } from './components/community-forms-and-surveys/community-forms-list/community-forms-list.component';
import { CommunityMembersComponent } from './components/community-members/community-members.component';
import { CommunityStatsComponent } from './components/community-stats/community-stats.component';
import { CommunityTeamComponent } from './components/community-team/community-team.component';
import { CommunityPaymentsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-control-panel/components/community-payments/community-payments.component';
import { CommunityFormsAndSurveysComponent } from 'apps/commudle-admin/src/app/feature-modules/community-control-panel/components/community-forms-and-surveys/community-forms-and-surveys.component';
import { CommunitySurveysComponent } from 'apps/commudle-admin/src/app/feature-modules/community-control-panel/components/community-forms-and-surveys/community-surveys/community-surveys.component';
import { CommunityChannelsComponent } from './components/community-channels/community-channels.component';

const routes = [
  {
    path: 'new',
    component: CommunityCreateComponent,
  },
  {
    path: ':community_id/stats',
    component: CommunityStatsComponent,
    resolve: {
      community: CommunityDetailsResolver,
    },
  },
  {
    path: ':community_id',
    component: CommunityControlPanelComponent,
    children: [
      {
        path: '',
        component: CommunityEventsListComponent,
      },
      {
        path: 'notifications',
        component: CommunityAdminNotificationsComponent,
      },
      {
        path: 'forms',
        component: CommunityFormsAndSurveysComponent,
        children: [
          {
            path: '',
            component: CommunityFormsListComponent,
          },
          {
            path: 'surveys',
            component: CommunitySurveysComponent,
          },
        ],
      },
      {
        path: 'edit',
        component: CommunityEditDetailsComponent,
      },
      {
        path: 'payments',
        component: CommunityPaymentsComponent,
      },
      {
        path: 'members',
        component: CommunityMembersListComponent,
        children: [
          {
            path: '',
            component: CommunityMembersComponent,
          },
          {
            path: 'blocked',
            component: CommunityBlockedUsersComponent,
          },
        ],
      },
      {
        path: 'team',
        component: CommunityTeamComponent,
      },
      {
        path: 'channels',
        component: CommunityChannelsComponent,
      },
      {
        path: 'forums',
        component: CommunityChannelsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityControlPanelRoutingModule {}
