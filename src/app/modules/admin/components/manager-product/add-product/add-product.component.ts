import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/shop-phone/models/brand.model';
import { ImageService } from 'src/app/shop-phone/services/image/image.service';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from 'src/app/shop-phone/share/uploadAdapter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  config = {
    toolbar: {
      items: [
        'heading', '|',
        'fontfamily', 'fontsize',
        'alignment',
        'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', '-', 'numberedList', 'todoList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'blockQuote', '|',
        'todoList'
        ,
        'undo', 'redo',
      ],
      shouldNotGroupWhenFull: true
    },
    image: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ],
      styles: [
        'full',
        'side',
        'alignLeft', 'alignCenter', 'alignRight'
      ],
      resizeOptions: [
        {
          name: 'imageResize:original',
          label: 'Original',
          value: null
        },
        {
          name: 'imageResize:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'imageResize:75',
          label: '75%',
          value: '75'
        }
      ],
    },
  };
  public Editor = ClassicEditor;
  imageMain!: string;
  fileImageMain!: File;
  name = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  description= new FormControl('', [Validators.required]);
  screen= new FormControl('');
  operatingSystem = new FormControl('');
  chip = new FormControl('');
  ram = new FormControl('');
  internalMemory = new FormControl('');
  rearCamera = new FormControl('');
  frontCamera = new FormControl('');
  brandId = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  quantity = new FormControl('', [Validators.required]);
  listBrands: BrandModel[] = [];
  listFilePhu!: FileList;
  previews: string[] = [];
  formProduct = this._formBuilder.group({
    name: this.name,
    status: this.status,
    description: this.description,
    screen: this.screen,
    operatingSystem: this.operatingSystem,
    chip: this.chip,
    ram: this.ram,
    internalMemory: this.internalMemory,
    rearCamera: this.rearCamera,
    frontCamera: this.frontCamera,
    brandId: this.brandId,
    price: this.price,
    type: this.type,
    quantity: this.quantity
  });
  constructor(private _formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe(
      res => {
        this.listBrands = res;
      }, error => {
        console.log(error);   
      }
    )
  }
  selectFiles(event: any): void {
    const selectedFiles = event.target.files;
    const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageMain = e.target.result;
    };
    this.fileImageMain = selectedFiles[0];
    reader.readAsDataURL(selectedFiles[0]);
  }
  selectFilesPhu(event: any): void {
    this.listFilePhu = event.target.files;
    const countFile = this.listFilePhu.length;
    for(let i = 0; i< countFile; i++){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };
      reader.readAsDataURL(this.listFilePhu[i]);
    }
    console.log(this.previews);
    
  }
  onSubmit(): void{
    this.productService.postProduct(this.formProduct.value).subscribe(
      res => {
        this.uploadListImagePhu(res.id);
        this.uploadImage(res.id);
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
      }
    )
  }
  uploadImage(productId: number): void{
    const data = {
      type: 'main',
      productId: productId
    }
    this.imageService.uploadImage(this.fileImageMain,data).subscribe(
      res => {
        this.router.navigate(['/admin/manager-list-product']);
      },error => {
        console.log(error);
      }
    )
  }
  uploadListImagePhu(productId: string){
    const data = {
      type: 'extra',
      productId: productId
    }
    const number = this.listFilePhu.length;
    for(let i =0 ; i< number; i++){
      this.imageService.uploadImage(this.listFilePhu[i],data).subscribe(
        res => {

        },error => {
          console.log(error);
        }
      )
    }
  }
  onReady(eventData: any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function(loader: any) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }
}
