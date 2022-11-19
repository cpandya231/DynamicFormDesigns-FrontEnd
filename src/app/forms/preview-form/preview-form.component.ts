import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormsService } from 'src/app/common/services/forms.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ServiceUtil } from 'src/app/services/utility/ServiceUtil';
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
    public modalRef: MdbModalRef<PreviewFormComponent>,
    private userService: UsersService) { }

  ngOnInit(): void {
    if (this.formTemplate) {
      this.FormData.components = this.formTemplate.components;
      this.FormData.title = this.formTemplate.formName;
      this.authService.getAccessToken().asObservable().subscribe(authData => {
        const token = authData;
        Object.assign(this.FormData, { 'Authorization': `Bearer ${token}`,"url":`${ServiceUtil.API_ENDPOINT}` })
      });
      this.userService.getUserByUsername(localStorage.getItem("username")).subscribe(userData => {
        Object.assign(this.FormData, {
          department: userData.department
        })
      });
    }

  }

  Close(): void {

  }

}
