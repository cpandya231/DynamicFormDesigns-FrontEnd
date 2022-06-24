import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/common/services/forms.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formName: any;
  constructor(private formService: FormsService, private activatedRoute: ActivatedRoute) { }
  CurrentForm: any = {
    components: []
  };
  IsFormLoaded = false;
  formId: number = 0;
  FormOptions = MasterForms.FormOptions;
  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.formName = String(params.get('name') || '');
    this.formService.GetFormTemplate(this.formName).subscribe(data => {
      console.log(data);

      this.CurrentForm.components = JSON.parse(data.template).components;
      this.IsFormLoaded = true;
      this.formId = data.id;
    })
  }

}
