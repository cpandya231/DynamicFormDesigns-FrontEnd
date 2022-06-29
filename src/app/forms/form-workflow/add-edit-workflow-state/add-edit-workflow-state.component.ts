import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from 'src/app/common/services/forms.service';
import { IDepartmentItem } from 'src/app/departments/department-item-model';
import { DepartmentService } from 'src/app/services/departments.service';
import { RoleService } from 'src/app/services/roles.service';
import { IWorkflowStateModel } from '../form-workflow.model';

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
  existingStateData!: IWorkflowStateModel;
  ModalHeaderText = 'Create State';
  ShowErrorFields = false;
  SaveButtonName = 'Save State';
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
    this.existingStateData = this.dialogData.stateData;
    if (this.existingStateData) {
      this.ModalHeaderText = 'Update State';
      this.SaveButtonName = 'Update State';
      this.StateDetailsForm = this.fb.group ({
        name: [this.existingStateData.name],
        description: [this.existingStateData.description],
        previousState: [this.existingStateData.parentId],
        multiPreviousStateCompletion: [false],
        roleStateAccess: [this.existingStateData.roles.map((e: any) => e.id)],
        departmentStateAccess: [this.existingStateData.departments.map((e: any) => e.id)],
        sendBackAvailable: [false],
        triggerEmail: [false],
        triggerSMS: [false],
        eSignRequired: [false],
        sendBackTo: ['']
      });
      if (this.existingStateData?.parentName?.length) {
        this.StateDetailsForm.controls['previousState'].setValidators([Validators.required]);
      }
    } else {
      this.StateDetailsForm = this.fb.group ({
        name: ['', Validators.required],
        description: [''],
        previousState: [this.dialogData.previousStateId],
        multiPreviousStateCompletion: [false],
        roleStateAccess: [[]],
        departmentStateAccess: [[]],
        sendBackAvailable: [false],
        triggerEmail: [false],
        triggerSMS: [false],
        eSignRequired: [false],
        sendBackTo: ['']
      });
      if (this.WorkflowStates.length) {
        this.StateDetailsForm.controls['previousState'].setValidators([Validators.required]);
      }
    }
  }

  SaveState() {
    if (this.StateDetailsForm.invalid) {
      this.ShowErrorFields = true;
      return;
    }
    this.ShowErrorFields = false;
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
        id: this.existingStateData?.id || this.tempStateId,
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
