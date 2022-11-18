import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/shop-phone/models/order.model';
import { OrderService } from 'src/app/shop-phone/services/order/order.service';

@Component({
  selector: 'app-manager-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'createdAt', 'typePayment', 'status', 'address', 'action'];
  dataSource: OrderModel[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadAllOrder();
  }

  loadAllOrder(): void {
    this.orderService.getOrder().subscribe(
      res => {
        this.dataSource = res;
      },
      error => {
        console.log(error);
        
      }
    )
  }

}
