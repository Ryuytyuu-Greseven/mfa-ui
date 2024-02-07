import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }

  // forms
  userDetailsForm !: FormGroup;
  mfaDetailForm!: FormGroup;

  // form views
  viewType = 1;

  // qrcode
  imageDataSrc = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userDetailsForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.mfaDetailForm = this.formBuilder.group({
      mfacode: [null, [Validators.required]]
    })
  }

  onUserLogin() {
    console.log(this.userDetailsForm);
    this.imageDataSrc = '';
    if (this.userDetailsForm.valid) {

      const body = {
        username: this.userDetailsForm.value.username,
        password: this.userDetailsForm.value.password
      };

      this.commonService.loginUser(body).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.imageSrc) {
            this.imageDataSrc = response.imageSrc;
            this.viewType = 2;
          } else {
            this.viewType = 2;
          }
        }, error: (error: any) => {
          console.log(error);
          this.viewType = 2;
        }
      });
    }
  }

  onVerifyUser() {
    console.log(this.mfaDetailForm);

    if (this.mfaDetailForm.valid) {
      const body = {
        username : this.userDetailsForm.value.username,
        userToken: this.mfaDetailForm.value.mfacode
      };

      this.commonService.verifyUser(body).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status) {
            this.viewType = 4;
          } else {
            this.viewType = 3;
          }
        }, error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  backToLogin() {
    this.viewType = 1;
  }
}
