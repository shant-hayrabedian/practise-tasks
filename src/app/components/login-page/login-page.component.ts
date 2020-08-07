import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
import {User, Role} from 'src/app/models/User';
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    loginForms: FormGroup;
    submitted = false;
    notLogined = false;
    user: User = {
        email: '',
        password: '',
        role: Role.admin && Role.user
    };

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.submitForm();
    }

    get f() {
        return this.loginForms.controls;
    }

    submitForm() {
        this.loginForms = new FormGroup({
            email: new FormControl(null, [
                Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(20),
            ]),
            password: new FormControl(null, [
                Validators.required, Validators.minLength(6), Validators.maxLength(10),
            ]),
            role: new FormControl(),
        });
    }

    login() {
        this.authService.login(this.user.email, this.user.password);
        if (this.loginForms.invalid) {
            return this.submitted = true;
        } 
        else {
            return this.notLogined = true;
        }
        //  else if(this.user.role == Role.admin) {
        //     this.router.navigate(['/dashboard']);
        //     return this.notLogined = true;
        // } else if (this.user.role == Role.user) {
        //       this.router.navigate(['/tasks']);
        //       return this.notLogined = true;
        // }
    }

}
