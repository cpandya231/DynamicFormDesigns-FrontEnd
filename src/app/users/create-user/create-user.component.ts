import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { UsersService } from 'src/app/services/users.service';
import { IUserItem } from '../user-item-model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { RoleService } from 'src/app/services/roles.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  isDataLoaded: boolean = false;
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  FormData = MasterForms.CREATE_USER_FORM_TEMPLATE;
  constructor(private userService: UsersService,
    private roleService: RoleService,
    private router: Router,
    private modelRef: MdbModalRef<CreateUserComponent>) { }

  ngOnInit(): void {

    this.roleService.getAllRoles()
      .pipe(map(roles => {
        return roles.map((role: { [x: string]: any; }) => {
          return { "label": role["role"], "value": role["id"] };
        });
      }))
      .subscribe(items => {

        this.FormData['components'].forEach(function (item: any) {
          if (item['key'] == 'roles') {
            item.data.values = items;
          }
        });
        this.isDataLoaded = true;
      });
  }

  onSubmit() {
    this.form.formio.emit('submitButton');

  }

  handleSubmit() {

    let submittedData = this.form.formio.submission.data;
    let mappedRoles = [{ id: submittedData.roles }];


    let userObj: IUserItem = {
      first_name: submittedData.firstName,
      last_name: submittedData.lastName,
      email: submittedData.email,
      username: submittedData.username,
      password: submittedData.password,
      department: submittedData.department,
      roles: mappedRoles,
      isActive: true
    }

    this.userService.createUser(userObj).subscribe({
      next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
    })
  }

  navigateOnSuccess() {
    this.userService.userAdded.next(true);
    this.modelRef.close();
    this.router.navigate(['/usersParent/users']);
  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);

  }

  close() {
    this.modelRef.close();
  }
}
