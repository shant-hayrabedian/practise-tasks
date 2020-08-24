import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/guard.guard';
import {TaskService} from './services/task.service';
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardComponent,
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase, 'practise-tasks'),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [UserService, AuthService, AuthGuard, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
