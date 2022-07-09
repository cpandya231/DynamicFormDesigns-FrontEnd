import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { FormsService } from 'src/app/common/services/forms.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() entryId: any;
  @Input() formId: any;

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  comments: any[];
  constructor(private formService: FormsService,) { }

  ngOnInit(): void {
    this.getCommentsForEntry();
  }


  private getCommentsForEntry() {
    let entryMetaDataObservable = this.formService.LogEntryMetadata(this.formId, this.entryId);
    combineLatest([entryMetaDataObservable]).subscribe(items => {
      let entryMetadata = items[0];
      this.comments = entryMetadata.filter((em: { data: { comment: null; }; }) => null != em.data.comment).map((em: { data: any; }) => em.data);
    });
  }

  submitComment() {
    let submittedForm = this.commentForm.value;
    this.formService.SaveLogEntryComment(this.formId, this.entryId, submittedForm).subscribe(
      {
        next: (v: any) => {
          return this.getCommentsForEntry();
        },
        error: (e) => alert("something went wrong")
      });
  }
}
