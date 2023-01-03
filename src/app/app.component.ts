import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  shoppingCart: any = [
    {
      site: 'Flipkart',
      products: [
        {
          id: '',
          item: '',
          count: 0,
          totalprice: 0,
        },
      ],
    },
    {
      site: 'Amazon',
      products: [
        {
          id: '',
          item: '',
          count: 0,
          totalprice: 0,
        },
      ],
    },
    {
      site: 'Myntra',
      products: [
        {
          id: '',
          item: '',
          count: 0,
          totalprice: 0,
        },
      ],
    },
  ];

  tabName: string = 'Flipkart';

  constructor() {}

  getIndex(eve: any) {
    this.tabName =
      eve.index == 0 ? 'Flipkart' : eve.index == 1 ? 'Amazon' : 'Myntra';
  }
}
