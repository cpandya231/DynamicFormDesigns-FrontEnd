import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditWorkflowStateComponent } from './add-edit-workflow-state/add-edit-workflow-state.component';

@Component({
  selector: 'app-form-workflow',
  templateUrl: './form-workflow-dashboard.component.html',
  styleUrls: ['./form-workflow-dashboard.component.scss']
})
export class FormWorkflowComponent implements OnInit {

  @Input('workflowId') workflowId: number;
  WorkflowStates!: any;
  constructor(private formService: FormsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
    if (this.workflowId) {
      this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: any) => {
        this.WorkflowStates = this.transformStateTransitions(data);
      });
    }
  }

  handleStateEvent(event: any) {
    console.log(event);
  }

  AddNewState() {
    const dialofRef = this.dialog.open(AddEditWorkflowStateComponent, {
      data: {
        workflowId: this.workflowId
      }
    });

    dialofRef.afterClosed().subscribe((data: any) => {
      if (data) {
          this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: any) => {
            this.WorkflowStates = this.transformStateTransitions(data);
            console.log(this.WorkflowStates);
        });
      }
    })
  }

  protected transformStateTransitions(data: any): any {
    const transitions = data.transitions;
    return data.states.map((state: any) => {
      const parentId = transitions.find((trans: any) => trans.fromState.id === state.id) || '';
      return {
        ...state,
        parentId: parentId?.toState?.id || ''
      }
    });
  }
}



