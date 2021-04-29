import { Injectable } from '@angular/core';
import { ICommunities } from 'projects/shared-models/communities.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { API_ROUTES } from 'projects/shared-services/api-routes.constants';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUsers } from 'projects/shared-models/users.model';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService
  ) { }

  create(communityData, communityGroupId = null): Observable<ICommunity> {
    let params;
    if (communityGroupId) {
      params = new HttpParams().set('community_group_id', communityGroupId);
    }
    return this.http.post<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.CREATE), {
        community: communityData
      }, {params}
    );
  }

  getRoleCommunities(role): Observable<ICommunities> {
    const params = new HttpParams().set('role', role);

    return this.http.get<ICommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.USER_ROLE_COMMUNITIES), { params }
    );
    // .pipe(
    //   tap((data: ICommunities) => {
    //     this.organizerCommunities.next(data.communities);
    //   })
    // );
  }

  // get the details of a community
  getCommunityDetails(communityId): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', communityId);

    return this.http.get<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.DETAILS), { params }
    );
  }

  // update community details
  updateCommunity(communityFormData, communityId): Observable<ICommunity> {

    const params = new HttpParams().set('community_id', communityId);
    params.append('community_id', 'gdg-new-delhi');
    return this.http.put<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.UPDATE),
      communityFormData,
      {params}
    );
  }

  // search a community by name
  searchByName(query): Observable<ICommunity[]> {
    const params = new HttpParams().set('query', query);

    return this.http.get<ICommunity[]>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.SEARCH_BY_NAME),
      {params}
    );
  }

  // get all the speakers
  speakers(communityId): Observable<IUsers> {
    // communityId is the slug here
    const params = new HttpParams().set('community_id', communityId);

    return this.http.get<IUsers>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.SPEAKERS),
      {params}
    );
  }


  // TODO deprecate once we have the new API's for list of communities
  // Public api communication
  pGetCommunities(page, count, query): Observable<ICommunities> {
    let params = new HttpParams().set('page', page).set('count', count).set('query', query);
    return this.http.get<ICommunities>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC_INDEX), {params}
    );
  }

  pGetCommunityDetails(communityId): Observable<ICommunity> {
    const params = new HttpParams().set('community_id', communityId);

    return this.http.get<ICommunity>(
      this.apiRoutesService.getRoute(API_ROUTES.COMMUNITIES.PUBLIC_DETAILS), { params }
    );
  }

}
