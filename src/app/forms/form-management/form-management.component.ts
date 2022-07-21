import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-form-management',
  templateUrl: './form-management.component.html',
  styleUrls: ['./form-management.component.scss']
})
export class FormManagementComponent implements OnInit {

  IsWorkflowVisible = false;
  IsTemplateVisible = true;
  IsFormWorkflowIdAvailable = true;
  params: any;
  FormId: number;
  WorkflowId: number;
  FormName: string = '';
  DisabledWorkflowTitle = '';
  constructor(private activatedRoute: ActivatedRoute, private location:Location) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.FormName = String(params.get('formName') || '');
    this.WorkflowId = +(params.get('workflowId') || '');
    this.FormId = +(params.get('formId') || '');
    if (!this.WorkflowId) {
      this.DisabledWorkflowTitle = 'Need to save form template first!';
      this.IsFormWorkflowIdAvailable = false;
    }
  }
}
