import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User} from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForms: FormGroup;
  submitted: boolean = false;
  registered: boolean = false;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.submitForm();
  }

  register() {
    if(this.user.firstName != '' && this.user.lastName != '' && this.user.email != '' && this.user.password != '') {
      this.userService.addUser(this.user)
      this.registered = true
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.email = '';
      this.user.password = '';
      this.submitted = false;
    } else {
    this.submitted = true;}
  }

  get f() {
    return this.registerForms.controls;
  }

  submitForm() {
    this.registerForms = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required, Validators.minLength(3), Validators.maxLength(30),
      ]),
      lastName: new FormControl(null, [
        Validators.required, Validators.minLength(3), Validators.maxLength(30),
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(10),
      ]),
    })
  }

}
