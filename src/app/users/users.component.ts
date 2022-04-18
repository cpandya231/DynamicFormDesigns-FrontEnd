import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IUserItem } from './user-item-model';



export type SortColumn = keyof IUserItem | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

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


  users$: Observable<IUserItem[]>;

  filter = new FormControl('');
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor() {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text))
    );
  }

  ngOnInit(): void {
  }



  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    console.log(`Direction ${direction} column ${column}`);
    // sorting countries
    if (direction === '' || column === '') {
      this.users$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(text))
      );

    } else {
      let sorted = [...USERS].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.users$ = of(sorted);
    }
  }

}


const USERS: IUserItem[] = [
  {
    name: "Partha",
    email: "p123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Vihit",
    email: "v123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Heet",
    email: "h123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Mohit",
    email: "ghi123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Chintan",
    email: "def123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Raghu",
    email: "rag123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Kevin",
    email: "ke123@gmail.com",
    roles: "Owner",
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  }
];

function search(text: string): IUserItem[] {
  return USERS.filter(user => {
    const term = text.toLowerCase();
    return user.name.toLowerCase().includes(term)
      || user.email.toLowerCase().includes(term)

  });
}

