

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { IUserItem } from '../user-item-model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgbdSortableHeader, SortEvent } from '../../directives/sort-table-column-directive';
import { DateUtil } from 'src/app/services/utility/DateUtil';
import { DeleteUserAlertComponent } from './delete-user-alert/delete-user-alert.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/roles.service';
import { DepartmentService } from 'src/app/services/departments.service';
import { SettingsService } from 'src/app/services/settings.service';

const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


@Component({
  selector: 'app-users',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {
  DATE_FORMAT: string;
  isDataLoaded: boolean = false;
  private modalRef: MdbModalRef<CreateUserComponent> | null = null;

  users$!: Observable<IUserItem[]>;
  USERS!: IUserItem[];
  roles!: any[];
  departments!: any[];
  filter = new FormControl('');
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  userToggleForm = new FormGroup({
    DATE_FORMAT: new FormControl(''),
  });

  constructor(
    private usersService: UsersService,
    private settingsService: SettingsService,
    private roleService: RoleService,
    private departMentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: MdbModalService) {


  }

  ngOnInit(): void {
    this.setData();
    this.initUserRefreshedSubscription();
  }

  private setData() {
    this.users$ = this.usersService.getAllUsers();
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

    let settingObservable = this.settingsService.getAllSettings();

    combineLatest([this.users$, allRoles, allDepartMents, settingObservable]).subscribe(items => {

      this.USERS = items[0];
      this.roles = items[1];
      this.departments = items[2];
      this.DATE_FORMAT = items[3].filter(setting => (setting.type == "GLOBAL") && (setting.key == "DATE_FORMAT"))[0].value;
      this.isDataLoaded = true;
      this.registerForSearch();
    });

  }

  private registerForSearch() {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  initUserRefreshedSubscription() {
    this.usersService.reloadUsers.subscribe((data: boolean) => {
      if (data) {
        this.setData();

      }
    });
  }



  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.registerForSearch();

    } else {
      let sorted = [...this.USERS].sort((a: any, b: any) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.users$ = of(sorted);
    }
  }

  search(text: string): IUserItem[] {

    return this.USERS.filter(user => {
      const term = text.toLowerCase();
      return user.first_name.toLowerCase().includes(term);

    });
  }

  createUser() {
    this.router.navigate(["./create"], {
      relativeTo: this.route,
      state: { roles: this.roles, departments: this.departments }
    })

  }

  editUser(user: IUserItem) {
    this.router.navigate(["./update", user.username], {
      relativeTo: this.route,
      state: { user: user, roles: this.roles, departments: this.departments }
    })

  }

  toggleUser(user: IUserItem,) {
    let userObj: any = {
      username: user.username,
      isActive: !user.isActive
    }


    this.modalRef = this.modalService.open(DeleteUserAlertComponent, {
      data: {
        userObj
      }, ignoreBackdropClick: true
    });

  }



}




