import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IUserItem } from './user-item-model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  users$: Observable<IUserItem[]>;
  filter = new FormControl('');
  constructor() {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text))
    );
  }

  ngOnInit(): void {
  }

}


const users: IUserItem[] = [
  {
    name: "Partha",
    email: "p123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Vihit",
    email: "v123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Heet",
    email: "h123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Mohit",
    email: "ghi123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Chintan",
    email: "def123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Raghu",
    email: "rag123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  },
  {
    name: "Kevin",
    email: "ke123@gmail.com",
    roles: ["Owner"],
    signupTime: "16th April 2022",
    loginTime: "16th April 2022",
    status: "Active"
  }
];

function search(text: string): IUserItem[] {
  return users.filter(user => {
    const term = text.toLowerCase();
    return user.name.toLowerCase().includes(term)
      || user.email.toLowerCase().includes(term)

  });
}

