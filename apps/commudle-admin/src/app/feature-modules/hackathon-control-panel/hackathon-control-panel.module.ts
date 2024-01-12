import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackathonControlPanelRoutes } from './hackathon-control-panel.routing';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HackathonControlPanelBasicFormComponent } from './components/hackathon-control-panel-basic-form/hackathon-control-panel-basic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NbInputModule, NbButtonModule, NbCardModule } from '@commudle/theme';
import { HackathonControlPanelContactDetailsFormComponent } from './components/hackathon-control-panel-contact-details-form/hackathon-control-panel-contact-details-form.component';
import { HackathonControlPanelDatesFormComponent } from './components/hackathon-control-panel-dates-form/hackathon-control-panel-dates-form.component';
import { HackathonControlPanelSponsorComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor.component';
import { HackathonControlPanelSponsorCardComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor-card/hackathon-control-panel-sponsor-card.component';

@NgModule({
  declarations: [
    HackathonControlPanelDashboardComponent,
    HackathonControlPanelBasicFormComponent,
    HackathonControlPanelContactDetailsFormComponent,
    HackathonControlPanelDatesFormComponent,
    HackathonControlPanelSponsorComponent,
    HackathonControlPanelSponsorCardComponent,
  ],
  imports: [
    CommonModule,
    HackathonControlPanelRoutes,
    SharedComponentsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

    //components
    SidebarComponent,

    //nebular
    NbButtonModule,
    NbInputModule,
    NbCardModule,
  ],
})
export class HackathonControlPanelModule {}
