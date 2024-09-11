import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { UserProfileComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-profile/user-profile.component';
import { UserprofileDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/homepage/components/homepage-dashboard/userprofile-details/userprofile-details.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { DashboardUpdatesComponent } from './components/user-dashboard/dashboard-updates/dashboard-updates.component';

@NgModule({
  declarations: [UserDashboardComponent, DashboardUpdatesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    //Nebular
    NbCardModule,
    NbButtonModule,

    //Standalone
    UserProfileComponent,
    UserprofileDetailsComponent,
    EventHorizontalCardComponent,
  ],
})
export class DashboardModule {}
