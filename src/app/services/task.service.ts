import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Observable<Task[]>;
  tasksList: AngularFireList<Task>;
  userId: string;

  constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getTaskList(): Observable<Task[]> {
    if (!this.userId) { return; }
    this.tasksList = this.db.list(`tasks/${this.userId}`);
    this.tasks = this.tasksList.valueChanges();
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasksList.push(task);
  }

  updateTask(key, value) {
    // return this.tasksLists.update(key, value);
    // const $key = task.id;
    // delete task.id;
    this.tasksList.update(key, value);
  }

  deleteTask($key: string) {
    return this.tasksList.remove($key);
  }
}
