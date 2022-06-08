import { Component, Input, OnInit } from '@angular/core';
import { FormsService } from 'src/app/common/services/forms.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditWorkflowStateComponent } from './add-edit-workflow-state/add-edit-workflow-state.component';
import { IGetWorkflowStateTransitionsModel, IWorkflowStateModel } from './form-workflow.model';

@Component({
  selector: 'app-form-workflow',
  templateUrl: './form-workflow-dashboard.component.html',
  styleUrls: ['./form-workflow-dashboard.component.scss']
})
export class FormWorkflowComponent implements OnInit {

  @Input('workflowId') workflowId: number;
  WorkflowStates: IWorkflowStateModel[] = [];
  tempId: number = 1;
  tempTransitions: any = [];
  StateWorkflowData: IWorkflowStateModel[]= [];
  IsStatesTransitionsExist = false;
  constructor(private formService: FormsService,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
    if (this.workflowId) {
      this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: IGetWorkflowStateTransitionsModel) => {
        if (data.states.length) {
          this.IsStatesTransitionsExist = true;
          this.WorkflowStates = this.transformStateTransitions(data);
          this.StateWorkflowData = ([] as IWorkflowStateModel[]).concat(this.WorkflowStates);
          this.tempId = data.states.reduce((a, b)=> Math.max(a, b.id), 0);
        }
      });
    }
  }

  handleStateEvent(data: any) {
    let stateName = data["branch-id"]["nodeValue"];
    let eventType = data["event-type"]["nodeValue"];
    if (eventType == 'add') {
      this.AddEditState(null);
    } else if (eventType == 'edit') {
      const stateData = this.WorkflowStates.find((state: any) => state.name === stateName);
      this.AddEditState(stateData);
    }
  }

  AddEditState(stateData: any) {
    ++this.tempId;
    const dialofRef = this.dialog.open(AddEditWorkflowStateComponent, {
      data: {
        workflowId: this.workflowId,
        stateData,
        states: this.WorkflowStates,
        tempId: this.tempId
      }
    });

    dialofRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.WorkflowStates.push(data.state);
        this.StateWorkflowData = ([] as IWorkflowStateModel[]).concat(this.WorkflowStates);
      }
    })
  }

  SaveWorkflow(): void {
    const data = {
      workflowId: this.workflowId,
      states: this.WorkflowStates.map((state: any) => {
        return {
          name: state.name,
          description: state.description,
          roles: state.roles,
          departments: state.departments,
        }
      })
    }
  
    if(this.IsStatesTransitionsExist) {
      this.formService.UpdateFormWorkflowState(data).subscribe((data: any) => {
        this.saveStateTransitions(data.states, true);
      })
    } else {
      this.formService.SaveFormWorkflowState(data).subscribe((data: any) => {
        this.IsStatesTransitionsExist = true;
        this.saveStateTransitions(data, false);
      });
    }
  }

  protected saveStateTransitions(stateData: any, updateData: boolean) {
    const transitions: any[] = [];
    stateData.forEach((response: any) => {
      const parentName = this.StateWorkflowData.find((state: any) => state.name === response.name)?.parentName;
      if (parentName) {
        transitions.push({
          fromState: {
            id: stateData.find((ele: any) => ele.name === parentName).id
          },
          toState: {
            id: response.id
          }
        })
      }
    });
    const payload = {
      workflowId: this.workflowId,
      transitions: transitions
    }
    if (!updateData) {
      this.formService.SaveStatesTransitions(payload).subscribe((transitionData: any) => {
        console.log(transitionData);
      })
    } else {
      this.formService.UpdateStatesTransitions(payload).subscribe((trasitionData: any) => {
        console.log(trasitionData);
      })
    }
    
  }

  protected transformStateTransitions(data: any): any {
    const transitions = data.transitions;
    return data.states.map((state: any) => {
      const parent = transitions.find((trans: any) => trans.toState.id === state.id) || '';
      return {
        ...state,
        parentId: parent?.fromState?.id || '',
        parentName: parent?.fromState?.name
      }
    });
  }
}



