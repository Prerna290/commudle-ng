import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { ICommunity } from 'apps/shared-models/community.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';

@Component({
  selector: 'app-new-community-channel',
  templateUrl: './new-community-channel.component.html',
  styleUrls: ['./new-community-channel.component.scss'],
})
export class NewCommunityChannelComponent implements OnInit, OnDestroy {
  @Input() groupName: string;
  @Input() discussionType: string;
  @ViewChild('newCommunityChannelFormTemplate', { static: true }) formTemplate: TemplateRef<any>;
  dialogRef;
  community: ICommunity;
  subscriptions = [];

  constructor(
    private dialogService: NbDialogService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.selectedCommunity$.subscribe((data) => {
        this.community = data;
      }),
    );

    // this.subscriptions.push(
    //   // get the channel category name (optional)
    //   this.activatedRoute.queryParams.subscribe((data) => {
    //     if (data.group_name) {
    //       this.groupName = data.group_name;
    //     }
    //   }),
    // );

    this.openForm();
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.dialogRef.close();
    this.seoService.noIndex(false);
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  openForm() {
    this.dialogRef = this.dialogService.open(this.formTemplate);
    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{ outlets: { p: null } }], { relativeTo: this.activatedRoute.parent });
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
