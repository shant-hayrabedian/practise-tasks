import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Role} from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
    password: '',
    role: Role.user
  };

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.submitForm();
  }

  register() {
    this.authService.doRegister(this.user);
    if(this.user.firstName !== '' && this.user.lastName !== '' && this.user.email !== '' && this.user.password !== '') {
      this.userService.addUser(this.user);
      this.registered = true;
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.email = '';
      this.user.password = '';
      this.submitted = false;
    } else {
    this.submitted = true;
    this.registered = false;}
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
        Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(10),
      ]),
      role: new FormControl(),
    });
  }

}
