import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/common/services/forms.service';
import { IDepartmentItem } from 'src/app/departments/department-item-model';
import { DepartmentService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-form-workflow',
  templateUrl: './form-workflow.component.html',
  styleUrls: ['./form-workflow.component.scss']
})
export class FormWorkflowComponent implements OnInit {

  StateDetailsForm!: FormGroup;
  WorkflowStates: string[] =[];
  Roles: string[] = ['admin', 'QA', 'Manager', 'Senior Manager'];
  Departments: IDepartmentItem[] = [];
  constructor(private fb: FormBuilder,
    private departmentService: DepartmentService,
    private formService: FormsService) { }
  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.Departments = data;
    });
    this.StateDetailsForm = this.fb.group ({
      name: [''],
      description: [''],
      previousState: [''],
      multiPreviousStateCompletion: [false],
      roleStateAccess: [''],
      departmentStateAccess: [''],
      sendBackAvailable: [false],
      triggerEmail: [false],
      triggerSMS: [false],
      eSignRequired: [false],
      sendBackTo: ['']
    });
    this.WorkflowStates = ['manager', 'QA', 'QC'];
  }

  SaveState() {
    console.log(this.StateDetailsForm.value);
    this.formService.SaveFormWorkflowState(this.StateDetailsForm.value);
  }
}



