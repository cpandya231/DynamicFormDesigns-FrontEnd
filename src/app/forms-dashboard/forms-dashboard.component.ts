import { Component, OnInit } from '@angular/core';
import { FormsService } from '../common/services/forms.service';

@Component({
  selector: 'app-forms-dashboard',
  templateUrl: './forms-dashboard.component.html',
  styleUrls: ['./forms-dashboard.component.css']
})
export class FormsDashboardComponent implements OnInit {

  FormTemplates: any = [];
  savedForm: any;
  constructor(private formsService: FormsService) { }

  ngOnInit(): void {
    this.FormTemplates = this.formsService.GetFormTemplates();
    this.savedForm = this.FormTemplates[0];
  }

}
