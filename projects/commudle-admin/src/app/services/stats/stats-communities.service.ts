import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';



@Injectable({
  providedIn: 'root'
})
export class StatsCommunitiesService {

  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }



  membersDistribution(communityId): Observable<any> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_DISTRIBUTION), { params }
    );
  }

  membersTimeline(communityId): Observable<any> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.MEMBERS_TIMELINE), { params }
    );
  }


  eventsTimeLine(communityId): Observable<any> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.EVENTS_TIMELINE), { params }
    );
  }


  emails(communityId): Observable<any> {
    let params = new HttpParams().set('community_id', communityId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.STATS.COMMUNITIES.EMAILS), { params }
    );
  }

}
