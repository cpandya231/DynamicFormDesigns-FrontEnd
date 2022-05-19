import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { IRoleItem } from 'src/app/roles/role-item-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-user-alert',
  templateUrl: './delete-user-alert.component.html',
  styleUrls: ['./delete-user-alert.component.scss'],

})
export class DeleteUserAlertComponent implements OnInit {
  userObj: any;
  constructor(private usersService: UsersService, private router: Router, private modelRef: MdbModalRef<DeleteUserAlertComponent>) { }

  ngOnInit(): void {
  }


  handleSubmit() {


    this.usersService.toggleUser(this.userObj).subscribe({
      next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
    })
  }

  navigateOnSuccess() {
    this.usersService.reloadUsers.next(true);
    this.modelRef.close();

  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);

  }

  close() {
    this.usersService.reloadUsers.next(true);
    this.modelRef.close();
  }
}
