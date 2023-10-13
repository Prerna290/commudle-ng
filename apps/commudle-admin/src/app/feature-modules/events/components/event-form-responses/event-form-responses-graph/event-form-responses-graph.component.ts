import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EQuestionTypes } from 'apps/shared-models/enums/question_types.enum';
import { IQuestion } from 'apps/shared-models/question.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'commudle-event-form-responses-graph',
  templateUrl: './event-form-responses-graph.component.html',
  styleUrls: ['./event-form-responses-graph.component.scss'],
})
export class EventFormResponsesGraphComponent implements OnInit, OnDestroy {
  isLoading = true;
  @Input() forms;
  @Input() eventDataFormEntityGroupId;
  @Input() filterValue;
  @Input() registrationStatusId;
  @Input() page;
  @Input() count;
  @Input() gender;
  @Input() selectedEventLocationTrackId;
  @Input() question: IQuestion;
  @Input() showGenderGraphOnly = false;
  EQuestionTypes = EQuestionTypes;
  responses;
  responseChart;
  diversityChat;
  showChartView = false;
  constructor(private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService) {}

  ngOnInit(): void {
    this.getResponses();
    if (this.question) {
      if (
        this.question.question_type_id === EQuestionTypes.MULTIPLE_CHOICE ||
        this.question.question_type_id === EQuestionTypes.SINGLE_CHOICE
      ) {
        this.showChartView = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.diversityChat) {
      this.diversityChat.destroy();
    }
    if (this.responseChart) {
      this.responseChart.destroy();
    }
  }

  getResponses() {
    const formData = new FormData();
    this.isLoading = false;
    if (this.forms.length > 0) {
      for (const form of this.forms) {
        if (form && form.get('v').value !== '') {
          formData.append(`qres[]q`, form.get('q').value);
          formData.append(`qres[]v`, form.get('v').value);
        }
      }
    }
    this.dataFormEntityResponseGroupsService
      .getEventDataFormResponsesByFilter(
        this.eventDataFormEntityGroupId,
        this.filterValue,
        this.registrationStatusId,
        this.page,
        this.count,
        this.question ? this.question.id : '',
        this.gender,
        this.selectedEventLocationTrackId,
        formData,
      )
      .subscribe((data) => {
        this.responses = data.responses;
        this.diversityChat = new Chart(`diversity`, {
          type: 'pie',
          data: {
            datasets: [
              {
                data: [
                  data.diversity.male,
                  data.diversity.female,
                  data.diversity.prefer_not_to_answer,
                  data.diversity.NA,
                ],
                backgroundColor: ['blue', '#ff43bc', 'purple', 'green'],
              },
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
              `Male (${data.diversity.male ? data.diversity.male : 0})`,
              `Female (${data.diversity.female ? data.diversity.female : 0})`,
              `Prefer Not To Answer (${data.diversity.prefer_not_to_answer ? data.diversity.prefer_not_to_answer : 0})`,
              `NA (${data.diversity.NA ? data.diversity.NA : 0})`,
            ],
          },
          options: {
            responsive: true,
          },
        });
        if (!this.showGenderGraphOnly) {
          this.responseChart = new Chart(`responses`, {
            type: 'pie',
            data: {
              datasets: [
                {
                  data: Object.values(this.responses).map((row) => row),
                  backgroundColor: ['blue', '#ff43bc', 'purple', 'green', 'red', 'yellow', 'orange', 'pink'],
                },
              ],
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: Object.keys(this.responses),
            },
            options: {
              responsive: true,
            },
          });
        }
      });
  }
}
