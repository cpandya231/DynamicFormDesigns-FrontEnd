import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdbModalConfig, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, startWith, map, of } from 'rxjs';
import { NgbdSortableHeader } from '../directives/sort-table-column-directive';
import { RoleService } from '../services/roles.service';

import { CreateRoleComponent } from './create-role/create-role.component';
import { IRoleItem } from './role-item-model';


export type SortColumn = keyof IRoleItem | '';
export type SortDirection = 'asc' | 'desc' | '';


const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  filter = new FormControl('');
  private modalRef: MdbModalRef<CreateRoleComponent> | null = null;

  constructor(private modalService: MdbModalService, private roleService: RoleService) { }

  roles$!: Observable<IRoleItem[]>;
  ROLES!: IRoleItem[];
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;


  ngOnInit(): void {
    this.setData();
    this.initRoleAddedSubscription();
  }

  private setData() {
    this.roles$ = this.roleService.getAllRoles();
    this.roles$.subscribe(items => {

      this.ROLES = items;

      this.registerForSearch();
    });

  }

  private registerForSearch() {
    this.roles$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  initRoleAddedSubscription() {
    this.roleService.roleAdded.subscribe((data: boolean) => {
      if (data) {
        this.setData();

      }
    });
  }

  createRole() {
    let mdbModalConfig: MdbModalConfig = {
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.open(CreateRoleComponent, mdbModalConfig);


  }

  search(text: string): IRoleItem[] {

    return this.ROLES.filter(role => {
      const term = text.toLowerCase();
      return role.role.toLowerCase().includes(term);

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

      let sorted = [...this.ROLES].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.roles$ = of(sorted);

    }
  }

}
