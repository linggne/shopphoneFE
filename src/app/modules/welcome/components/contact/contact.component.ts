import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shop-phone/services/contact/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  message = new FormControl('', [Validators.required]);
  formContact = this._formBuilder.group({
   username: this.username,
   email: this.email,
   message: this.message
  });
  constructor(private _formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
  }

  sendContact(): void {
    this.contactService.postContact(this.formContact.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Gửi phản hồi thành công',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = '/contact';
        }, 1500);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
        }),
        console.log(error);
      }
    )
  }
}
