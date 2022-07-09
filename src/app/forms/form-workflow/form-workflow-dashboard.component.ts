import { Component, Input, OnInit } from '@angular/core';
import { FormsService } from 'src/app/common/services/forms.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditWorkflowStateComponent } from './add-edit-workflow-state/add-edit-workflow-state.component';
import { IGetWorkflowStateTransitionsModel, IWorkflowStateModel } from './form-workflow.model';
import { Router } from '@angular/router';
import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-workflow',
  templateUrl: './form-workflow-dashboard.component.html',
  styleUrls: ['./form-workflow-dashboard.component.scss']
})
export class FormWorkflowComponent implements OnInit {

  @Input('workflowId') workflowId: number;
  WorkflowStates: any[] = [];
  tempId: number = 1;
  tempTransitions: any = [];
  // StateWorkflowData: IWorkflowStateModel[] = [];
  IsStatesTransitionsExist = false;
  stateDataBeforeEdit: IWorkflowStateModel;
  private isDialogOpen = false;
  IsSaveWorkflowDisabled = true;
  WorkflowLinks:Edge[] = [];
  curve: any = shape.curveLinear;
  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = false;
  zoomSpeed: number = 0.2;
  minZoomLevel: number = 0.5;
  maxZoomLevel: number = 2.0;
  panOnZoom: boolean = true;
  autoCenter = true;
  constructor(private formService: FormsService,
    private dialog: MatDialog,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.workflowId) {
      this.formService.GetWorkflowStatesTransitions(this.workflowId).subscribe((data: IGetWorkflowStateTransitionsModel) => {
        if (data.states.length) {
          this.IsStatesTransitionsExist = true;
          this.WorkflowStates = this.transformStateTransitions(data);
          this.WorkflowLinks = [...this.getWorkflowLinks(data.transitions)];
          // this.StateWorkflowData = ([] as IWorkflowStateModel[]).concat(this.WorkflowStates);
          this.tempId = data.states.reduce((a, b) => Math.max(a, b.id), 0);
        }
      });
    }
  }
  
  AddState() {
    if (this.isDialogOpen) return;
    this.isDialogOpen = true;
    ++this.tempId;
  
    const dialogRef = this.dialog.open(AddEditWorkflowStateComponent, {
      data: {
        workflowId: this.workflowId,
        stateData: null,
        states: this.WorkflowStates,
        tempId: this.tempId,
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.isDialogOpen = false;
      if (data) {
        this.processStateData(data.state);
      }
    })
  }

  EditState(stateData: any) {
    const beforeEditStateData = stateData;
    const stateIndex = this.WorkflowStates.findIndex(state => state.id == stateData.id);
    this.WorkflowStates.splice(stateIndex, 1);
    const beforeEditLinks = this.WorkflowLinks.filter(link => link.target == stateData.id);
    this.WorkflowLinks = this.WorkflowLinks.filter(link => link.target !== stateData.id);

    const dialogRef = this.dialog.open(AddEditWorkflowStateComponent, {
      data: {
        workflowId: this.workflowId,
        stateData,
        states: this.WorkflowStates,
        tempId: this.tempId,
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.isDialogOpen = false;
      if (data) {
        this.processStateData(data.state);
      } else {
        this.WorkflowStates = [...this.WorkflowStates, beforeEditStateData];
        this.WorkflowLinks = [...this.WorkflowLinks, ...beforeEditLinks];
      }
    })
  }

  SaveWorkflow(): void {
    this.IsSaveWorkflowDisabled = true;
    const data = {
      workflowId: this.workflowId,
      states: this.WorkflowStates.map((state: any) => {
        return {
          name: state.label,
          description: state.description,
          roles: state.roles,
          departments: state.departments,
        }
      })
    }

    if (this.IsStatesTransitionsExist) {
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
    let transitions: any[] = [];
    let getNewIdFromName: any = {};
    let getNameFromOldId: any = {};
    stateData.forEach((response: any) => {
      getNewIdFromName[response.name] = response.id;
    });
    this.WorkflowStates.forEach(state => {
      getNameFromOldId[state.id] = state.label;
    });
    transitions = this.WorkflowLinks.map(link => ({
      fromState: {
        id: getNewIdFromName[getNameFromOldId[link.source]]
      },
      toState: {
        id: getNewIdFromName[getNameFromOldId[link.target]]
      }
    }))
  
    const payload = {
      workflowId: this.workflowId,
      transitions: transitions
    }
    if (!updateData) {
      this.formService.SaveStatesTransitions(payload).subscribe((transitionData: any) => {
        this.toastrService.success('Saved Successfully', 'Success')
      })
    } else {
      this.formService.UpdateStatesTransitions(payload).subscribe((trasitionData: any) => {
        this.toastrService.success('Saved Successfully', 'Success')
      })
    }
  }

  protected processStateData(state: any) {
    this.IsSaveWorkflowDisabled = false;
    this.WorkflowStates = [...this.WorkflowStates ,state];
    if (state?.parentId) {
      this.WorkflowLinks.push({
        source: state.parentId,
        target: state.id
      })
    }
    if (state?.sendBackAvailable) {
      this.WorkflowLinks.push({
        target: state.parentId,
        source: state.id
      })
    }
  }

  protected transformStateTransitions(data: any): any {
    const transitions = data.transitions;
    return data.states.map((state: any) => {
      const parent = transitions.find((trans: any) => trans.toState.id === state.id) || '';
      return {
        id: state.id,
        label: state.name,
        dimension: {
          width: 150,
          height: 50
        },
        roles: state.roles,
        departments: state.departments,
        description: state.description,
        parentId: parent?.fromState?.id || '',
        parentName: parent?.fromState?.name
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



