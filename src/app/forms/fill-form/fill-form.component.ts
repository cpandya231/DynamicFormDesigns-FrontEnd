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
  sendBackState: any;
  isGettingSendBack: boolean = false;
  workflowId: any;
  toggleCommentsButton: boolean = false;
  showComments: boolean = false;
  events: string[] = [];
  disableSave: boolean = false;
  disabledColumns: any[];
  visibleColumns: any[];
  CurrentForm: any = {
    components: []
  };
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  IsFormLoaded = false;
  formId: number = 0;
  sendToEndState = false;
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
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    const state: any = this._location.getState();
    this.formId = state.formId;
    this.userRoles = this.authService.getRoles();

    this.formService.GetFormTemplate(this.formName, this.formId).subscribe(data => {
      this.CurrentForm.components = JSON.parse(data.template).components;
      this.workflowId = data.workflow["id"];
      this.formId = data.id;
      let transitionsObservable = this.formService.GetWorkflowStatesTransitions(this.workflowId);
      let entryDataObservable = this.formService.GetSpecificLogEntry(this.formId, this.entryId);
      let entryMetaDataObservable = this.formService.LogEntryMetadata(this.formId, this.entryId);
      this.authService.getAccessToken().asObservable().subscribe(authData => {
        const token = authData;
        Object.assign(this.CurrentForm, { 'Authorization': `Bearer ${token}` })
      });
      combineLatest([transitionsObservable, entryDataObservable, entryMetaDataObservable]).subscribe(items => {
        let transitionData = items[0];
        let entryData = items[1];
        let entryMetaData = items[2];
        if (entryData.length > 0) {
          this.processToHandleExistingEntry(entryData, entryMetaData, transitionData);
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
    let allToStates = transitionData.transitions.filter(transition => !transition.sendBackTransition).map(transition => transition.toState.id);
    let firstState = transitionData.states.find(state => !allToStates.includes(state.id) && !state.sendBackAvailable);
    let rolesForAccess = firstState?.roles.find(stateRole => this.userRoles == stateRole.role);
    this.disabledColumns = firstState?.disabledColumns?.split(',') || [];
    this.visibleColumns = firstState?.visibleColumns?.split(',') || [];

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
    this.CurrentForm.components.forEach((table: any) => {
      table.rows.forEach((rowItem: any) => {
        rowItem.forEach((rowItemComponent: any) => {
          rowItemComponent.components.forEach((component: any) => {
            if (this.disabledColumns.includes(component.key)) {
              component.disabled = true;
            }
            if (this.visibleColumns && !this.visibleColumns.includes(component.key)) {
              component.hidden = true;
            }

          });
        });
      });
    });
    this.IsFormLoaded = true;
  }

  private processToHandleExistingEntry(entryData: any, entryMetaData: any, transitionData: IGetWorkflowStateTransitionsModel) {
    let entry = entryData[0].data;

    let requiredTransition = transitionData.transitions.
      find(transition => (transition.fromState.name == entry.state && !transition.sendBackTransition)
        && transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0);
    if (null != requiredTransition) {
      this.toState = requiredTransition.toState.name;
      this.sendToEndState = requiredTransition.toState.isEndState;
      let sendBackTransition = transitionData.transitions.
        find(transition => (transition.fromState.name == entry.state && transition.sendBackTransition)
          && transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0);
      this.sendBackState = sendBackTransition?.toState.name;

    } else {
      this.toState = "no_access";
      this.disableSave = true;
    }

    let userTransition = transitionData.transitions.
      find(transition => transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0)

    this.disabledColumns = userTransition?.fromState?.disabledColumns?.split(',') || [];
    this.visibleColumns = userTransition?.fromState?.visibleColumns?.split(',') || [];

    this.CurrentForm.components.forEach((table: any) => {
      table.rows.forEach((rowItem: any) => {
        rowItem.forEach((rowItemComponent: any) => {
          rowItemComponent.components.forEach((component: any) => {

            let componentValue = entry["" + component.key];
            component.defaultValue = componentValue;
            if (this.disabledColumns.includes(component.key) || this.disableSave) {
              component.disabled = true;
            }
            if (this.visibleColumns && !this.visibleColumns.includes(component.key)) {
              component.hidden = true;
            }
            let entryMetadataInfo = entryMetaData.find((em: any) => {
              return (em.data["" + component.key])
            });
            if (entryMetadataInfo) {
              let desc = `Last updated by <b>${entryMetadataInfo.data["created_by"]} </b>`;
              component.description = desc;
            }

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
    for (let item in submittedData) {
      if (this.disabledColumns.includes(item) || !this.visibleColumns.includes(item)) {
        delete submittedData[`${item}`]
      }
    }
    if (this.entryId) {
      let logEntryObj = {
        id: this.entryId,
        state: this.isGettingSendBack ? this.sendBackState : this.toState,
        isEndState: this.sendToEndState,
        data: submittedData
      }
      this.formService.UpdateLogEntry(this.formId, logEntryObj).subscribe({
        next: (data) => {
          callback(null);
          this.close(2000);
        },
        error: (err) => {
          callback("Error occured while updating entry");
          console.log(err)
        }
      });
    } else {
      let logEntryObj = {
        state: this.toState,
        data: submittedData,
        isEndState: this.sendToEndState
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

  sendBack() {
    this.isGettingSendBack = true;
    this.onSubmit();
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
