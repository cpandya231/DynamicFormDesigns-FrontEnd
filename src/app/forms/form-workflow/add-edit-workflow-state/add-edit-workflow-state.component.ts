import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  existingStateData!: any;
  ModalHeaderText = 'Create State';
  ShowErrorFields = false;
  SaveButtonName = 'Save State';
  FieldsList: any[] = [];
  constructor(private fb: FormBuilder,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<AddEditWorkflowStateComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  get fields(): FormArray {
    return this.StateDetailsForm?.get('fields') as FormArray;
  }

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
    this.FieldsList = this.dialogData.fieldsList;
    if (this.existingStateData) {
      const visibleFields = this.existingStateData.visibleColumns.split(',');
      const disabledFields = this.existingStateData.disabledColumns.split(',');
      this.ModalHeaderText = 'Update State';
      this.SaveButtonName = 'Update State';
      this.StateDetailsForm = this.fb.group({
        name: [this.existingStateData.label],
        description: [this.existingStateData.description],
        previousState: [this.existingStateData.parentId],
        multiPreviousStateCompletion: [false],
        roleStateAccess: [this.existingStateData.roles.map((e: any) => e.id)],
        departmentStateAccess: [this.existingStateData.departments.map((e: any) => e.id)],
        sendBackAvailable: [this.existingStateData.sendBackAvailable],
        triggerEmail: [false],
        triggerSMS: [false],
        eSignRequired: [false],
        sendBackTo: [''],
        fields: this.fb.array([]),
        isEndState: [this.existingStateData.isEndState]
      });

      this.FieldsList.forEach((field: any) => {
        if (visibleFields.find((ele: string) => ele === field.key)) {
          field.visible = true;
        } else {
          field.visible = false;
        }
        if (disabledFields.find((ele: string) => ele === field.key)) {
          field.disabled = true;
        } else {
          field.disabled = false;
        }
        this.fields.push(this.fb.group({
          visible: [field.visible],
          disabled: [field.disabled]
        }));
      })

      if (this.existingStateData?.parentName?.length) {
        this.StateDetailsForm.controls['previousState'].setValidators([Validators.required]);
      }
    } else {
      this.StateDetailsForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        previousState: [''],
        multiPreviousStateCompletion: [false],
        roleStateAccess: [[]],
        departmentStateAccess: [[]],
        sendBackAvailable: [false],
        triggerEmail: [false],
        triggerSMS: [false],
        eSignRequired: [false],
        sendBackTo: [''],
        fields: this.fb.array([]),
        isEndState: [false]
      });
      this.FieldsList.forEach(() => {
        this.fields.push(this.fb.group({
          visible: [true],
          disabled: [false]
        }));
      })
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
    let visibleColumns = '';
    let disabledColumns = '';
    this.StateDetailsForm.value.fields.forEach((field: any, index: number) => {
      if (field.visible) {
        visibleColumns = visibleColumns + this.FieldsList[index].key + ',';
      }
      if (field.disabled) {
        disabledColumns = disabledColumns + this.FieldsList[index].key + ',';
      }
    })
    const stateData = {
      workflowId: this.dialogData.workflowId,
      state: {
        label: this.StateDetailsForm.value.name,
        description: this.StateDetailsForm.value.description,
        roles: this.StateDetailsForm.value.roleStateAccess.map((roleId: number) => {
          return {
            id: roleId
          }
        }),
        departments: this.StateDetailsForm.value.departmentStateAccess.map((roleId: number) => {
          return {
            id: roleId
          }
        }),
        id: this.existingStateData?.id || this.tempStateId,
        parentId: this.StateDetailsForm.value.previousState,
        parentName: this.WorkflowStates.find((state: any) => state.id === this.StateDetailsForm.value.previousState)?.name,
        sendBackAvailable: this.StateDetailsForm.value.sendBackAvailable,
        dimension: {
          width: 150,
          height: 50
        },
        visibleColumns,
        disabledColumns
      },

    };
    this.dialogRef.close(stateData);
  }

  Cancel() {
    this.dialogRef.close(false);
  }
}
