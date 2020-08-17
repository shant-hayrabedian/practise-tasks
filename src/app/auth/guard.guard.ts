import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  users: User;

  constructor(private router: Router,
              private authService: AuthService) {}

   canActivate() {
    if (this.authService.login(this.users.email, this.users.password)) {
      this.router.navigate(['/dashboard']);
  } 
  return !this.authService.login(this.users.email, this.users.password)
  // return false;
   }
}
