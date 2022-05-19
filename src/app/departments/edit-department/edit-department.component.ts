import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioComponent } from '@formio/angular';
import { map } from 'rxjs';
import { DepartmentService } from 'src/app/services/departments.service';
import { MasterForms } from 'src/app/services/utility/master.forms.constants';
import { IDepartmentItem } from '../department-item-model';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  isDataLoaded: boolean = false;
  departmentId: any;
  departmentObj: any;
  departments: IDepartmentItem[];
  @ViewChild(FormioComponent, { static: false })
  form!: FormioComponent;
  FormData = MasterForms.EDIT_DEPARTMENT_FORM_TEMPLATE;
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap;
    this.departmentId = String(params.get('departmentId') || '');
    if (this.departmentId) {
      let allDepartMents = this.departmentService.getAllDepartment()
        .pipe(map(departments => {
          return departments.map((department: { [x: string]: any; }) => {
            if (department["name"] == this.departmentId) {
              this.departmentObj = department;
              return;
            }

            return { "label": department["name"], "value": department["id"] };
          });
        })).subscribe(departments => {
          this.departments = departments;
          this.setDataInForm();

        })

    }
  }

  setDataInForm() {
    this.FormData['components'].forEach((item: any) => {
      if (item['key'] == 'name') {
        item.defaultValue = this.departmentObj.name;

      } else if (item['key'] == 'code') {
        item.defaultValue = this.departmentObj.code;

      } else if (item['key'] == 'parentDepartment') {
        item.data.values = this.departments;

        if (this.departmentObj.parentId == 0) {
          item.hidden = true;

        } else {
          item.defaultValue = this.departmentObj.parentId;
          item.hidden = false;
        }


      }
      this.isDataLoaded = true;
    }
    );
  }

  onSubmit() {
    this.form.formio.emit('submitButton');

  }



  handleSubmit() {

    let submittedData = this.form.formio.submission.data;
    let departmentObj: IDepartmentItem = {
      name: submittedData.name,
      code: submittedData.code,
      id: this.departmentObj.id,
      parentId: submittedData.parentDepartment
    }

    this.departmentService.editDepartment(departmentObj).subscribe({
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
