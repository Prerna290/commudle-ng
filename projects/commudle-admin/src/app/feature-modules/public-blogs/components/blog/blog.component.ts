import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'projects/shared-models/user.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { Subscription } from 'rxjs';
import { IBlog } from '../../models/blogs.model';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blog: IBlog;
  richText: any;
  user: IUser;
  blogDescription: string;

  subscriptions: Subscription[] = [];

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private appUsersService: AppUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getData() {
    const slug: string = this.activatedRoute.snapshot.params.id;
    this.cmsService.getDataBySlug(slug).subscribe((value: IBlog) => {
      this.blog = value;
      this.richText = this.cmsService.getHtmlFromBlock(value);
      this.blogDescription = this.richText.replace(/<[^>]+>/g, '').substr(0, 160);
      this.setUser();
      this.setMeta();
    });
  }
  setUser() {
    // Get user's data
    this.subscriptions.push(
      this.appUsersService.getProfile(this.blog.username).subscribe((data) => (this.user = data)),
    );
  }
  //set meta
  setMeta(): void {
    this.seoService.setTags(this.blog.title, this.blogDescription, this.imageUrl(this.blog.headerImage).url());
  }
}