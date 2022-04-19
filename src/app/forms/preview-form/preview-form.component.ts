import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/common/services/forms.service';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {

  formId: any;
  FormData: any = {
    title: '',
    components: []
  };
  constructor(private formsService: FormsService) { }

  ngOnInit(): void {
    if (this.formId) {
      let form =  this.formsService.GetFormTemplate(this.formId)
      this.FormData.components = form.components;
      this.FormData.title = form.Name;
    }
  }

}
