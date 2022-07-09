import { Component, ElementRef, EventEmitter, Input, IterableDiffers, OnChanges, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
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
  iterableDiffer: any;
  isDataLoaded = false;
  constructor(private renderer: Renderer2,
    private iterableDiffers: IterableDiffers) {
    // this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange['data'].currentValue?.length) {
      this.updateChart();
    }
  }

  //  ngDoCheck() {
  //   const changes = this.iterableDiffer.diff(this.inputArray);
  //   if (changes) {
  //     console.log("Changes detected!");
  //   }
  //  }

  ngAfterViewInit(): void {
    if (!this.chart) {
      this.chart = new OrgChart();
      this.updateChart();
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
    if (!this.data || !this.data.length) {
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
      .siblingsMargin(() => 60)
      .nodeContent((data: any) => {
        let template = `
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
            <h6>${data.data.name}</h6>`;
        if (data?.data?.code) {
          template += `<span *ngIf='${data.data.code}'>code: ${data.data.code}</span>`
        }
        template += `</div>`;
        return template;
      })
      .compact(false)
      .render().fit().expandAll();

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
