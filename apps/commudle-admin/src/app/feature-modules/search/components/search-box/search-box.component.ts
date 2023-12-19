// import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import {
//   getPicture,
//   getRoute,
//   groupResults,
//   navigate,
// } from 'apps/commudle-admin/src/app/feature-modules/search/components/utils/search.utils';
// import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
// import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
// import { ISearch, ISearchResult } from 'apps/shared-models/search.model';
// import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

// @Component({
//   selector: 'app-search-box',
//   templateUrl: './search-box.component.html',
//   styleUrls: ['./search-box.component.scss'],
// })
// export class SearchBoxComponent implements OnInit {
//   @Input() overrideSearchStatus = false;
//   @Input() showSuggestions = true;
//   @Input() shape: 'round' | 'rectangle' | 'semi-round';

//   inputFormControl: FormControl;
//   total = -1;
//   groupedResults = {};
//   searchLoader = false;
//   searchStatus = true;

//   // use getRoute
//   getRoute = getRoute;
//   navigate = navigate;
//   getPicture = getPicture;

//   @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef<HTMLInputElement>;

//   constructor(
//     private searchService: SearchService,
//     public searchStatusService: SearchStatusService,
//     private router: Router,
//   ) {
//     this.inputFormControl = new FormControl('');
//     this.inputFormControl = this.fb.group({
//       name: [''],
//     });
//   }

//   ngOnInit() {
//     this.observeInput();
//     this.observeSearchStatus();
//   }

//   observeInput() {
//     this.inputFormControl.valueChanges
//       .pipe(
//         filter((value) => typeof value === 'string'),
//         map((value: string) => value.trim().toLowerCase()),
//         filter(Boolean),
//         distinctUntilChanged(),
//         tap(() => {
//           if (!this.showSuggestions) {
//             this.onSubmit();
//           }
//         }),
//         filter(() => this.showSuggestions),
//         tap(() => {
//           this.searchLoader = true;
//           this.groupedResults = {};
//         }),
//         debounceTime(500),
//         switchMap((value: string) => this.searchService.getSearchResults(value)),
//       )
//       .subscribe((value: ISearch) => {
//         this.groupedResults = groupResults(value.results);
//         this.searchLoader = false;
//         this.total = value.total;
//       });
//   }

//   observeSearchStatus() {
//     this.searchStatusService.searchStatus.subscribe((value: boolean) => {
//       this.searchStatus = value;
//     });
//   }

//   handleDisplay(result: ISearchResult | string) {
//     return typeof result === 'string' ? result : result['query'] || result.name;
//   }

//   onSubmit() {
//     this.router.navigate(['/search'], {
//       queryParams: { q: this.inputFormControl.value?.name || this.inputFormControl.value },
//     });
//   }
// }

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStatusService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { ISearch, ISearchResult } from 'apps/shared-models/search.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Location } from '@angular/common';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import * as moment from 'moment';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() overrideSearchStatus = false;
  @Input() showSuggestions = true;
  @Input() shape: 'round' | 'rectangle' | 'semi-round';

  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef<HTMLInputElement>;

  inputFormControl;
  query = '';
  total = -1;
  // isLoading = true;
  searchLoader = false;
  searchStatus = true;
  searchResults = [];
  users = [];
  communities = [];
  events = [];
  builds = [];
  labs = [];
  contents = [];
  staticAssets = staticAssets;

  moment = moment;

  constructor(
    private searchService: SearchService,
    public searchStatusService: SearchStatusService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.inputFormControl = this.fb.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.search();
    this.observeSearchStatus();
    const params = this.activatedRoute.snapshot.queryParams;
    if (Object.keys(params).length > 0) {
      if (params.q) {
        this.query = params.q;
        this.inputFormControl.get('name').setValue(this.query);
      }
    }
    if (!params.q) {
      this.getNotifications();
    }
  }

  search() {
    this.query = '';
    this.inputFormControl.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      this.query = this.inputFormControl.get('name').value;
      if (!this.showSuggestions) {
        this.onSubmit();
      }
      if (this.showSuggestions) {
        this.searchLoader = true;
        this.getNotifications();
      }
      this.searchInput.emit(this.query);
      // if (this.isLoadingSearch) {
      //   return;
      // }
      // this.isLoadingSearch = true;
      // this.queryParamsString = this.query;
      // this.getNotifications();
      // this.generateParams(this.query);
    });
  }

  generateParams(query) {
    // this.skeletonLoaderCard = true;
    const queryParams: { [key: string]: any } = {};

    if (query) {
      queryParams.q = query;
    }
    // this.seoTitle = this.query;
    // this.updateSeoTitle();
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    this.location.replaceState(location.pathname, queryParamsString);
  }

  getNotifications() {
    this.searchResults = [];
    this.users = [];
    this.communities = [];
    this.events = [];
    this.builds = [];
    this.labs = [];
    this.contents = [];

    if (this.query === '') {
      this.total = -1;
      this.searchLoader = false;
      return;
    }

    this.searchService.getSearchResults(this.query).subscribe((value) => {
      // this.isLoading = true;
      this.searchResults = value.results.map((result) => {
        if (result?.type === 'User') {
          this.users.push(result);
        } else if (result?.type === 'Community') {
          this.communities.push(result);
        } else if (result?.type === 'Lab') {
          this.labs.push(result);
        } else if (result?.type === 'Community Build') {
          this.builds.push(result);
        } else if (result?.type === 'Event') {
          this.events.push(result);
        } else if (result?.type === 'SocialResource') {
          this.contents.push(result);
          console.log(this.contents);
        }
        // this.total = value.total;
        // this.searchLoader = false;
        return result;
      });
      this.total = value.total;
      this.searchLoader = false;
      // this.isLoading = false;
    });
  }

  observeSearchStatus() {
    this.searchStatusService.searchStatus.subscribe((value: boolean) => {
      this.searchStatus = value;
    });
  }

  onSubmit() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.query },
      // queryParams: { q: this.inputFormControl.value?.name || this.inputFormControl.value },
    });
  }
}
