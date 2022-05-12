import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formio, FormioComponent, FormioUtils } from '@formio/angular';
import { UsersService } from 'src/app/services/users.service';
import { IUserItem } from '../user-item-model';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { RoleService } from 'src/app/services/roles.service';
import { combineLatest, map } from 'rxjs';
import { DepartMentService } from 'src/app/services/departments.service';
import { formatDate } from '@angular/common';
import { DateUtil } from 'src/app/services/utility/DateUtil';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  title: string = 'Create'
  isDataLoaded: boolean = false;
  isDataFromExistingUserLoaded: boolean = false;
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  username: string = '';
  user: IUserItem;
  FormData = MasterForms.CREATE_USER_FORM_TEMPLATE;
  constructor(private userService: UsersService,
    private roleService: RoleService,
    private departMentService: DepartMentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const navigation: any = this.router.getCurrentNavigation();
    this.user = navigation.extras.state as IUserItem;
  }

  ngOnInit(): void {
    console.log(this.form);
    let params = this.activatedRoute.snapshot.paramMap;
    this.username = String(params.get('username') || '');

    if (this.user) {
      this.title = "Update"
      this.FormData = MasterForms.UPDATE_USER_FORM_TEMPLATE;
    }
    let existingUser = this.user;


    let allRoles = this.roleService.getAllRoles()
      .pipe(map(roles => {
        return roles.map((role: { [x: string]: any; }) => {
          return { "label": role["role"], "value": role["id"] };
        });
      }));

    let allDepartMents = this.departMentService.getAllDepartment()
      .pipe(map(departments => {
        return departments.map((department: { [x: string]: any; }) => {
          return { "label": department["name"], "value": department["id"] };
        });
      }));

    combineLatest([allRoles, allDepartMents]).subscribe(responses => {

      this.FormData['components'].forEach(function (item: any) {
        if (item['key'] == 'roles') {
          item.data.values = responses[0];
        } else if (item['key'] == 'departments') {
          item.data.values = responses[1];
        }

        if (existingUser) {

          if (item['key'] == 'name-columns') {
            item.columns.forEach(function (nameColumn: any) {
              console.log(nameColumn);
              if (nameColumn['components'][0]['key'] == 'firstName') {
                nameColumn['components'][0].defaultValue = existingUser.first_name;
                nameColumn['components'][0].disabled = true;
              } else if (nameColumn['components'][0]['key'] == 'lastName') {
                nameColumn['components'][0].defaultValue = existingUser.last_name;
                nameColumn['components'][0].disabled = true;
              }
            })

          } else if (item['key'] == 'email') {
            item.defaultValue = existingUser.email;
          } else if (item['key'] == 'username') {
            item.defaultValue = existingUser.username;
            item.disabled = true;

          } else if (item['key'] == 'dateOfBirth') {
            item.defaultValue = existingUser.dateOfBirth;
          } else if (item['key'] == 'departments') {
            item.defaultValue = existingUser.department.id;
          } else if (item['key'] == 'roles') {
            item.defaultValue = existingUser.roles[0].id;
          }
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
      password: formatDate(submittedData.dateOfBirth, DateUtil.DATE_FORMAT_SHORT, 'en'),
      department: { id: submittedData.departments },
      dateOfBirth: formatDate(submittedData.dateOfBirth, DateUtil.DATE_FORMAT_SHORT, 'en'),
      roles: mappedRoles,
      isActive: true
    }

    if (this.user) {

      this.userService.updateUser(userObj).subscribe({
        next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
      })

    } else {
      this.userService.createUser(userObj).subscribe({
        next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
      })
    }

  }

  navigateOnSuccess() {
    this.userService.reloadUsers.next(true);

    this.router.navigate(['/usersParent/users']);
  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);

  }

  close() {
    this.router.navigate(['/usersParent/users']);
  }
}
