

import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { IUserItem } from '../user-item-model';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgbdSortableHeader } from '../../directives/sort-table-column-directive';
import { DateUtil } from 'src/app/services/utility/DateUtil';


export type SortColumn = keyof IUserItem | '';
export type SortDirection = 'asc' | 'desc' | '';


const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


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

  filter = new FormControl('');
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(private usersService: UsersService, private modalService: MdbModalService) {


  }

  ngOnInit(): void {
    this.setData();
    this.initUserAddedSubscription();
  }

  private setData() {
    this.users$ = this.usersService.getAllUsers();
    this.users$.subscribe(items => {

      this.USERS = items;

      this.registerForSearch();
    });

  }

  private registerForSearch() {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  initUserAddedSubscription() {
    this.usersService.userAdded.subscribe((data: boolean) => {
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
      let sorted = [...this.USERS].sort((a, b) => {
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
    let mdbModalConfig: MdbModalConfig = {
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.open(CreateUserComponent, mdbModalConfig);


  }



}




