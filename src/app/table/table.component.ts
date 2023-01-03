import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as data from '../../assets/productList.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('item')
  item!: ElementRef;
  @ViewChild('count')
  count!: ElementRef;
  @Input() tabName: string = '';
  @Input() dataSource: Array<object> = [];

  jsonData = (data as any).default;
  tableHeader: Array<string> = ['id', 'item', 'count', 'totalprice', 'action'];
  tableRows: Array<object> = [];
  summaryData: any;
  searchText: string = '';
  isMenuOpen: boolean = true;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnChanges(): void {
    this.tableRows = this.dataSource;
    this.tabName = this.tabName;
    this.showData(this.tableRows);
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
    this.tableRows = this.dataSource;
    this.tabName = this.tabName;
    this.showData(this.tableRows);
  }

  displayList(): void {
    this.isMenuOpen = true;
  }

  //delete an item
  handleDeleteItem(index: number) {
    //let existingData = this.tableRows;
    this.tableRows.splice(index, 1);
    //this.tableRows = existingData;
    this.table?.renderRows();
    this.showData(this.tableRows);
    this.searchText = '';
  }

  //adding new item
  handleAddItem() {
    let newItemName = this.item?.nativeElement;
    let newItemCount: any = this.count?.nativeElement;
    let foundItem: any = this.jsonData.find(
      (item1: any) => item1.item === newItemName.value.toLowerCase()
    );

    // new item name/new item count data ois not entered in filed
    if (!newItemName.value.trim() || !newItemCount.value) {
      this._snackBar.open('please fill details to add new', '', {
        duration: 1000,
      });
    }
    //new item name is not in the predefined json list
    if (newItemName.value.trim() && !foundItem) {
      this._snackBar.open('please give some other value', '', {
        duration: 1000,
      });
    }
    //new item name & new item data is entered & item name is entered as per predefined list
    if (foundItem) {
      let count = parseInt(newItemCount.value);
      count > 0
        ? this.tableRows.push({
            id: Math.max(...this.tableRows.map((item: any) => item.id)) + 1,
            item: newItemName.value.toLowerCase(),
            count,
            totalprice: newItemCount.value * foundItem.price,
          })
        : this._snackBar.open('-ve value not allowed', '', {
            duration: 1000,
          });
      newItemName.value = null;
      newItemCount.value = '';
      this.tableRows = this.tableRows;
      this.table?.renderRows();
      this.showData(this.tableRows);
      this.searchText = '';
    }
  }

  //show summary data
  showData(data: any) {
    this.summaryData = {
      site: this.tabName,
      count: this.reduceItems(data, 'count'),
      totalPrice: this.reduceItems(data, 'totalprice'),
    };
  }
  //send added count,added total price
  reduceItems(arr: Array<any>, key: string) {
    return arr
      .map((item) => item[key])
      .reduce((total, current) => {
        return total + current;
      });
  }
  insertItem(item: any) {
    this.searchText = item;
    this.isMenuOpen = false;
  }
}
