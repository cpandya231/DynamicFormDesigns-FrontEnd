import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DepartmentService } from 'src/app/services/departments.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { IDepartmentItem } from '../department-item-model';
import { DepartmentsComponent } from '../departments.component';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
  isDataLoaded: boolean = false;
  departmentId: any;

  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  FormData = MasterForms.CREATE_DEPARTMENT_FORM_TEMPLATE;
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.departmentId = String(params.get('departmentId') || '');
    if (this.departmentId) {
      this.isDataLoaded = true;
    }
  }

  onSubmit() {
    this.form.formio.emit('submitButton');

  }



  handleSubmit() {

    let submittedData = this.form.formio.submission.data;
    let departmentObj: IDepartmentItem = {
      name: submittedData.name,
      code: submittedData.code,
      parentId: this.departmentId
    }

    this.departmentService.createDepartment(departmentObj).subscribe({
      next: this.navigateOnSuccess.bind(this), error: this.handleError.bind(this)
    })
  }

  navigateOnSuccess() {
    this.departmentService.departmentAdded.next(true);

    this.router.navigate(['/departments']);
  }

  handleError(err: any) {
    console.error(`Error occured while login ${JSON.stringify(err)}`);

  }

  close() {
    this.router.navigate(['/departments']);
  }
}
