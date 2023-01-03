import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() data: any;
  siteDetails: any = {};
  constructor() {}

  ngOnInit(): void {
    console.log(this.data, 14);
  }

  ngOnChanges(): void {
    this.siteDetails = {
      site: this.data.site,
      itemPricePerItem: this.data.itemPricePerItem,
      count: this.data.count,
      totalPrice: this.data.totalPrice,
    };
  }
}
