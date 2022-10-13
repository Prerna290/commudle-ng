import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListsComponent } from 'projects/commudle-admin/src/app/feature-modules/jobs/components/jobs-lists/jobs-lists.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobComponent } from './components/job/job.component';
import { MyJobApplicationsComponent } from './components/my-job-applications/my-job-applications.component';

const routes: Routes = [
  {
    path: '',
    component: JobsListsComponent,
  },
  {
    path: 'my-applications',
    canActivate: [AuthGuard],
    component: MyJobApplicationsComponent,
  },
  {
    path: ':id',
    component: JobComponent,
    children: [
      {
        path: 'applications',
        component: JobApplicationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
