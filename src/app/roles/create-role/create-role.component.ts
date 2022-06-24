import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { map } from 'rxjs';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RoleService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { IRoleItem } from '../role-item-model';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  isDataLoaded: boolean = false;

  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  FormData = MasterForms.CREATE_ROLE_FORM_TEMPLATE;
  constructor(private roleService: RoleService,
    private permissionsService: PermissionsService,
    private router: Router, private modelRef: MdbModalRef<CreateRoleComponent>) { }

  ngOnInit(): void {
    this.permissionsService.getAllPermissions()
      .pipe(map(permissions => {
        return permissions.map((permission: { [x: string]: any; }) => {
          return { "label": permission["permission"], "value": permission["id"] };
        });
      }))
      .subscribe(items => {

        this.FormData['components'].forEach(function (item: any) {
          if (item['key'] == 'permissions') {
            item.data.values = items;
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
    let mappedPermissions = [];
    if (submittedData.permissions) {
      for (let permissionId of submittedData.permissions) {
        mappedPermissions.push({ id: parseInt(permissionId) })
      }
    }

    let roleObj: IRoleItem = {
      role: "ROLE_" + submittedData.name,
      description: submittedData.description,
      permissions: mappedPermissions
    }

    this.roleService.creatRole(roleObj).subscribe({
      next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
    })
  }

  navigateOnSuccess() {
    this.roleService.roleAdded.next(true);
    this.modelRef.close();
    this.router.navigate(['/usersParent/roles']);
  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);

  }

  close() {
    this.modelRef.close();
  }
}
