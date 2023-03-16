import { NbCardModule, NbIconModule, NbTabsetModule, NbRouteTabsetModule } from '@commudle/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicCommunityGroupsRoutingModule } from './public-community-groups-routing.module';
import { CommunityGroupHomeComponent } from './components/community-group-home/community-group-home.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
import { CommunityGroupTeamComponent } from './components/community-group-team/community-group-team.component';
import { CommunityGroupAboutComponent } from './components/community-group-about/community-group-about.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { NbTagModule } from '@commudle/theme';
import { CommunityGroupActivityComponent } from './components/community-group-activity/community-group-activity.component';
import { CommunityGroupEventsComponent } from './components/community-group-events/community-group-events.component';
import { CommunityGroupChannelsComponent } from './components/community-group-channels/community-group-channels.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';

@NgModule({
  declarations: [
    CommunityGroupHomeComponent,
    CommunityGroupCommunitiesComponent,
    CommunityGroupTeamComponent,
    CommunityGroupAboutComponent,
    CommunityGroupActivityComponent,
    CommunityGroupEventsComponent,
    CommunityGroupChannelsComponent,
  ],
  imports: [
    CommonModule,
    PublicCommunityGroupsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    FontAwesomeModule,
    PublicCommunityModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbTagModule,
  ],
})
export class PublicCommunityGroupsModule {}
