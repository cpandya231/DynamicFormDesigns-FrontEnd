import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { IUserItem } from './user-item-model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateUserComponent } from './create-user/create-user.component';



export type SortColumn = keyof IUserItem | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private modalRef: MdbModalRef<CreateUserComponent> | null = null;

  users$: Observable<IUserItem[]>;
  USERS!: IUserItem[];

  filter = new FormControl('');
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(private usersService: UsersService, private modalService: MdbModalService) {
    console.log(`Constructor ${JSON.stringify(this.filter.valueChanges)}`)
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit(): void {
    this.setData();
    this.initUserAddedSubscription();
  }

  private setData() {
    this.users$ = this.usersService.getAllUsers();
    this.users$.subscribe(items => {

      this.USERS = items;
    });
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
      this.users$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );

    } else {
      let sorted = [...this.USERS].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.users$ = of(sorted);
    }
  }

  search(text: string): IUserItem[] {
    console.log(`Searching..`)
    return this.USERS.filter(user => {
      const term = text.toLowerCase();
      return user.first_name.toLowerCase().includes(term)
        || user.email.toLowerCase().includes(term)

    });
  }

  createUser() {
    this.modalRef = this.modalService.open(CreateUserComponent);


  }



}



