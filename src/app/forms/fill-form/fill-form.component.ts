import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { IGetWorkflowStateTransitionsModel } from '../form-workflow/form-workflow.model';
import { MatDialog } from '@angular/material/dialog';
import { ValidateUserComponent } from 'src/app/common/components/validate-user/validate-user.component';
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
  toggleCommentsButton: boolean = false;
  showComments: boolean = false;
  events: string[] = [];
  disableSave: boolean = false;
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

  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    const state:any = this._location.getState();
    this.formId = state.formId;
    this.userRoles = this.authService.getRoles();

    this.formService.GetFormTemplate(this.formName, this.formId).subscribe(data => {
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
          this.showComments = true;
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
    let allToStates = transitionData.transitions.map(transition => transition.toState.id);
    let firstState = transitionData.states.find(state => !allToStates.includes(state.id) && !state.sendBackAvailable);
    let rolesForAccess = firstState?.roles.find(stateRole => this.userRoles == stateRole.role);
    if (rolesForAccess) {
      let requiredTransition = transitionData.transitions.find(transition => transition.fromState.id == firstState?.id);
      if (requiredTransition) {
        this.toState = requiredTransition.toState.name;
      } else {
        this.toState = "no_access";
        this.disableSave = true;
      }
    } else {
      this.toState = "no_access";
      this.disableSave = true;
    }
    this.IsFormLoaded = true;
  }

  private processToHandleExistingEntry(entryData: any, transitionData: IGetWorkflowStateTransitionsModel) {
    let entry = entryData[0].data;
    let requiredTransition = transitionData.transitions.
      find(transition => (transition.fromState.name == entry.state)
        && transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0);
    if (null != requiredTransition) {
      this.toState = requiredTransition.toState.name;
    } else {
      this.toState = "no_access";
      this.disableSave = true;
    }

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
    this.IsFormLoaded = true;
    this.toggleCommentsButton = true;
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ValidateUserComponent);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.form.formio.emit('submitButton');
      }
    })
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
