import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { EDataFormParentTypes, IDataForm } from 'apps/shared-models/data_form.model';
import { IQuestion } from 'apps/shared-models/question.model';
import { IQuestionChoice } from 'apps/shared-models/question_choice.model';
import { IQuestionType } from 'apps/shared-models/question_type.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NbMenuService } from '@commudle/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.scss'],
})
export class EditDataFormComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  dataForm: IDataForm;
  questionTypes: IQuestionType[];

  questionContextMenuIndex = -1;

  editDataForm: FormGroup;

  questionDescription = [];
  menuItem = [
    { title: 'Add Question Below', icon: 'plus-circle-outline' },
    { title: 'Delete Question', icon: 'trash-outline' },
  ];

  @ViewChild('cdkDrag') cdkDrag: any;

  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
    private NbmenuService: NbMenuService,
  ) {}

  get questions() {
    return this.editDataForm.get('data_form').get('questions') as FormArray;
  }

  get question_choices() {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seoService.noIndex(true);
    this.questionDescription[0] = false;
    this.handleContextMenu();

    // get the question types
    this.activatedRoute.data.subscribe((data) => {
      this.questionTypes = data.questionTypes.question_types;
    });

    // initiate the form
    this.editDataForm = this.fb.group({
      data_form: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: [''],
        questions: this.fb.array([]),
      }),
    });

    // set the controls
    this.activatedRoute.params.subscribe((data) => {
      this.dataFormsService.getDataFormDetails(data.id).subscribe((dataForm) => {
        this.dataForm = dataForm;
        this.seoService.setTitle(`Edit ${this.dataForm.name} Form`);
        this.fillExistingDataForm();
      });
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }
  // drag and drop function by CDK
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.editDataForm['controls'].data_form['controls'].questions['controls'],
      event.previousIndex,
      event.currentIndex,
    );
  }

  initQuestion(): FormGroup {
    return this.fb.group({
      question_type_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      required: [false],
      disabled: [false],
      has_responses: [false],
      question_choices: this.fb.array([]),
    });
  }

  initQuestionChoice(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
      has_responses: [false],
    });
  }

  addQuestionButtonClick(index: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).insert(index, this.initQuestion());
    this.questionDescription[index] = false;
  }

  addQuestionChoiceButtonClick(questionIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).push(this.initQuestionChoice());
  }

  removeQuestionButtonClick(questionIndex: number) {
    (this.editDataForm.get('data_form').get('questions') as FormArray).removeAt(questionIndex);
    this.questionDescription.splice(questionIndex, questionIndex + 1);
  }

  removeQuestionChoiceButtonClick(questionIndex: number, choiceIndex: number) {
    (<FormArray>(
      (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
    )).removeAt(choiceIndex);
  }

  questionTypeChange(questionType, questionIndex: number) {
    if (![4, 5].includes(questionType)) {
      const choiceCount = (<FormArray>(
        (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get('question_choices')
      )).length;
      for (let i = 0; i < choiceCount; i++) {
        (<FormArray>(
          (<FormArray>this.editDataForm.get('data_form').get('questions')).controls[questionIndex].get(
            'question_choices',
          )
        )).removeAt(0);
      }
    }
  }

  submitButtonText() {
    return this.editDataForm.valid ? 'Save' : 'Form Is Incomplete';
  }

  fillExistingDataForm() {
    this.editDataForm.get('data_form').patchValue({
      id: this.dataForm.id,
      name: this.dataForm.name,
      description: this.dataForm.description,
    });
    (this.editDataForm.get('data_form') as FormGroup).setControl(
      'questions',
      this.setDataFormQuestions(this.dataForm.questions),
    );
  }

  setDataFormQuestions(questions: IQuestion[]): FormArray {
    const formArray = new FormArray([]);
    questions.forEach((q) => {
      const exisingQuestionForm = this.fb.group({
        id: q.id,
        question_type_id: [{ value: q.question_type_id, disabled: q.has_responses }],
        title: [{ value: q.title, disabled: q.has_responses }],
        description: [{ value: q.description, disabled: q.has_responses }],
        required: [q.required],
        disabled: [q.disabled],
        has_responses: q.has_responses,
        question_choices: this.fb.array([this.initQuestionChoice()]),
      });
      (exisingQuestionForm as FormGroup).setControl('question_choices', this.setQuestionChoices(q.question_choices));
      formArray.push(exisingQuestionForm);
    });
    return formArray;
  }

  setQuestionChoices(questionChoices: IQuestionChoice[]): FormArray {
    const formArray = new FormArray([]);
    questionChoices.forEach((qc) => {
      formArray.push(
        this.fb.group({
          id: [qc.id],
          title: [{ value: qc.title, disabled: qc.has_responses }],
          has_responses: qc.has_responses,
        }),
      );
    });

    return formArray;
  }

  updateDataForm() {
    if (this.editDataForm.invalid) {
      this.editDataForm.markAllAsTouched();
      return;
    }
    this.dataFormsService.updateDataForm(this.editDataForm.getRawValue().data_form).subscribe((dataForm) => {
      this.dataForm = dataForm;
      this.fillExistingDataForm();
      this.toastLogService.successDialog('Updated!');

      switch (this.dataForm.parent_type) {
        case EDataFormParentTypes.community: {
          this.router.navigate(['/admin/communities', this.dataForm.parent_id, 'forms']);
          break;
        }
        case EDataFormParentTypes.adminSurvey: {
          this.router.navigate(['/sys-admin/admin-surveys']);
        }
      }
    });
  }

  cloneCommunityDataForm() {
    this.dataFormsService.cloneCommunityForm(this.dataForm.id).subscribe((data) => {
      this.router.navigate(['/forms', data.id, 'edit']);
      this.toastLogService.successDialog('Form Cloned!');
    });
  }

  toggleDescriptionField(index: number): void {
    this.questionDescription[index] = !this.questionDescription[index];
  }

  setContextIndex(index: number) {
    this.questionContextMenuIndex = index;
  }

  handleContextMenu(): void {
    this.NbmenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === `data-form-question-context-menu-${this.questionContextMenuIndex}`),
        map(({ item: title }) => title),
      )
      .subscribe((menu) => {
        switch (menu.title) {
          case 'Add Question Below':
            this.addQuestionButtonClick(this.questionContextMenuIndex + 1);
            break;

          case 'Delete Question':
            this.removeQuestionButtonClick(this.questionContextMenuIndex);
            break;
        }
      });
  }
}
