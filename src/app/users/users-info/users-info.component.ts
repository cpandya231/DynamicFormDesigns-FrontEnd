

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

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

const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


@Component({
  selector: 'app-users',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {
  readonly DATE_FORMAT = DateUtil.DATE_FORMAT;

  private modalRef: MdbModalRef<CreateUserComponent> | null = null;

  users$!: Observable<IUserItem[]>;
  USERS!: IUserItem[];
  roles!: any[];
  departments!: any[];
  filter = new FormControl('');
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private usersService: UsersService,
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

    combineLatest([this.users$, allRoles, allDepartMents]).subscribe(items => {

      this.USERS = items[0];
      this.roles = items[1];
      this.departments = items[2];
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

  toggleUser(user: IUserItem, event: any) {
    let userObj: any = {
      username: user.username,
      isActive: event.currentTarget.checked
    }


    this.modalRef = this.modalService.open(DeleteUserAlertComponent, {
      data: {
        userObj
      }, ignoreBackdropClick: true
    });

  }



}




