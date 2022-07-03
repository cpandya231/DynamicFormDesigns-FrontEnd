import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { IGetWorkflowStateTransitionsModel } from '../form-workflow/form-workflow.model';
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formName: any;
  entryId: any;
  userRoles: any;
  toState: any;
  workflowId: any;
  disableSave: boolean = false;
  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }
  CurrentForm: any = {
    components: []
  };
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  IsFormLoaded = false;
  formId: number = 0;
  FormOptions = {
    "hooks": {
      "beforeSubmit": this.beforeSubmit.bind(this),

    },
    "alerts": {
      "submitMessage": "Entry created/updated successfully"
    }

  };



  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    this.userRoles = this.authService.getRoles();


    this.formService.GetFormTemplate(this.formName).subscribe(data => {

      this.CurrentForm.components = JSON.parse(data.template).components;
      this.workflowId = data.workflow["id"];

      this.formId = data.id;
      let transitionsObservable = this.formService.GetWorkflowStatesTransitions(this.workflowId);
      let entryDataObservable = this.formService.GetSpecificLogEntry(this.formId, this.entryId);
      combineLatest([transitionsObservable, entryDataObservable]).subscribe(items => {
        let transitionData = items[0];
        let entryData = items[1];


        if (entryData.length > 0) {
          this.processToHandleExistingEntry(entryData, transitionData);


        } else {
          if (this.entryId > 0) {
            alert(`No Valid entry found for entryId ${this.entryId}`);
          } else {
            this.processToHandleNewEntry(transitionData);

          }

        }

      })
    })
  }


  private processToHandleNewEntry(transitionData: IGetWorkflowStateTransitionsModel) {
    let requiredTransition = transitionData.transitions.find(transition => transition.fromState.roles.filter(transtionRole => this.userRoles.includes(transtionRole.role)).length > 0);
    if (null != requiredTransition) {
      this.toState = requiredTransition.toState.name;
    } else {
      this.toState = "no_access";
    }
    this.IsFormLoaded = true;
  }

  private processToHandleExistingEntry(entryData: any, transitionData: IGetWorkflowStateTransitionsModel) {
    let entry = entryData[0].data;

    let requiredTransition = transitionData.transitions.find(transition => transition.fromState.name == entry.state);
    if (null != requiredTransition) {
      this.toState = requiredTransition.toState.name;

    } else {
      this.toState = "no_access";
    }

    this.IsFormLoaded = true;
    this.CurrentForm.components.forEach((table: any) => {
      table.rows.forEach((rowItem: any) => {
        rowItem.forEach((rowItemComponent: any) => {
          rowItemComponent.components.forEach((component: any) => {
            let componentValue = entry["" + component.key];
            component.defaultValue = componentValue;
          });
        });
      });
    });
  }

  onSubmit() {
    this.form.formio.emit('submitButton');



  }

  handleSubmit(submission: any, callback: any) {


    let submittedData = this.form.formio.submission.data;

    if (this.entryId) {
      let logEntryObj = {
        id: this.entryId,
        state: this.toState,
        data: submittedData

      }
      this.formService.UpdateLogEntry(this.formId, logEntryObj).subscribe({
        next: (data) => {
          callback(null);
          this.close(200);
        },
        error: (err) => {
          callback("Error occured while updating entry");
          console.log(err)
        }
      });

    } else {
      let logEntryObj = {
        state: this.toState,
        data: submittedData
      }
      this.formService.SaveLogEntry(this.formId, logEntryObj).subscribe({
        next: (data) => {
          callback(null)
          this.close(2000);

        },
        error: (err) => {
          callback(`You don't have access to update this entry`);
          console.log(err)
        }
      });


    }
  }


  close(delay: number) {
    setTimeout(() => {                           // <<<---using ()=> syntax
      this._location.back();
    }, delay);

  }

  beforeSubmit(submission: any, callback: any) {


    if (this.toState == "no_access") {
      this.disableSave = true;
      callback(`You don't have access to update this entry`);

    } else {
      this.handleSubmit(submission, callback);
    }

  }





}