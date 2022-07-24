import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { DisplayWorkflowStatusComponent } from 'src/app/common/display-workflow-status/display-workflow-status.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { IGetWorkflowStateTransitionsModel } from '../../form-workflow/form-workflow.model';
@Component({
  selector: 'app-user-forms-in-progress-data',
  templateUrl: './user-forms-in-progress-data.component.html',
  styleUrls: ['./user-forms-in-progress-data.component.scss']
})
export class UserFormsInProgressDataComponent implements OnInit {
  userRoles: any;
  logEntries: any[];
  formId: number;
  formName: string;
  workflowId: number;
  isDataLoaded: boolean = false;
  columns: string[];
  selectedChoice: any = 'all';
  enableCreateNewEntry: boolean = false;
  constructor(private formsService: FormsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.userRoles = this.authService.getRoles();
    let params = this.activatedRoute.snapshot.paramMap;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.workflowId = Number(params.get('workflowId') || '');
    this.getLogEntries(false);

    this.formsService.GetWorkflowStatesTransitions(this.workflowId).subscribe({
      next: (transitionData: any) => this.canCreateNewEntry(transitionData),
      error: () => alert("Something went wrong while finding transitions")
    });

  }

  private getLogEntries(filterbyusername: boolean) {
    this.formsService.GetLogEntries(this.formId, filterbyusername).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.logEntries = data;
          this.columns = Object.keys(this.logEntries[0].data);
          this.isDataLoaded = true;
        } else {
          this.logEntries = [];
          this.isDataLoaded = true;
        }

      },
      error: (err) => console.log(`Error occured for ${this.formId} error:${err}`)
    });
  }

  private canCreateNewEntry(transitionData: IGetWorkflowStateTransitionsModel) {
    let allToStates = transitionData.transitions.map(transition => transition.toState.id);
    let firstState = transitionData.states.find(state => !allToStates.includes(state.id) && !state.sendBackAvailable);
    let rolesForAccess = firstState?.roles.find(stateRole => this.userRoles == stateRole.role);
    if (rolesForAccess) {
      this.enableCreateNewEntry = transitionData.transitions.filter(transition => transition.fromState.id == firstState?.id).length > 0;
    } else {
      this.enableCreateNewEntry = false
    }


  }

  FillForm(entryId: number) {
    this.router.navigate(['../../../../updateLogEntry', this.formName, entryId], { relativeTo: this.activatedRoute, state: {formId: this.formId} });
  }

  createNewEntry() {
    this.router.navigate(['../../../../createLogEntry', this.formName], { relativeTo: this.activatedRoute, state: {formId: this.formId} });
  }


  handleChange() {
    let filterbyusername = this.selectedChoice == "username";

    this.getLogEntries(filterbyusername);
  }

  ShowProgress(entryId: number) {
    let stateStatusData,
    stateTransitionsData;
    this.formsService.LogEntryMetadata(this.formId, entryId).subscribe((metaData: any) => {
      this.formsService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: any) => {
        stateStatusData = metaData.map((state: any) => state.data);
        stateTransitionsData = data;
        const WorkflowLinks = [...this.getWorkflowLinks(stateTransitionsData.transitions)];
        const WorkflowStates = this.transformStateTransitions(stateTransitionsData, stateStatusData, WorkflowLinks);
        this.dialog.open(DisplayWorkflowStatusComponent, {
          data: {
            workflowId: this.workflowId,
            WorkflowStates,
            WorkflowLinks
          },
          panelClass: 'display-state-status',

        });
      })
    })
  }

  protected transformStateTransitions(data: any, statusData: any, workflowLinks: any): any {
    return data.states.map((state: any) => {
      const toStateName = (data.transitions.find((link: any) => (link.fromState.id === state.id) && !link.sendBackTransition))?.toState.name;
      const updateDetails = statusData.find((status: any) => status.state === toStateName);
      return {
        id: state.id,
        label: state.name,
        dimension: {
          width: 150,
          height: 50
        },
        createdBy: updateDetails ? `${updateDetails.created_by} completed at `: toStateName ? 'Pending' : '',
        timeStamp: updateDetails ? `${updateDetails.log_create_dt}` : ''
      }
    });
  }

  protected getWorkflowLinks(data: any) {
    const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    return data.map((link: any, index: number) => {
      let id = '';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return {
        id,
        source: link.fromState.id,
        target: link.toState.id
      }
    })
  }

}
