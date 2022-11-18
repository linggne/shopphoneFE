import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shop-phone/services/auth/auth.service';
import { StorageService } from 'src/app/shop-phone/services/storage/storage.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('',[Validators.minLength(8), Validators.required]);
  hide: boolean = true;
  errorLogin!: boolean;

  options = this._formBuilder.group({
    username: this.username,
    password: this.password
  });
  constructor(private _formBuilder: FormBuilder,  
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  getErrorEmailMessage() {
    return this.username.hasError('required')? 'Bạn chưa nhập giá trị!': '';
  }
  getErrorPasswordMessage(){
    if (this.password.hasError('required')) {
      return 'Bạn chưa nhập giá trị!';
    }
    return this.password.errors?.['minlength']? 'Mật khẩu phải từ 8 ký tự!':'';
  }
  
  submit(): void {
    this.authService.login(this.options.value).subscribe(
    res => {
      console.log(res);
      if(res.role === 'admin'){
        console.log('admin');
        window.location.href = '/admin/manager-list-product'
      }else{
        this.router.navigate(['/']);
      }
    }, error => {
      console.log(error);
      this.errorLogin = true;
    }
    )
  }
}
