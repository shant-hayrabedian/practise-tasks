import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForms: FormGroup;
   submitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.submitForm();
  }

  login() {
    this.submitted = true; 
  }

  get f() { return this.loginForms.controls; }

  submitForm() {
    this.loginForms = new FormGroup({
      email: new FormControl(null, [
        Validators.minLength(6), Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.minLength(6), Validators.maxLength(10),
      ]),
    })
  }

}
