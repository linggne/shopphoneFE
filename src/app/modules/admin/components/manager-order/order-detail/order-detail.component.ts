import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shop-phone/services/order/order.service';
import { ModalEditStatusComponent } from '../modal-edit-status/modal-edit-status.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId!: number;
  displayedColumns: string[] = ['image', 'name', 'price', 'total'];
  dataSource = [];
  order!: any;
  constructor(private orderService: OrderService, private routerActive: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderId = this.routerActive.snapshot.params['orderId'];
    this.loadOrderDetail();
  }

  loadOrderDetail(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      res => {
        this.dataSource = res.cartDetailResponse;
        this.order = res;
      }, error => {
        console.log(error);
      }
    );
  }
  openDialog(status: string): void {
    const dialogRef = this.dialog.open(ModalEditStatusComponent, {
      width: '300px',
      data: {status: status, orderId: this.orderId},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadOrderDetail();
    });
  }
}
