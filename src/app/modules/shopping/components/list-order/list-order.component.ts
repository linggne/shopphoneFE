import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/shop-phone/models/order.model';
import { OrderService } from 'src/app/shop-phone/services/order/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  listOrder: OrderModel[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrder();
  }
  loadOrder(): void {
    this.orderService.getOrderByUser().subscribe(
      res => {
        this.listOrder = res;
      }, error => {
        console.log(error);
        
      }
    )
  }

}
