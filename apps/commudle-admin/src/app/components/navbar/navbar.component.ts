import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NbMenuItem, NbSidebarService, NbSidebarState } from '@commudle/theme';
import { AppCentralNotificationService } from 'apps/commudle-admin/src/app/services/app-central-notifications.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { TruncateTextPipe } from 'apps/shared-pipes/truncate-text.pipe';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: ICurrentUser;
  userContextMenu: NbMenuItem[] = [{ title: 'Logout', link: '/logout' }];
  sideBarNotifications = false;
  sideBarState: NbSidebarState;

  faBars = faBars;
  staticAssets = staticAssets;

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private authwatchService: LibAuthwatchService,
    private appCentralNotificationService: AppCentralNotificationService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.checkNotifications();
  }

  getUser() {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;

      if (this.currentUser) {
        this.setContextMenu();
      }
    });
  }

  setContextMenu() {
    const truncatePipe = new TruncateTextPipe();
    if (this.userContextMenu.length <= 1) {
      this.userContextMenu.unshift({
        title: `@${truncatePipe.transform(this.currentUser.username, 10)}`,
        link: `/users/${this.currentUser.username}`,
        badge: {
          text: 'Profile',
          status: 'basic',
        },
      });
    } else {
      this.userContextMenu[0] = {
        title: `@${truncatePipe.transform(this.currentUser.username, 10)}`,
        link: `/users/${this.currentUser.username}`,
        badge: {
          text: 'Profile',
          status: 'basic',
        },
      };
    }
  }

  checkNotifications(): void {
    this.appCentralNotificationService.sidebarNotifications$.subscribe((data) => (this.sideBarNotifications = data));
  }

  checkSideBarState(): void {
    this.sidebarService.getSidebarState('mainMenu').subscribe((data) => (this.sideBarState = data));
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(false, 'mainMenu');
  }

  login() {
    this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
  }
}
