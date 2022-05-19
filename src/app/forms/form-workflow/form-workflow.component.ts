import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-workflow',
  templateUrl: './form-workflow.component.html',
  styleUrls: ['./form-workflow.component.scss']
})
export class FormWorkflowComponent implements OnInit {

  StateDetailsForm!: FormGroup;
  WorkflowStates: string[] =[];
  Roles: string[] = ['admin', 'QA', 'Manager', 'Senior Manager'];
  Departments: string[] = ['QA', 'Production', 'Testing', 'Floor'];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
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
  }
  
}

// https://material.angular.io/components/tree/overview

// https://github.com/swimlane/ngx-graph
// https://github.com/swimlane/ngx-graph/blob/master/src/docs/demos/components/ngx-graph-org-tree/ngx-graph-org-tree.component.html



