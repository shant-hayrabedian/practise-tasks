import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForms: FormGroup;
  submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.submitForm();
  }

  register() {
    this.submitted = true;
  }

  get f() {
    return this.registerForms.controls;
  }

  submitForm() {
    this.registerForms = new FormGroup({
      firstName: new FormControl(null, [
        Validators.minLength(3), Validators.maxLength(30),
      ]),
      lastName: new FormControl(null, [
        Validators.minLength(3), Validators.maxLength(30),
      ]),
      email: new FormControl(null, [
        Validators.minLength(6), Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.minLength(6), Validators.maxLength(10),
      ]),
    })
  }

}
