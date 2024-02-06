import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder) { }

  // forms
  userDetailsForm !: FormGroup;
  mfaDetailForm!: FormGroup;

  // form views
  viewType = 1;

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
    if (this.userDetailsForm.valid) {
      this.viewType = 2;
    }
  }
}
