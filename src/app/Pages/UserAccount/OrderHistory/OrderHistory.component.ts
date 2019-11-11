import { Component, OnInit } from '@angular/core';

const order_history = [
   {position: 1, orderid:1801, name: 'LEGITIMaaaa', price: 1.0079, status: 'Sent',action:''},
   {position: 2, orderid:1832, name: 'GRUNDTALwwww', price: 4.0026, status: 'In processing',action:''},
   {position: 3, orderid:1881, name: 'BOHOLMENeee', price: 6.941, status: 'Sent',action:''},
   {position: 4, orderid:1832, name: 'ROSTAD LÖKeee', price: 9.0122, status: 'Return',action:''},
   {position: 5, orderid:1810, name: 'TÅRTA CHOKLADKROKANTeee', price: 10.811, status: 'Sent',action:''},
];

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {

   displayedColumns: string[] = ['position', 'orderid', 'name', 'price', 'status','action'];
   dataSource = order_history;

   constructor() { }

   ngOnInit() {
   }

}
