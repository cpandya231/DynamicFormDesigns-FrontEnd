import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  WorkflowId: number;
  FormName: string = '';
  DisabledWorkflowTitle = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.FormName = String(params.get('name') || '');
    this.WorkflowId = Number(params.get('workflowId') || '');
    if (!this.WorkflowId) {
      this.DisabledWorkflowTitle = 'Need to save form template first!';
      this.IsFormWorkflowIdAvailable = false;
    }
  }

  LoadFormWorkflow(): void {
    this.IsWorkflowVisible = true;
    this.IsTemplateVisible = false;
  }

  LoadFormTemplate(): void {
    this.IsWorkflowVisible = false;
    this.IsTemplateVisible = true;
  }

  WorkflowIdUpdate(data: any): void {
    this.WorkflowId = data;
    if (this.WorkflowId) {
      this.IsFormWorkflowIdAvailable = true;
      this.LoadFormWorkflow();
    }
  }
}
