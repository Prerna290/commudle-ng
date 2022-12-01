import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbAccordionModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobListCardComponent } from './components/job-list/job-list-card/job-list-card.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobComponent } from './components/job/job.component';
import { MyJobApplicationComponent } from './components/my-job-applications/my-job-application/my-job-application.component';
import { MyJobApplicationsComponent } from './components/my-job-applications/my-job-applications.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployersListComponent } from './components/employers-list/employers-list.component';
import { SkeletonScreensModule } from 'projects/commudle-admin/src/app/feature-modules/skeleton-screens/skeleton-screens.module';

@NgModule({
  declarations: [
    MyJobApplicationsComponent,
    MyJobApplicationComponent,
    JobComponent,
    JobApplicationsComponent,
    JobListComponent,
    JobListCardComponent,
    EmployeesListComponent,
    EmployersListComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    MiniUserProfileModule,
    SkeletonScreensModule,

    //nb module
    FontAwesomeModule,
    NbCardModule,
    NbListModule,
    NbTabsetModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbAlertModule,
    NbRadioModule,
    NbCheckboxModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbTagModule,
    NbAccordionModule,
  ],
})
export class JobsModule {}
