import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'image', 'quantity','status', 'action'];
  dataSource: ProductModel[] = [];
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadAllProduct();
  }
  loadAllProduct(): void{
    this.productService.getProducts().subscribe(
      res => {
        this.dataSource = res;
      }
    )
  }
  deleteProduct(id: number): void{
    this.productService.deleteProduct(id).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
        }),
        console.log(error);
      }
    );
  }

}
