import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksList: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  // taskDoc: AngularFirestoreDocument<Task>;
  tasksLists: AngularFireList<Task>;
  userId: string;

  constructor(public afs: AngularFirestore, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getTaskList(): Observable<Task[]> {
    if (!this.userId) { return; }
    this.tasksLists = this.db.list(`tasks/${this.userId}`);
    this.tasks = this.tasksLists.valueChanges();
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasksLists.push(task);
  }

  updateTask(task: Task) {
    // this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    // this.taskDoc.update(task);
    // return this.tasksLists.update(key, value);
    const $key = task.id;
    delete task.id;
    this.tasksLists.update($key, task);
  }

  deleteTask($key: string) {
    // this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    // this.taskDoc.delete();
    // this.db.list(`tasks/${this.userId}`).remove(id);

    // return this.db.database.ref(`tasks/${this.userId}`).remove({
    //   id
    // });
    this.tasksLists.remove($key);
  }
}
