import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';

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
  FormOptions: any = {};
  formTemplate: any;
  constructor(private authService: AuthService,
    public modalRef: MdbModalRef<PreviewFormComponent>) { }

  ngOnInit(): void {
    if (this.formTemplate) {
      this.FormData.components = this.formTemplate.components;
      this.FormData.title = this.formTemplate.formName;
      this.authService.getAccessToken().asObservable().subscribe(authData => {
        const token = authData;
        Object.assign(this.FormData, { 'Authorization': `Bearer ${token}` })
      });
    }
  }

  Close(): void {

  }

}
