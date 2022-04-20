import { Component, OnInit } from '@angular/core';
import { IUserItem } from '../user-item-model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userModel!: IUserItem;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
