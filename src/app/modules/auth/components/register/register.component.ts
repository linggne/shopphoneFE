import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shop-phone/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('',[Validators.minLength(8), Validators.required]);
  cPassword = new FormControl('',[Validators.minLength(8), Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  hide: boolean = true;
  errorLogin!: boolean
  options = this._formBuilder.group({
    username: this.username,
    password: this.password,
    email: this.email,
    cPassword: this.cPassword
  });
  errorMes!: string;
  constructor(private _formBuilder: FormBuilder,  
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  getErrorUsernameMessage() {
    return this.username.hasError('required')? 'Bạn chưa nhập giá trị!': '';
  }
  getErrorEmailMessage() {
    if(this.email.errors?.['email']){
      return 'email nhập không chính xác'
    }
    return this.email.hasError('required')? 'Bạn chưa nhập giá trị!': '';
  }
  getErrorPasswordMessage(){
    if (this.password.hasError('required')) {
      return 'Bạn chưa nhập giá trị!';
    }
    return this.password.errors?.['minlength']? 'Mật khẩu phải từ 8 ký tự!':'';
  }
  getErrorCPasswordMessage(){
    if (this.cPassword.hasError('required')) {
      return 'Bạn chưa nhập giá trị!';
    }
    if(this.cPassword.errors?.['minlength']) {
      return 'Mật khẩu phải từ 8 ký tự!';
    }
    return '';
  }
  submit(): void {   
    if(this.options.invalid){
      return ;
    }
    this.authService.register(this.options.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại!',
          showConfirmButton: true,
        }),
        console.log(error);
      }
    )
  }

}

