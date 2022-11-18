import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/shop-phone/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-status',
  templateUrl: './modal-edit-status.component.html',
  styleUrls: ['./modal-edit-status.component.css']
})
export class ModalEditStatusComponent implements OnInit {
  status = new FormControl('', [Validators.required]);
  formStatus = this._formBuilder.group({
    status: this.status
  })
  constructor(
    public dialogRef: MatDialogRef<ModalEditStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _formBuilder: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.formStatus.controls['status'].setValue(this.data.status);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changeStatus(): void{
    const req = {
      status: this.formStatus.value.status,
      id: this.data.orderId
    }
    this.orderService.updateStatusOrder(req).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại!',
          showConfirmButton: true,
        }),
        console.log(error);
      },
      () => {
        this.dialogRef.close();
      }
    )
  }

}
