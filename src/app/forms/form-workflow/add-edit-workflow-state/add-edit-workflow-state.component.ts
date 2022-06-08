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
  WorkflowStates: any = [];
  tempStateId!: number;
  constructor(private fb: FormBuilder,
    private departmentService: DepartmentService,
    private formService: FormsService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<AddEditWorkflowStateComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.tempStateId = this.dialogData.tempId;
    this.departmentService.getAllDepartment().subscribe(data => {
      this.Departments = data;
    });
    this.roleService.getAllRoles().subscribe(items => {
      this.Roles = items;
    })
    this.WorkflowStates = this.dialogData.states;
    const stateData = this.dialogData.stateData;
    if (stateData) {
      this.StateDetailsForm = this.fb.group ({
        name: [stateData.name],
        description: [stateData.description],
        previousState: [stateData.parentId],
        multiPreviousStateCompletion: [false],
        roleStateAccess: [stateData.roles.map((e: any) => e.id)],
        departmentStateAccess: [stateData.departments.map((e: any) => e.id)],
        sendBackAvailable: [false],
        triggerEmail: [false],
        triggerSMS: [false],
        eSignRequired: [false],
        sendBackTo: ['']
      });
    } else {
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
  }

  SaveState() {
    const stateData = {
      workflowId: this.dialogData.workflowId,
      state: {
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
        id: this.tempStateId,
        parentId: this.StateDetailsForm.value.previousState,
        parentName: this.WorkflowStates.find((state: any) => state.id === this.StateDetailsForm.value.previousState)?.name
      },
     
    };
    this.dialogRef.close(stateData);
  }

  Cancel() {
    this.dialogRef.close(false);
  }
}
