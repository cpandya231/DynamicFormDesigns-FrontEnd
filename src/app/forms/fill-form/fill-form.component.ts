import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { Location } from '@angular/common';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { IGetWorkflowStateTransitionsModel } from '../form-workflow/form-workflow.model';
import { MatDialog } from '@angular/material/dialog';
import { ValidateUserComponent } from 'src/app/common/components/validate-user/validate-user.component';
import { UsersService } from 'src/app/services/users.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
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
  exportData: any = [];
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
  editingMasterData = false;
  IsMasterForm = false;
  transitionData: any;
  sendToButtonLabel: string | undefined = '';
  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private dialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('formName') || '');
    this.entryId = Number(params.get('entryId') || '');
    const state: any = this._location.getState();
    this.formId = state.formId;
    this.userRoles = this.authService.getRoles();
    this.IsMasterForm = state.isMasterForm;

    this.userService.getUserByUsername(localStorage.getItem("username")).subscribe(userData => {
      Object.assign(this.CurrentForm, {
        department: userData.department
      })
    });

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
        this.transitionData = items[0];
        let entryData = items[1];
        let entryMetaData = items[2];
        entryMetaData.forEach((em: any) => {
          let emTranstions = this.transitionData.transitions.find((tr: any) => tr.toState.name == em["data"].state);
          em["data"]["fromState"] = emTranstions["fromState"]["label"];
        })
        if (entryData.length > 0) {
          this.processToHandleExistingEntry(entryData, entryMetaData, this.transitionData);
          this.showComments = true;
        } else {
          if (this.entryId > 0) {
            alert(`No Valid entry found for entryId ${this.entryId}`);
          } else {
            this.processToHandleNewEntry(this.transitionData);
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
        this.sendToButtonLabel = firstState?.label;
        this.sendToEndState = requiredTransition.toState.endState;
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
    const currentState = transitionData.states.find(state => state.name === entry.state);
    let requiredTransition = transitionData.transitions.
      find(transition => (transition.fromState.name == entry.state && !transition.sendBackTransition)
        && transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0);
    if (null != requiredTransition) {
      this.toState = requiredTransition.toState.name;
      this.sendToButtonLabel = currentState?.label;
      this.sendToEndState = requiredTransition.toState.endState;
      let sendBackTransition = transitionData.transitions.
        find(transition => (transition.fromState.name == entry.state && transition.sendBackTransition)
          && transition.fromState.roles.filter(transitionRole => this.userRoles == transitionRole.role).length > 0);
      this.sendBackState = sendBackTransition?.toState.name;
    } else if (currentState?.endState && this.IsMasterForm) {
      this.processToHandleNewEntry(this.transitionData);
    } else {
      this.toState = "no_access";
      this.disableSave = true;
    }

    this.disabledColumns = requiredTransition?.fromState?.disabledColumns?.split(',') || [];
    this.visibleColumns = requiredTransition?.fromState?.visibleColumns?.split(',') || [];

    this.CurrentForm.components.forEach((table: any) => {
      table.rows.forEach((rowItem: any) => {
        rowItem.forEach((rowItemComponent: any) => {
          rowItemComponent.components.forEach((component: any) => {

            let componentValue = entry["" + component.key];
            component.defaultValue = componentValue;
            if (this.disabledColumns.includes(component.key) || (this.disableSave)) {
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
    let exportSection = [];
    let elementData = entry;

    for (let item in elementData) {
      exportSection.push([item, elementData[item]]);
    }
    this.exportData.push({
      state: elementData["state"],
      data: exportSection,
      update_history: entryMetaData
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
    if (submittedData.apiList !== undefined && Object.values(submittedData.apiList).length) {
      let observableList: Observable<string>[] = [];
      let metaData = {};
      (Object.values(submittedData.apiList)).forEach((apiData: any) => {
        if (apiData.api) {
          observableList.push(this.formService.updateMasterEntry(apiData, this.formId));
        }
      });

      // && !components.fixEquipmentOperation.disabled
      combineLatest(observableList)
        .subscribe({
          next: (data) => {
            submittedData.apiList = '';
            // for (let item in submittedData) {
            //   if (this.disabledColumns.includes(item) || !this.visibleColumns.includes(item)) {
            //     delete submittedData[`${item}`]
            //   }
            // }
            this.tempFunction(submittedData, callback);
          },
          error: (err) => {
            callback(err.error.message);
            console.log(err.error.message)
          }
        })
    } else {
      submittedData.apiList = '';
      this.tempFunction(submittedData, callback);
    }

  }

  sendBack() {
    this.isGettingSendBack = true;
    this.onSubmit();
  }

  EditMasterData() {
    this.editingMasterData = true;
    this.processToHandleNewEntry(this.transitionData);
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

  tempFunction(submittedData: any, callback: any) {
    if (this.entryId) {
      let logEntryObj = {
        id: this.entryId,
        state: this.isGettingSendBack ? this.sendBackState : this.toState,
        endState: this.sendToEndState,
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
        endState: this.sendToEndState
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

  exportToPDF() {
    const doc = new jsPDF();

    var img = new Image()
    img.src = 'assets/Images/digit4.png'

    doc.addImage(img, 'png', 10, 0, 70, 20);
    doc.setTextColor("#00ADB5");
    doc.text(`Audit record for ${this.formName} - ${this.formName.charAt(0)}${this.formName.charAt((this.formName.length) / 2)}-${this.entryId} `, 100, 12);
    doc.setTextColor(0, 0, 0);
    var finalY = (doc as any).lastAutoTable.finalY || 30;
    doc.text(`Form Name  : ${this.formName}`, 14, finalY);

    this.exportData.forEach((element: any) => {
      finalY = finalY + 10;

      autoTable(doc, {
        head: [['Reference', 'New Value']],
        body: element["data"],
        startY: finalY
      });
      finalY = (doc as any).lastAutoTable.finalY;
      doc.setFontSize(8)
      element["update_history"].forEach((history: any) => {
        finalY += 10;
        let historyData = history["data"];

        doc.text(`${historyData["fromState"]} by :`, 14, finalY);
        doc.text(`${historyData["created_by"]} on ${historyData["log_create_dt"]}`, 14 + historyData["fromState"].length + 10, finalY);


      });
    });



    doc.save('tableToPdf.pdf');
  }
}
