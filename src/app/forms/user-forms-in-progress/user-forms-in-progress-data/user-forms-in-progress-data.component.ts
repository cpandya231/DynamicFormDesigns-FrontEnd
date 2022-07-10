import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.userRoles = this.authService.getRoles();
    let params = this.activatedRoute.snapshot.paramMap;
    this.formId = Number(params.get('formId') || '');
    this.formName = String(params.get('formName') || '');
    this.workflowId = Number(params.get('workflowId') || '');
    this.getLogEntries(false);

    this.formsService.GetWorkflowStatesTransitions(this.workflowId).subscribe({
      next: (transitionData) => this.canCreateNewEntry(transitionData),
      error: (err) => alert("Something went wrong while finding transitions")
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
    this.router.navigate(['../../../../updateLogEntry', this.formName, entryId], { relativeTo: this.activatedRoute });
  }

  createNewEntry() {
    this.router.navigate(['../../../../createLogEntry', this.formName], { relativeTo: this.activatedRoute });
  }


  handleChange() {
    let filterbyusername = this.selectedChoice == "username";

    this.getLogEntries(filterbyusername);
  }


}
