import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formio, FormioComponent, FormioUtils } from '@formio/angular';
import { UsersService } from 'src/app/services/users.service';
import { IUserItem } from '../user-item-model';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { RoleService } from 'src/app/services/roles.service';
import { combineLatest, EMPTY, filter, map, of } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
import { formatDate } from '@angular/common';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettingItem } from 'src/app/settings/system-config/settings-model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  title: string = 'Create'
  isDataLoaded: boolean = false;

  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  username: string = '';
  user!: any;
  roles!: any[];
  departments!: any[];
  systemSettings!: ISettingItem[];

  FormData = MasterForms.CREATE_USER_FORM_TEMPLATE;
  constructor(private userService: UsersService,
    private roleService: RoleService,
    private departMentService: DepartmentService,
    private settingsService: SettingsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const navigation: any = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.user = navigation.extras.state.user;
      this.roles = navigation.extras.state.roles;
      this.departments = navigation.extras.state.departments;
    }

  }

  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.paramMap;
    this.username = String(params.get('username') || '');
    let userObservable = of({});
    if (this.username) {
      this.title = "Update"
      this.FormData = MasterForms.UPDATE_USER_FORM_TEMPLATE;
      userObservable = this.userService.getUserByUsername(this.username);
    }




    if (!this.roles || !this.departments || !this.user) {
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

      let usernameSettingsObservable = this.settingsService.getAllSettings();


      combineLatest([allRoles, allDepartMents, userObservable, usernameSettingsObservable]).subscribe(items => {


        this.roles = items[0];
        this.departments = items[1];
        if ((Object.keys(items[2]).length) > 0) {
          this.user = items[2];
        }
        this.systemSettings = items[3];

        this.setData();
      });

    } else {
      this.setData();
    }

  }


  private setData() {
    this.FormData['components'].forEach((item: any) => {
      if (item['key'] == 'roles' && this.roles) {
        item.data.values = this.roles;
      } else if (item['key'] == 'departments' && this.departments) {
        item.data.values = this.departments;
      } else if (item['key'] == 'username') {
        item.validate.minLength = this.systemSettings.filter(setting => (setting.type == "USERNAME") && (setting.key == "USERNAME_MIN_LENGTH"))[0].value;
        item.validate.maxLength = this.systemSettings.filter(setting => (setting.type == "USERNAME") && (setting.key == "USERNAME_MAX_LENGTH"))[0].value;
      } else if (item['key'] == 'dateOfBirth') {
        item.format = this.systemSettings.filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;

      }


      if (this.username) {

        if (item['key'] == 'name-columns') {
          item.columns.forEach((nameColumn: any) => {
            console.log(nameColumn);
            if (nameColumn['components'][0]['key'] == 'firstName') {
              nameColumn['components'][0].defaultValue = this.user.first_name;
              nameColumn['components'][0].disabled = true;
            } else if (nameColumn['components'][0]['key'] == 'lastName') {
              nameColumn['components'][0].defaultValue = this.user.last_name;
              nameColumn['components'][0].disabled = true;
            }
          });

        } else if (item['key'] == 'email') {
          item.defaultValue = this.user.email;
        } else if (item['key'] == 'username') {
          item.defaultValue = this.user.username;
          item.disabled = true;

        } else if (item['key'] == 'dateOfBirth') {
          item.defaultValue = this.user.dateOfBirth;
        } else if (item['key'] == 'departments') {
          item.defaultValue = this.user.department.id;
        } else if (item['key'] == 'roles') {
          item.defaultValue = this.user.roles[0].id;
        }
      }

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
      userObj.password = userObj.dateOfBirth;
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
