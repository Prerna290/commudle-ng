import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { IDataFormEntityResponseGroups } from 'apps/shared-models/data_form_entity_response_groups.model';

@Injectable({
  providedIn: 'root',
})
export class DataFormEntityResponseGroupsService {
  constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

  getEventDataFormResponses(
    eventDataFormEntityGroupId,
    filterQuery,
    registrationStatusId,
    page,
    count,
    gender?,
    eventLocationTrackId?,
    formData?,
  ): Observable<any> {
    let params = new HttpParams()
      .set('event_data_form_entity_group_id', eventDataFormEntityGroupId)
      .set('count', count)
      .set('page', page)
      .set('registration_status_id', registrationStatusId)
      .set('query', filterQuery);
    if (gender) {
      params = params.set('gender', gender);
    }
    if (eventLocationTrackId) {
      params = params.set('event_location_track_id', eventLocationTrackId);
    }
    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.GET_EVENT_DATA_FORM_RESPONSES),
      formData,
      { params },
    );
  }

  getEventDataFormResponsesByFilter(
    eventDataFormEntityGroupId,
    filterQuery,
    registrationStatusId,
    page,
    count,
    questionId,
    gender?,
    eventLocationTrackId?,
    formData?,
  ): Observable<any> {
    let params = new HttpParams()
      .set('event_data_form_entity_group_id', eventDataFormEntityGroupId)
      .set('count', count)
      .set('page', page)
      .set('registration_status_id', registrationStatusId)
      .set('query', filterQuery)
      .set('question_id', questionId);
    if (gender) {
      params = params.set('gender', gender);
    }
    if (eventLocationTrackId) {
      params = params.set('event_location_track_id', eventLocationTrackId);
    }

    return this.http.post<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.FILTERED_RESPONSE_VALUES),
      formData,
      { params },
    );
  }

  updateEventRegistrationStatus(
    registrationStatusId,
    dataFormEntityResponseGroupId,
  ): Observable<IDataFormEntityResponseGroup> {
    return this.http.put<IDataFormEntityResponseGroup>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.UPDATE_EVENT_REGISTRATION_STATUS),
      {
        data_form_entity_response_group_id: dataFormEntityResponseGroupId,
        registration_status_id: registrationStatusId,
      },
    );
  }

  getEventSpeakers(eventId): Observable<IDataFormEntityResponseGroups> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.GET_EVENT_SPEAKERS),
      { params },
    );
  }

  updateRSVPStatus(token, rsvpStatus): Observable<any> {
    return this.http.put<any>(this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.UPDATE_RSVP), {
      token,
      rsvp_status: rsvpStatus,
    });
  }

  pGetEventSpeakers(eventId): Observable<IDataFormEntityResponseGroups> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<IDataFormEntityResponseGroups>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.PUBLIC_GET_EVENT_SPEAKERS),
      { params },
    );
  }

  pEventInterestedUsers(eventId): Observable<any> {
    const params = new HttpParams().set('event_id', eventId);
    return this.http.get<any>(
      this.apiRoutesService.getRoute(API_ROUTES.DATA_FORM_ENTITY_RESPONSE_GROUPS.PUBLIC_EVENT_INTERESTED_USERS),
      { params },
    );
  }
}
