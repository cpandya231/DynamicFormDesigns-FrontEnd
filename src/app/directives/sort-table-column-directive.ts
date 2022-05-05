import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { IRoleItem } from "../roles/role-item-model";
import { IUserItem } from "../users/user-item-model";

export type SortColumn = keyof any | '';
export type SortDirection = 'asc' | 'desc' | '';
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
    @Output() sort = new EventEmitter<any>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}

const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };