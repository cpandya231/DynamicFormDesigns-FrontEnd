import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { OrgChart } from 'd3-org-chart';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrgChartComponent implements OnChanges {

  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input('data') data: any;
  @Output() listItemEvent = new EventEmitter<any>();
  chart: OrgChart<any>;
  isDataLoaded = false;
  constructor(private renderer: Renderer2) { }

 ngOnChanges(simpleChange: SimpleChanges): void {
  if (simpleChange['data'].currentValue?.length) {
    this.updateChart();
  }
 }

  ngAfterViewInit(): void {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.renderer.listen(this.chartContainer.nativeElement, 'click', (evt) => {
      if (this.chartContainer.nativeElement.querySelectorAll('.list-items')) {
        [...  this.chartContainer.nativeElement.querySelectorAll('.list-items')].forEach(element => {
          element.addEventListener('click', this.handleListItemClick.bind(this));
        })
      }
      if (evt.target.className.baseVal == "svg-chart-container") {
        this.chartContainer.nativeElement.querySelector('.svg-chart-container').addEventListener('click', this.clickedOutside.bind(this));
      }
    });
  }

  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(() => 200)
      .nodeHeight(() => 120)
      .nodeContent((data: any) => {
        return `
        <div class="menu" #menu>
        <ul class="list list-for-${data.data.id}">
          <li class="list-items" branch-id='${data.data.name}' event-type="add">
            Add 
          </li>
          <li class="list-items" branch-id='${data.data.name}' event-type="edit">
            Edit
          </li>
        </ul>
      </div>
        <div class="node-card">
            <h6>${data.data.name}</h6>
            <span *ngIf="data.data.code">code: ${data.data.code}</span>
        </div>`;
      })
      .compact(false).render().fit().expandAll();

    this.chart.onNodeClick((data: any) => {
      let all = document.getElementsByClassName(`list`);
      Array.from(all).forEach((el) => {
        // Do stuff here
        if (el.classList.contains(`list-for-${data}`)) {
          el.classList.toggle('hide')
          el.classList.add('show');
        } else {
          el.classList.toggle('show')
          el.classList.add('hide');
        }
      });
    });
    this.isDataLoaded = true;
  }

  
  buildNodes(branches: any, root: any): any {
    if (root["visited"]) {
      return;
    }
    let internalNode: any = { "name": root["name"], "id": root["id"], "parentId": root["parentId"] };
    let children = [];

    for (let branch of branches) {
      if (branch["parentId"] == root["id"]) {
        let child = this.buildNodes(branches, branch);
        branch["visited"] = true;
        children.push(child);
      }
    }
    internalNode["childs"] = children;
    root["visited"] = true;
    return internalNode;
  }

  protected clickedOutside(event: any) {
    if (event.target.className.baseVal == "svg-chart-container") {
      let all = document.getElementsByClassName(`list`);
      Array.from(all).forEach((el) => {
        el.classList.remove('show');
      });
    }
  }

  protected handleListItemClick(event: any) {
      this.listItemEvent.emit(event.currentTarget.attributes);
  }
}
