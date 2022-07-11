import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { DisplayWorkflowStatusComponent } from 'src/app/common/display-workflow-status/display-workflow-status.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin} from 'rxjs';
@Component({
  selector: 'app-user-forms-in-progress-data',
  templateUrl: './user-forms-in-progress-data.component.html',
  styleUrls: ['./user-forms-in-progress-data.component.scss']
})
export class UserFormsInProgressDataComponent implements OnInit {

  logEntries: any[];
  formId: number;
  formName: string;
  isDataLoaded: boolean = false;
  columns: string[];
  selectedChoice: any = 'all';
  workflowId: number;
  constructor(private formsService: FormsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.paramMap;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.workflowId = Number(queryParams['workflowId']);
    this.formsService.GetLogEntries(this.formId, false).subscribe({
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
    })
  }

  FillForm(entryId: number) {
    this.router.navigate(['../../../updateLogEntry', this.formName, entryId], { relativeTo: this.activatedRoute });
  }

  createNewEntry() {
    this.router.navigate(['../../../createLogEntry', this.formName], { relativeTo: this.activatedRoute });
  }


  handleChange() {
    let filterbyusername = this.selectedChoice == "username";

    this.formsService.GetLogEntries(this.formId, filterbyusername).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.logEntries = data;
          this.columns = Object.keys(this.logEntries[0].data);
          this.isDataLoaded = true;
        } else {
          this.logEntries = []
        }

      },
      error: (err) => console.log(`Error occured for ${this.formId} error:${err}`)
    })
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
      const toStateName = (data.transitions.find((link: any) => link.fromState.id === state.id))?.toState.name;
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
