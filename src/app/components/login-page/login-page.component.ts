import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForms: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.submitForm();
  }

  get f() { 
    return this.loginForms.controls; }

  submitForm() {
    this.loginForms = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(10),
      ]),
    })
    
  }

  login() {
    if(this.loginForms.invalid) {
     return this.submitted = true;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
