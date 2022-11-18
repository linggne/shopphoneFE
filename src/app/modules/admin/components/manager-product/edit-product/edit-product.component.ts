import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/shop-phone/models/brand.model';
import { ImageService } from 'src/app/shop-phone/services/image/image.service';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from 'src/app/shop-phone/share/uploadAdapter';
import Swal from 'sweetalert2';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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
  previews!: string[];
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
  product!: ProductModel; 
  productId!: string;
  constructor(private _formBuilder: FormBuilder,
    private routerActive: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadBrands();
    setTimeout(() => {
      this.productId = this.routerActive.snapshot.params['productId'];
      this.getProduct();
    }, 1000);
  }
  getProduct():void{
    this.productService.getProductByID(parseInt(this.productId)).subscribe(
      res => {
        this.product = res;
        this.formProduct.controls['name'].setValue(res.name);
        this.formProduct.controls['status'].setValue(res.status);
        this.formProduct.controls['description'].setValue(res.description);
        this.formProduct.controls['screen'].setValue(res.screen);
        this.formProduct.controls['operatingSystem'].setValue(res.operatingSystem);
        this.formProduct.controls['chip'].setValue(res.chip);
        this.formProduct.controls['ram'].setValue(res.ram);
        this.formProduct.controls['internalMemory'].setValue(res.internalMemory);
        this.formProduct.controls['rearCamera'].setValue(res.rearCamera);
        this.formProduct.controls['frontCamera'].setValue(res.frontCamera);
        this.formProduct.controls['brandId'].setValue(res.brand.id+"");
        this.formProduct.controls['price'].setValue(res.price);
        this.formProduct.controls['type'].setValue(res.type);
        this.formProduct.controls['quantity'].setValue(res.quantity);
      },error => {
        console.log(error);
      }
    )
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
    this.previews = [];
    const countFile = this.listFilePhu.length;
    for(let i = 0; i< countFile; i++){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };
      reader.readAsDataURL(this.listFilePhu[i]);
    }
    console.log(countFile);
    
  }
  onSubmit(): void{
    this.productService.updateProduct(parseInt(this.productId), this.formProduct.value).subscribe(
      res => {
        if(this.imageMain){
          const imageMains = this.product.image.filter(item => item.type === 'main');
          this.imageService.deleteImage(imageMains[0].id).subscribe(
            res => {

            }, error => {
              console.log(error);
              
            }
          );
          this.uploadImage(parseInt(this.productId));
        }
        if(this.listFilePhu){
          const imagePhus = this.product.image.filter(item => item.type === 'extra');
          for(let image of imagePhus){
            this.imageService.deleteImage(image.id).subscribe(
              res => {

              }, error => {
                console.log(error);
                
              }
            );
          }
          this.uploadListImagePhu(this.productId);
        }
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
        this.router.navigate(['/admin/manager-list-product']);
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
        // this.router.navigate(['/admin/manager-list-product']);
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
