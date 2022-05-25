import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from 'src/app/common/services/forms.service';
import { IDepartmentItem } from 'src/app/departments/department-item-model';
import { DepartmentService } from 'src/app/services/departments.service';
import { RoleService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-edit-workflow-state',
  templateUrl: './add-edit-workflow-state.component.html',
  styleUrls: ['./add-edit-workflow-state.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditWorkflowStateComponent implements OnInit {

  StateDetailsForm!: FormGroup;
  Roles: any[] = [];
  Departments: IDepartmentItem[] = [];
  WorkflowStates!: any;
  constructor(private fb: FormBuilder,
    private departmentService: DepartmentService,
    private formService: FormsService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<AddEditWorkflowStateComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {workflowId: string}) { }

  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.Departments = data;
    });
    this.roleService.getAllRoles().subscribe(items => {
      this.Roles = items;
    })
    this.formService.GetWorkflowStatesTransitions(Number(this.dialogData.workflowId)).subscribe((data: any) => {
      this.WorkflowStates = data.states
    });
    this.StateDetailsForm = this.fb.group ({
      name: [''],
      description: [''],
      previousState: [null],
      multiPreviousStateCompletion: [false],
      roleStateAccess: [[]],
      departmentStateAccess: [[]],
      sendBackAvailable: [false],
      triggerEmail: [false],
      triggerSMS: [false],
      eSignRequired: [false],
      sendBackTo: ['']
    });
  }

  SaveState() {
    console.log(this.StateDetailsForm.value);
    const stateData = {
      workflowId: this.dialogData.workflowId,
      states: [{
        name: this.StateDetailsForm.value.name,
        description : this.StateDetailsForm.value.description,
        roles : this.StateDetailsForm.value.roleStateAccess.map((roleId: number) => {
          return {
            id: roleId
          }
        }),
        departments :  this.StateDetailsForm.value.departmentStateAccess.map((roleId: number) => {
          return {
            id: roleId
          }
        }), 
      }]
    };
  
    this.formService.SaveFormWorkflowState(stateData).subscribe((data: any) => {
      if (this.StateDetailsForm.value.previousState) {
        const stateTransitions = {
          workflowId: this.dialogData.workflowId,
          transitions: [
            {
              fromState: {
                id: data[0].id
              },
              toState: {
                id: this.StateDetailsForm.value.previousState
              } 
          }]
        };
        this.formService.SaveStatesTransitions(stateTransitions).subscribe((data: any) => {
          console.log(data);
          this.dialogRef.close(true);
        })
      } else {
        this.dialogRef.close(true);
      }
    });
  }

  Cancel() {
    this.dialogRef.close(false);
  }
}
